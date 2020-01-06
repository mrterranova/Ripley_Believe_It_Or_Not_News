# ScienceNews

Scrapping News from...

![Alt text](public/images/th.jpg)

## Summary

Welcome to Ripley's Believe It or Not News. Here you can look up weird articles about science, history, and many other subjects. Ripley's is now over a century old and located across the US. They have all sorts of strange articles that don't usually make the mainstream news. It was because of this and the oddity of organization that I choose this particular website to scrape articles from. After all, who doesn't like a good mystery to ponder over? 

Visit my site at : https://www.heroku.com/protected-depths-32821. 

## Technology Used
- Database : Mongoose
- Scraping Tool : Cheerio
- Routes : Express and NodeJS
- Front-end Libraries : Handlebars, CSS, JQuery, Javascript, and HTML
- Deployment : Github and Heroku

## App Contains

A news article section specifically pulling news articles from the Ripley's website. This is done using Cheerio, a tool that scrapes articles directly from the HTML. Cheerio is pulling titles, summaries, and links from the website for the user to visit that specific article. These scraped resources are then sent to Mongoose which is the database tool that is being implemented. 

 If the user clicks on the Title they will have the option to leave a note on my website about the article. Full accessability to delete, add new notes, and edit existing notes are available to the user. Because this is an open forum and not a login site, I've given complete usability to users allowing them to change notes as they would like. Future development would include creating a specific access key for users to remain anonymous and edit only notes they created. But for now, the parameters of the project rely on the user's integrity.

 Handlebars are used for the front-end to import the articles. There were also many ajax calls, a traditional way of importing the articles and the notes onto the page. When Notes are posted, the notes section will disappear and send users back the the main page once more. 

 ## Steps of deployment

All articles are deployed onto heroku for web accessability. Thank you for visiting the github page. To see the final project please visit: https://dashboard.heroku.com/apps/protected-depths-32821. 


