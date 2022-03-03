const { response } = require("express");
const express = require("express");

const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

const { send } = require("process");
const { format } = require("path");

// app.get("/", (req, res) => {

    // const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&lang=en&appid=9c510911bd336def35146722422874e2&units=metric";
    

    // https.get(url, (response) => {
    //     console.log(response);
    //     console.log(response.statusCode);

    //     response.on("data", (data) => {
    //         // console.log(data);

    //         const weatherData = JSON.parse(data);
    //         // console.log(weatherData);
    //         // console.log(JSON.stringify(weatherData));

    //         // const temp = weatherData.main.temp;
    //         // console.log(temp);
    //         // const iconURL = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

    //         res.write("<p>The weather of " + weatherData.name + " is " + weatherData.weather[0].description + ".</p>")
    //         res.write("<h3>The temperature in " + weatherData.name + " is " + weatherData.main.temp + " degree celcius.</h3>");
    //         res.write("<img src=https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png>");
    //         // res.write("<img src=https://openweathermap.org/img/wn/02n@2x.png>");
    //         res.send();
    //     })

    // });

    // res.send("Server is up and running successfully!");
// })


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

    const query = req.body.cityName;
    const apiKey = "9c510911bd336def35146722422874e2";
    const unit = req.body.unitName;
    console.log(unit);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&lang=en&appid=" + apiKey + "&units=" + unit;

    if(unit === "standard") {
        unitType = "Kelvin";
    } else if (unit === "metric") {
        unitType = "degree Celcius";
    } else {
        unitType = "Fahrenheit";
    }
    

    https.get(url, (response) => {
        console.log(response);
        console.log(response.statusCode);

        response.on("data", (data) => {
            // console.log(data);

            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            // console.log(JSON.stringify(weatherData));

            // const temp = weatherData.main.temp;
            // console.log(temp);
            // const iconURL = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

            res.write("<p>The weather of " + weatherData.name + " is " + weatherData.weather[0].description + ".</p>")
            res.write("<h3>The temperature in " + weatherData.name + " is " + weatherData.main.temp + " is " +  unitType + ".</h3>");
            res.write("<img src=https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png>");
            // res.write("<img src=https://openweathermap.org/img/wn/02n@2x.png>");
            res.send();
        })

    });
})




app.listen(3000, () => {
    console.log("Server started at port: 3000");
})