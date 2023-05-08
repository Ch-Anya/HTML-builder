
const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (error)=>{
    if(error) {
    console.log('error0');
    }
})

fs.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, (error, dirEntryList)=>{
    if(!error) {
        dirEntryList.forEach((dirEntry)=>{

        fs.unlink(path.join(__dirname, 'files-copy', dirEntry.name), (error)=>{
        });
    })
    }
})

fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (error, dirEntryList)=>{
    if(!error) {
        dirEntryList.forEach((dirEntry)=>{
            if(dirEntry.isFile()) {
            fs.copyFile(path.join(__dirname, 'files', dirEntry.name), path.join(__dirname, 'files-copy', dirEntry.name), (error)=>{
                if (error) {
                    console.log('error2')
                }
            })
        }
})
    }})



        



