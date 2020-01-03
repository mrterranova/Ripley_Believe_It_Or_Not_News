let mongoose = require("mongoose");

//save reference to Schema constructor
let Schema = mongoose.Schema;

//create an object
let NoteSchema = new Schema({
    title: String,
    body: String, 
    likes: {
        type: Schema.Types.ObjectId, 
        ref: "Like"
    }
});

//creates model from schema
let Note = mongoose.model("Note", NoteSchema);

//export the note in an object
module.exports = Note;