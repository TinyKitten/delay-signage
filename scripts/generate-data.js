const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'app', 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Generate jy.json from environment variable or use empty array
const jyData = process.env.JY_JSON_DATA || '[]';
fs.writeFileSync(
  path.join(dataDir, 'jy.json'),
  jyData,
  'utf8'
);
console.log('✓ Generated jy.json');

// Generate jk.json from environment variable or use empty array
const jkData = process.env.JK_JSON_DATA || '[]';
fs.writeFileSync(
  path.join(dataDir, 'jk.json'),
  jkData,
  'utf8'
);
console.log('✓ Generated jk.json');
