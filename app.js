const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log("post request recieved!");
  const apikey = "6ae7ba12814b80647902e92c699bb41e";
  const query = req.body.cityName;
  const metrics = req.body.numberSystem;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    metrics +
    "&appid=" +
    apikey;

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const icon = weatherdata.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherdes = weatherdata.weather[0].description;
      res.setHeader("Content-Type", "text/html");
      res.write(
        "<h1>The tempreature in " + query + " is " + temp + " degrees </h1>"
      );
      res.write("<h3>The weather is " + weatherdes + " at the moment!</h3>");
      res.write("<img src =" + imageURL + ">");
      res.send();
    });
  });
});
// app.get("/", function (req, res) {

// });

app.listen(3000, function () {
  console.log("App is live at port 3000,");
  console.log("localhost:3000");
});
