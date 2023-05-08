const fs=require('fs');
const path=require('path');
let arr = [];
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry)=>{
            if(path.extname(dirEntry.name)=='.css'){
                let data = fs.createReadStream(path.join(__dirname, 'styles', dirEntry.name), 'utf8');
                let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
                data.on('data', function(chunk) {
                    arr.push(chunk)
                    for (let elem of arr) {
                        writeStream.write(elem);
                    }
                })
            }
        })
    }
})