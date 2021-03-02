var express = require("express");
var app = express();
var fs = require("fs");
const PORT = process.env.PORT || 8081;

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/newmessage", function (req, res) {
    res.sendFile(__dirname + "/public/form.html");
});


app.post("/newmessage", function (req, res) {
    var data = require("./public/data.json");
    var today = new Date();

    var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    data.push({
        "Name": req.body.name,
        "Country": req.body.country,
        "Message": req.body.message,
        "Date": date
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile("public/data.json", jsonStr, (err) => {
        if (err) throw err;
        console.log("It is saved!");
    });

    res.sendFile(__dirname + "/public/continue.html");
});

app.get("/ajaxmessage", function (req, res) {
    res.sendFile(__dirname + "/public/ajaxform.html");
});

// POST-tyyppiseen sivupyyntöön reagoiva reitti
app.post("/ajaxmessage", function(req, res) {
    var data = require("./public/data.json");
    var today = new Date();

    var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    data.push({
        "Name": req.body.name,
        "Country": req.body.country,
        "Message": req.body.message,
        "Date": date
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile("public/data.json", jsonStr, (err) => {
        if (err) throw err;
        console.log("It is saved!");
    });

    var name = req.body.name;
    var country =  req.body.country;
    var message =  req.body.message;

  res.send("You send an AJAX message: " + message + ". You can now see it at the Guestbook!");
});


app.get("/guestbook", function (req, res) {
    res.sendFile(__dirname + "/public/guestbook.html");
});

app.listen(PORT, () => {
    console.log("Example app listening on port 8081!");
  });