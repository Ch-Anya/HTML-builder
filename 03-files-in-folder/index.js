const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (error, dirEntryList)=>{
    if(!error) {
        dirEntryList.forEach((dirEntry)=>{
            if(dirEntry.isFile()) {
                fs.stat(path.join(__dirname, 'secret-folder', dirEntry.name), (error, stats)=> {
                    if(error) {
                        console.log('error')
                    }
                    else {
                        console.log(`${path.basename((__dirname, 'secret-folder', dirEntry.name), path.extname(dirEntry.name))}`
                        +` - `
                        + `${path.extname(dirEntry.name).slice(1)}`
                        +` - ` + stats.size + `bytes`
                        )
                    }
                })
            }
        })
    } else {
        console.log('error')
    }
})