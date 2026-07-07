const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components')
];

const colorMap = {
  "'#fdf2cd'": "'transparent'", // Outer wrapper backgrounds
  "'#fff'": "'var(--color-surface)'", // Inner panels
  "'#000'": "'var(--color-text)'", // Text and buttons (mostly text, some buttons need specific handling but var(--color-text) is fine for borders/text)
  "'#fbb404'": "'var(--color-primary)'", // Primary buttons/nav
  "'#e09e02'": "'var(--color-primary-dark)'",
  "'#eee'": "'var(--color-border)'",
  "'#ccc'": "'var(--color-border)'",
  "'#f9de78'": "'var(--color-surface)'" // Cab cards
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Global hex replacements
      for (const [hex, cssVar] of Object.entries(colorMap)) {
        // Regex to match the exact string, case insensitive
        const regex = new RegExp(hex.replace(/'/g, "['\"]"), "gi");
        content = content.replace(regex, cssVar);
      }

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

for (const dir of directories) {
  processDirectory(dir);
}
console.log('Refactoring complete!');
