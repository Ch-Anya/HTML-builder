const fs = require('fs');
const path = require('path')
let file;
let arr=[];

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (error)=>{
    if(error) {
    console.log('error0');
    }
})

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (error)=>{
    if(error) {
        console.log(error);
    }
})

fs.createReadStream(path.join(__dirname, 'template.html')).on('data', (data, error)=>{
    if(!error) {
    file=data.toString();
    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (error, dirEntryList) => {
        if(!error) {
            dirEntryList.forEach((dirEntry)=>{
                if(path.extname(dirEntry.name)=='.html'){
                    let name = path.basename((__dirname, 'components', dirEntry.name), path.extname(dirEntry.name));
                    fs.createReadStream(path.join(__dirname, 'components', dirEntry.name)).on('data', (data)=>{
                        const writeable = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
                        file=file.replace('{{'+name+'}}', data.toString());
                        writeable.write(file);
                    })
                }
            })
        }
    })
    }
})

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry)=>{
            if(path.extname(dirEntry.name)=='.css'){
                let data = fs.createReadStream(path.join(__dirname, 'styles', dirEntry.name), 'utf8');
                let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
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

fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (error, dirEntryList)=>{
    if(!error) {
        dirEntryList.forEach((dirEntry)=>{
            if(dirEntry.isFile()) {
            fs.copyFile(path.join(__dirname, 'assets', dirEntry.name), path.join(__dirname, 'project-dist', 'assets', dirEntry.name), (error)=>{
                if (error) {
                    console.log('error2')
                }
            })
        }
        if (dirEntry.isDirectory()) {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dirEntry.name), {recursive: true}, (error)=>{
                if(error) {
                console.log('error0');
                }
            })
            fs.readdir(path.join(__dirname, 'assets', dirEntry.name), {withFileTypes: true}, (error, dirEntryList)=>{
                if(!error) {
                    dirEntryList.forEach((dirEntry1)=>{
                        if(dirEntry1.isFile()) {
                        fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, dirEntry1.name), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, dirEntry1.name), (error)=>{
                            if (error) {
                                console.log('error3')
                            }
                        })
                    }
            })
        }
        })
    }
})
    }})


