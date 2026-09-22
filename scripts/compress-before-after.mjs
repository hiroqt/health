import fs from "fs";
import path from "path";
import sharp from "sharp";

const sourceDir = path.resolve("public/beofre-after");
const targetCleanDir = path.resolve("public/before-after");

if (!fs.existsSync(targetCleanDir)) {
  fs.mkdirSync(targetCleanDir, { recursive: true });
}

async function run() {
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith(".jpg"));
  files.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  console.log(`Found ${files.length} images to compress in ${sourceDir}...`);

  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let totalOptimizedJpgSize = 0;

  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const baseName = path.parse(file).name;
    const stat = fs.statSync(inputPath);
    const originalSize = stat.size;
    totalOriginalSize += originalSize;

    // 1. WebP version (primary modern format)
    const webpBuffer = await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toBuffer();

    const webpPathBeofre = path.join(sourceDir, `${baseName}.webp`);
    const webpPathClean = path.join(targetCleanDir, `${baseName}.webp`);
    fs.writeFileSync(webpPathBeofre, webpBuffer);
    fs.writeFileSync(webpPathClean, webpBuffer);
    totalWebpSize += webpBuffer.length;

    // 2. Optimized MozJPEG version
    const jpgBuffer = await sharp(inputPath)
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    const jpgPathClean = path.join(targetCleanDir, file);
    // If optimized jpg is smaller, rewrite in sourceDir too
    if (jpgBuffer.length < originalSize) {
      fs.writeFileSync(inputPath, jpgBuffer);
    }
    fs.writeFileSync(jpgPathClean, jpgBuffer);
    totalOptimizedJpgSize += jpgBuffer.length;

    const savedPercent = Math.round((1 - webpBuffer.length / originalSize) * 100);
    console.log(
      `✓ ${file}: ${(originalSize / 1024).toFixed(1)} KB -> WebP: ${(webpBuffer.length / 1024).toFixed(1)} KB (-${savedPercent}%), MozJPEG: ${(jpgBuffer.length / 1024).toFixed(1)} KB`
    );
  }

  console.log("\n================ SUMMARY ================");
  console.log(`Original Total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP Total:     ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - totalWebpSize / totalOriginalSize) * 100)}%)`);
  console.log(`MozJPEG Total:  ${(totalOptimizedJpgSize / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - totalOptimizedJpgSize / totalOriginalSize) * 100)}%)`);
  console.log("Both public/beofre-after and public/before-after have been populated!");
}

run().catch(err => {
  console.error("Compression error:", err);
  process.exit(1);
});
