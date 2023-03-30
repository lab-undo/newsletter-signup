const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const url = "https://us12.api.mailchimp.com/3.0/lists/793aff0967";
    const authkey = "684576a6c47069e13277581a98a129b7-us12";
    const senddata = {
        members: [{
            email_address: req.body.Email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.fname,
                LNAME: req.body.lname
            }
        }]
    };
    const datas = JSON.stringify(senddata);
    const options = {
        method: 'POST',
        auth: "ashishran:" + authkey
    };
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(datas);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});

//684576a6c47069e13277581a98a129b7-us12
//793aff0967