let mongoose = require("mongoose");

//save reference to Schema constructor
let Schema = mongoose.Schema;

//create an object
let LikesSchema = new Schema({
    likes: Number,
    dislikes: Number
});

//creates model from schema
let Likes = mongoose.model("Like", LikesSchema);

//export the note in an object
module.exports = Likes;