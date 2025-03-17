// update-sidebar.js
const fs = require('fs');
const path = require('path');

// Read all markdown files from docs directory
const docsDir = './docs';
const files = fs.readdirSync(docsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const idMatch = content.match(/id:\s*(.*)/);
    const titleMatch = content.match(/sidebar_label:\s*(.*)/);
    
    return {
      id: idMatch ? idMatch[1].trim() : file.replace('.md', ''),
      label: titleMatch ? titleMatch[1].trim() : file.replace('.md', ''),
      file
    };
  });

// Group files by category if you use folder structure
// Create sidebar structure
const sidebar = {
  someSidebar: {
    'Getting Started': files
      .filter(f => f.file.startsWith('getting-'))
      .map(f => f.id),
    'Guides': files
      .filter(f => f.file.startsWith('guide-'))
      .map(f => f.id),
    // Add more categories as needed
  }
};

// Write to sidebar.js
const sidebarContent = `module.exports = ${JSON.stringify(sidebar, null, 2)};`;
fs.writeFileSync('./sidebars.js', sidebarContent);
console.log('Sidebar updated successfully');