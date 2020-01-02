let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    }, 
    summary: {
        type: String,
        required: true
    }, 
    url: {
        type: String, 
        required: true
    },
    note: {
        type: Schema.Types.ObjectId, 
        ref: "Note"
    }
});

//create model from above schema
let Article = mongoose.model("Article", ArticleSchema); 

//export article object
module.exports = Article;