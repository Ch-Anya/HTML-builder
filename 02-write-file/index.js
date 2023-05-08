const fs = require('fs');
const path = require('path');
let writeableStream = fs.createWriteStream(path.join(__dirname, 'write.txt'));
process.stdout.write('Try to enter\n');
process.stdin.on('data', data => {
    if(data.toString().trim()==='exit'){
        process.exit()
    }
    else {
        writeableStream.write(data);
    }
})
process.on('exit', () => {
    console.log('Input is completed')
})
process.on('SIGINT', ()=> {
    process.exit()
})