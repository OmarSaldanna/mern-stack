/*

notes.contollers.js
contiene las funciones de crear, borrar, actualizar y mostrar las notas almacenadas en 
la base de datos, dichas funciones son ejecutadas por el archivo de routes/notes, y las funciones exportan el modulo de models/Notes que contiene la estructura de datos para poder hacer queries mediante el objeto User.

http://localhost:4000/api/notes/

*/

// creamos un objeto para almacenar y exportar las funciones
const notesCtrl = {};

// importamos el modulo que contiene el modelo de la base de datos
const Note = require('../models/Note');


// get
notesCtrl.getNotes = async (req, res ) => {
    const notes = await Note.find(); // devuelve un array con todas las notas 
    res.json(notes);
}

// post
notesCtrl.createNote = async (req, res ) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author
    })
    // console.log(newNote)
    await newNote.save();
    res.json({message: 'Note saved'});
}

// get + id
notesCtrl.getNote = async (req, res ) => {
    // console.log(req.params.id)
    const note = await Note.findById(req.params.id)
    // console.log(note)
    res.json(note)
}

// put + id
notesCtrl.updateNote = async (req, res ) => {
    const { title, content, author} = req.body;
    console.log(req.params.id);
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        content,
        author
    }, callback = () => res.json({message:'Note updated'}));
}

// delete + id
notesCtrl.deleteNote = async (req, res ) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json({message:'Note deleted'})
}

// exportamos el objeto con las funciones 
module.exports = notesCtrl;