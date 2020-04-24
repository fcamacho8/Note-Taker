var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

//--HTML-Routes--//

app.get("/notes", (req, res)=>{
    res.sendfile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res)=>{
    res.sendfile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
})
