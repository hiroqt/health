const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /#FAF8F5/gi, replacement: '#F5EFE6' },
  { regex: /#F5E6B8/gi, replacement: '#E6D8C3' },
  { regex: /#9B6626/gi, replacement: '#C2A68C' },
  { regex: /#F5F1EA/gi, replacement: '#E6D8C3' },
  { regex: /#D97706/gi, replacement: '#C2A68C' },
  { regex: /#C8A96E/gi, replacement: '#C2A68C' },
  { regex: /#E8E2DC/gi, replacement: '#E6D8C3' },
  { regex: /bg-white/g, replacement: 'bg-[#F5EFE6]' },
  { regex: /"#ffffff"/gi, replacement: '"#F5EFE6"' }, // Update WaveDividers
  { regex: /"#FFFFFF"/gi, replacement: '"#F5EFE6"' }
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walkDir('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
