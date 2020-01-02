let mongoose = require("mongoose");

//save reference to Schema constructor
let Schema = mongoose.Schema;

//create an object
let NoteSchema = new Schema({
    title: String,
    body: String
});

//creates model from schema
let Note = mongoose.model("Note", NoteSchema);

//export the note in an object
module.exports = Note;