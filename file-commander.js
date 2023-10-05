const fs = require("node:fs/promises");

const CREATE = "create a file"
const DELETE = "delete the file"
const RENAME = "rename file"
const WRITE = "write to"


const createFile = async(path) => {
    try {
        const isExistingFile = await fs.open(path, 'r')
        isExistingFile.close()

        return console.log(`The ${path} is already exists`);
    } catch (error) {
        const newFile = await fs.open(path, 'w')
        console.log('A file was created successfully!!!');
        newFile.close()
    }
}

const deleteFile = async(path) => {
    try {
        await fs.unlink(path)
        return console.log(`Successfully deleted ${path}`);
    } catch (error) {
        return console.log("File doesn't exists!");
    }
}

const renameFile = async(oldPath, newPath) => {
    try {
        await fs.rename(oldPath, newPath)
        return console.log(`Successfully renamed ${oldPath} to ${newPath}`)
    } catch (error) {
        return console.log(
            error + `Failed to rename ${oldPath} check if the given path is correct`
            )
    }
}

const writeToFile = async(filePath, content) => {
    try {
        const file = await fs.open(filePath, 'w')
        await fs.writeFile(filePath, content)
        file.close()
        return console.log(`A content has successfully added to ${filePath}`);
    } catch (error) {
        return console.log(error);
    }
}

(async() => {
    const commandHandler = await fs.open("./command.txt", "r");

    commandHandler.on('change', async() => {
        const size = (await commandHandler.stat()).size;
        const buff = Buffer.alloc(size)
        const offset = 0
        const pos = 0
        const content = await commandHandler.read(buff, offset, size, pos);
        const cmd = content.buffer.toString('utf-8')

        if(cmd.includes(CREATE)){
            const path = cmd.substring(CREATE.length + 1);
            createFile(path)
        } else if(cmd.includes(DELETE)){
            const path = cmd.substring(DELETE.length + 1);
            deleteFile(path)
        } else if(cmd.includes(RENAME)){
            const index = cmd.indexOf(" to ");
            const oldPath = cmd.substring(RENAME.length + 1, index)
            const newPath = cmd.substring(index + 4)
            renameFile(oldPath, newPath)
        } else if(cmd.includes(WRITE)){
            const index = cmd.indexOf(" to ");
            const colonInd = cmd.indexOf(":")
            const filePath = cmd.substring(index + 4, colonInd)
            const content = cmd.substring(colonInd + 2)
            writeToFile(filePath, content)
        }
    })

    const fileWatcher = fs.watch('./command.txt')

    for await (const event of fileWatcher){
        if(event.eventType === 'change'){
            commandHandler.emit('change')
        }
    }
})();