const fs = require('fs');
console.log(fs.readFileSync('src/index.css', 'utf8').includes('--color-surface: #0f1011;'));
