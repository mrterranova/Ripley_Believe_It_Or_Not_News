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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// app.use(express.static('views/images'));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/weirdnews";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

//Route for scraping
app.get("/scrape", function (req, res) {

    axios.get("https://www.ripleys.com/weird-news/").then(function (response) {
        var $ = cheerio.load(response.data)
        var results = [];

        $(".post-box-inner").each(function (i, element) {
            var title = $(element).children("h3.title").text();
            var summary = $(element).children(".post-excerpt").children("p").text();
            var link = $(element).children("h3.title").children().attr("href");
            if (title == "" || summary == "" || link == "") { }
            else {
                results.push({
                    title: title,
                    summary: summary,
                    url: link
                });
            }
        });
        console.log(results)
        db.Article.create(results)
            .then(function (dbArticle) {
                res.send(dbArticle)
            }).catch(function (err) {
                console.log(err)
            });
    });
    res.send("Scrape Completed");
});

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.render("index", { article: dbArticle });
        }).catch(function (err) {
            res.send(err)
        })
});

app.get("/notes", function (req, res) {
    console.log(res.body)
    db.Note.find({}).then(function (dbNote) {
        res.json(dbNote)
    }).catch(function (err) {
        res.json(err)
    });
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function (dbArticle) {
            res.send(dbArticle)
        }).catch(function (err) {
            res.send(err);
        })
});

app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle)
        }).catch(function (err) {
            res.send(err);
        });
});

app.post("/notes/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Note.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, body: req.body.body}, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

app.delete("/notes/:id", function (req, res) {
    db.Note.findByIdAndRemove(req.params.id, (err, note) => {
        if (err) return err;
        console.log("Successfully deleted");
        res.status(200).send("Successful");
    });
});

//Start server
app.listen(PORT, function () {
    console.log("Your App is running on PORT: " + PORT)
});
