const fs = require('fs');
const path = require('path');

let errors = 0;

// Find all markdown files
const docsDir = './docs';

function checkDocsDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);
    
    if (dirent.isDirectory()) {
      checkDocsDir(fullPath);
    } else if (dirent.name.endsWith('.md')) {
      checkFile(fullPath);
    }
  });
}

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for missing frontmatter
  if (!content.startsWith('---')) {
    console.error(`${file}: Missing frontmatter`);
    errors++;
  }
  
  // Check for broken internal links
  const links = content.match(/\[.*?\]\((.*?)\)/g) || [];
  links.forEach(link => {
    const match = link.match(/\[.*?\]\((.*?)\)/);
    if (match && match[1].startsWith('./') && match[1].endsWith('.md')) {
      const linkedFile = path.resolve(path.dirname(file), match[1]);
      if (!fs.existsSync(linkedFile)) {
        console.error(`${file}: Broken link to ${match[1]}`);
        errors++;
      }
    }
  });
}

// Start the check
if (fs.existsSync(docsDir)) {
  checkDocsDir(docsDir);
} else {
  console.error(`Docs directory not found: ${docsDir}`);
  errors++;
}

if (errors > 0) {
  console.error(`Found ${errors} issues in documentation`);
  process.exit(1);
} else {
  console.log('Documentation looks good!');
}