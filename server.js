const { static } = require('express');
const express = require('express');
const app = express();
const request = require('request');
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.redirect("/search");
});


app.get("/search", function(req, res){
    res.render("search");
});

app.get("/movies", function(req, res){
    const query = req.query.i;
    console.log(req);
    let url = "http://www.omdbapi.com/?apikey=b63af212&i=" + query;
    request(url, function(err,response, body){
        const data = JSON.parse(body);
        if(!err && response.statusCode == 200){
            res.render("movie", {data:data});
        }
    });
});


app.get("/results", function(req, res){

    const query = req.query.movie;
    const url = "http://www.omdbapi.com/?apikey=b63af212&s=" + query; 

    request(url, function(err, response, body){
        if(!err && response.statusCode == 200){
            const vari = JSON.parse(body);
            res.render("results", {data:vari});
        }
    });
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000.")
})