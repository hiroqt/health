const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const SRC_DIR = path.resolve('public/ORDERS');
const OUT_DIR = path.resolve('public/orders-optimized');
const DATA_FILE = path.resolve('src/data/proofOfOrders.ts');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const f of list) {
    if (f.startsWith('.') || f === 'orders-optimized') continue;
    const full = path.join(dir, f);
    const s = fs.statSync(full);
    if (s.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

async function run() {
  console.log('Scanning files in:', SRC_DIR);
  const allFiles = walk(SRC_DIR);
  const imageFiles = allFiles.filter(f => /\.(png|jpe?g|heic)$/i.test(f));
  const videoFile = allFiles.find(f => /\.mov$/i.test(f));

  console.log(`Found ${imageFiles.length} images and ${videoFile ? 1 : 0} video.`);

  let totalSrcBytes = 0;
  let totalOptimizedBytes = 0;
  const processedItems = [];

  let count = 0;
  for (const file of imageFiles) {
    count++;
    const stat = fs.statSync(file);
    totalSrcBytes += stat.size;

    const rel = path.relative(SRC_DIR, file);
    const parts = rel.split(path.sep);
    const filename = path.basename(file, path.extname(file));
    const groupName = parts.length > 1 ? parts[parts.length - 2] : 'Recent Orders';

    // Normalize target filename to avoid spaces and special chars
    const safeBase = filename.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    const subFolder = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
    const outSubDir = path.join(OUT_DIR, subFolder);
    if (!fs.existsSync(outSubDir)) {
      fs.mkdirSync(outSubDir, { recursive: true });
    }

    const outWebpPath = path.join(outSubDir, `${safeBase}.webp`);
    const publicSrc = `/orders-optimized/${subFolder ? subFolder + '/' : ''}${safeBase}.webp`;

    try {
      let inputBuffer;
      if (/\.heic$/i.test(file)) {
        // Convert HEIC via sips to temp jpg
        const tmpJpg = path.join('/tmp', `tmp_${Date.now()}_${count}.jpg`);
        execSync(`sips -s format jpeg "${file}" --out "${tmpJpg}" > /dev/null 2>&1`);
        inputBuffer = fs.readFileSync(tmpJpg);
        fs.unlinkSync(tmpJpg);
      } else {
        inputBuffer = fs.readFileSync(file);
      }

      // Process with sharp
      // Max 1400px width/height, WebP quality 78
      const sharpInst = sharp(inputBuffer);
      const meta = await sharpInst.metadata();

      const outBuffer = await sharp(inputBuffer)
        .rotate() // auto-orient if EXIF orientation is present
        .resize(1400, 1400, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })
        .toBuffer();

      fs.writeFileSync(outWebpPath, outBuffer);
      const outStat = fs.statSync(outWebpPath);
      totalOptimizedBytes += outStat.size;

      // Extract metadata of the output
      const outMeta = await sharp(outBuffer).metadata();

      processedItems.push({
        id: `order-${count}`,
        src: publicSrc,
        originalName: path.basename(file),
        group: groupName,
        width: outMeta.width || 1080,
        height: outMeta.height || 1080,
        sizeKb: Math.round(outStat.size / 1024),
      });

      if (count % 25 === 0 || count === imageFiles.length) {
        console.log(`Processed ${count}/${imageFiles.length} images... (Current total: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB)`);
      }
    } catch (err) {
      console.error(`Failed to process ${file}:`, err.message);
    }
  }

  // Compress video if found
  let videoInfo = null;
  if (videoFile) {
    console.log('Optimizing video:', videoFile);
    const videoOutPath = path.join(OUT_DIR, 'pack-an-order.mp4');
    try {
      execSync(`ffmpeg -y -i "${videoFile}" -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k -movflags +faststart "${videoOutPath}" > /dev/null 2>&1`);
      const vStat = fs.statSync(videoOutPath);
      totalOptimizedBytes += vStat.size;
      videoInfo = {
        src: '/orders-optimized/pack-an-order.mp4',
        sizeKb: Math.round(vStat.size / 1024),
      };
      console.log(`Video compressed to: ${(vStat.size / (1024 * 1024)).toFixed(2)} MB`);
    } catch (e) {
      console.error('Failed to compress video:', e.message);
    }
  }

  console.log('\n--- SUMMARY ---');
  console.log(`Original size: ${(totalSrcBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized size: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Savings: ${(100 - (totalOptimizedBytes / totalSrcBytes) * 100).toFixed(1)}%`);

  // Generate proofOfOrders.ts
  const tsContent = `// Automatically generated order proof catalog
export interface ProofOrderItem {
  id: string;
  src: string;
  originalName: string;
  group: string;
  width: number;
  height: number;
  sizeKb: number;
}

export const PROOF_VIDEO = ${JSON.stringify(videoInfo, null, 2)};

export const PROOF_ORDER_ITEMS: ProofOrderItem[] = ${JSON.stringify(processedItems, null, 2)};

export const PROOF_ORDER_GROUPS = Array.from(
  new Set(PROOF_ORDER_ITEMS.map((item) => item.group))
).sort((a, b) => {
  if (a === 'Recent Orders') return -1;
  if (b === 'Recent Orders') return 1;
  const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
  const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
  return numB - numA; // Latest batch first
});
`;

  fs.writeFileSync(DATA_FILE, tsContent, 'utf-8');
  console.log(`Generated ${DATA_FILE} with ${processedItems.length} items and ${videoInfo ? '1 video' : 'no video'}.`);
}

run().catch(console.error);
