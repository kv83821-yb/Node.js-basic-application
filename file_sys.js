//const validator = require('validator')
const chalk = require('chalk')
const yargs=require('yargs')
//const fs = require('fs')
const notes = require('./utils.js')
//fs.writeFileSync('notes.txt','Hello! Thsi file was written by node.JS')
//console.log('Vivek')
//const sent = notes()
//console.log(sent)
//console.log(chalk.green.bold('Success!'))
//fs.appendFileSync('notes.txt',' And now being appended!')
//const command = process.argv[2]

//builder inside the add command is for options of the add command
//demandOption true is to make it aa required field
//type option is to define its type
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title:{
            describe: 'New title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe: 'Required title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler(){
        notes.getNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.showNote(argv.title)
    }
})
//console.log(yargs.argv)
//Either use above i.e. yargs.argv to make yargs parse the command line or use 
yargs.parse()
//console.log(process.argv)