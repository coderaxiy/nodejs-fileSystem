// const fs = require("node:fs/promises");


// (async () => {
//     const openFile = await fs.open(`${__dirname}/file.txt`, 'r');
//     openFile.on('change', async (file) => {
//         const size = (await openFile.stat()).size;
//         const buff = Buffer.alloc(size)
//         const content = await openFile.read(buff, 0, size, 0);
//         console.log(`Inside of the ${file} defined some changes and here is the content: ${content.buffer.toString('utf-8')}`);
//         console.log(buff);
//         openFile.close(); 
//     });

//     const watcher = fs.watch('./');

//     for await (const event of watcher) {
//         if (event.eventType === 'change') {
//             openFile.emit('change', event.filename);
//         }
//     }
// })();


