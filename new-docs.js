// new-doc.js
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const id = args[0];
const title = args[1] || id;

if (!id) {
  console.error('Please provide an ID for the document');
  process.exit(1);
}

const content = `---
id: ${id}
title: ${title}
sidebar_label: ${title}
---

# ${title}

## Overview

`;

const docPath = path.join('./docs', `${id}.md`);
fs.writeFileSync(docPath, content);
console.log(`Created new doc: ${docPath}`);