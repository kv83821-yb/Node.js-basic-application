//console.log('utils.js')
const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    console.log(chalk.redBright('Your notes'))
    const notes = loadNotes()
    notes.forEach((element) => console.log(element.title) )
}

const removeNote = function(title){
    const notes = loadNotes()
    const leftNotes = notes.filter((note) => note.title !== title)

    if(leftNotes.length === (notes.length - 1)){
        saveNotes(leftNotes)
        console.log(chalk.green.inverse('Note deleted!'))
    } else{
        console.log(chalk.red.inverse('Title not found!'))
    }
}


//addNote function used in file_sys.js to add a note
//get the json obect containig the notes and push a note to it
//Then function called to save the note
//duplicateNotes function checks if a note with same title already exists
//Keep an eye on the way filter function is applied
const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    /*const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })*/

    //The function form used is same as commented function but using different function format i.e. 
    //Arrow format
    //Use above or use another function Find that stops when match found
    const duplicateNote = notes.find((note) => note.title === title)
    if(duplicateNote === undefined){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('Note created!')
    } else{
        console.log('Title already taken choose new!')
    }
}

//Function to save the added note as string format in a file
//JSON.stringify to save a json object as a string in a file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
//One more way this could be done is given here
//const saveNotes = function(notes){

//}

//toString converts readfile to readable string format
//JSON.parse to convert read string to json format object
//First time call to functo may return null so kept in a try catch block
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        return []
    }

}

const showNote = (title) => {
    const notes = loadNotes()
    const matchNote = notes.find((note) => note.title === title)
    if(matchNote !== undefined)
    {
        console.log(chalk.blue(matchNote.title))
        console.log(matchNote.body)
    }
    else{
        console.log(chalk.red('No matching note found'))
    }
}
module.exports = {
    getNotes: getNotes,
    removeNote: removeNote,
    addNote: addNote,
    showNote: showNote
}