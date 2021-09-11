//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is my feed! The feed that is food for thought as to how the day is going, what I am accomplishing, and by extension, how I'm progressing";
const aboutContent = "This Daily Journal is a documentation of my journey as a developer, constant student, and innovator who seeks to better his skills along with himself.";
const contactContent = "Whoa slow down there Buckaroo! I know you're impressed.... find me on LinkedIn: taqif359.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
  res.render("home", {homeContent: homeStartingContent, posts: posts});
  
});

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/posts/:title", function(req,res){
  const heading = _.lowerCase(req.params.title);
  posts.forEach(element => {
    let head = _.lowerCase(element.title);
    if(head === heading) res.render("post", {postTitle: element.title, postContent: element.content});
  });
});

app.get("/contact", function(req,res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){
  const post = {
    title: req.body.ourPostTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
