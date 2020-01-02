let express = require("express");
let logger = require("morgan");
let exphbs = require("express-handlebars");
let mongoose = require("mongoose");

//scrapping functions for the news articles
let axios = require("axios");
let cheerio = require("cheerio");

//require all the models using index export
let db = require("./models");

//port listening at...
let PORT = 7000 || process.env.PORT;

//Initializing express
let app = express();

//middleware configurations
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static('views/images'));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true, useUnifiedTopology : true });

//Route for scraping
app.get("/scrape", function (req, res){

    axios.get("https://www.ripleys.com/weird-news/").then(function (response) {
        var $ = cheerio.load(response.data)

        var results = [];

        $(".post-box-inner").each(function (i, element) {
            var title = $(element).children("h3.title").text();
            var summary = $(element).children(".post-excerpt").children("p").text();
            var link = $(element).children("h3.title").children().attr("href");
            if (title == "" || summary == "" || link == "") {}
            else {
                results.push({
                    title: title,
                    summary: summary,
                    url: link
                });
            }
        });
    
            db.Article.create(results)
                .then(function(dbArticle) {
                    res.send(dbArticle)
                }).catch(function(err) {
                    console.log(err)
                });
            });
            res.send("Scrape Completed");
        });

app.get("/articles", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.render("index", {article: dbArticle});
    }). catch( function(err) {
        res.send(err)
    })
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id : req.params.id })
    .populate("note")
    .then (function(dbArticle) {
        res.json(dbArticle)
    }).catch (function(err){
        res.send(err);
    })
});

app.post("/articles/:id", function(req, res) {
    console.log("You are posting a note")
    console.log(req.body)
    console.log(req.params)
    db.Note.create(req.body)
    .then(function(dbNote) {
        console.log(dbNote)
        return db.Article.findOneAndUpdate({_id : req.params.id}, { note : dbNote._id })
    }).then(function(dbArticle) {
        res.send(dbArticle)
    }).catch(function(err){
        res.send(err);
    });
});

//Start server
app.listen(PORT, function(){
    console.log ("Your App is running on PORT: "+ PORT)
});



