var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.get("/api/notes", (req, res) => {

    return res.json(db);
});


app.post("/api/notes", (req, res) => {
    var note = req.body;
    note.id = db.length
    db.push(note);

    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
        if (err) return console.log(err);
    });

});

app.delete("/api/notes/:id", (req, res) => {
    var note = []
    db.forEach(function (oneNote) {
        if (oneNote.id != req.params.id) {
            note.push(oneNote);
        }
    });
    
    db = note;
    res.json
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => console.log("App listening on PORT " + PORT));
