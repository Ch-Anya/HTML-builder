const fs = require('fs');
const path = require('path')
let file = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8')