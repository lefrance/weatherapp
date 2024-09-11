// required modules
const express = require("express");

// get or post information from or to an extrnal server
const https = require("https");

// get information form a local form
const bodyParser = require("body-parser")


//app binding
const app = express();

//configure bodyParser
app.use(bodyParser.urlencoded({extended:true}));


// server port
// server start logging
app.listen(3000, function() {
	console.log("sever has started");
})

// root route
app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req, res){


	// creating constant called url wich hold the data
	const query= req.body.city;
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=53ba19dd8b20d7244935b4fcd299d13a";

	// getting response from the server of opebweathermap
	https.get(url, function(response) {

		// // console log the reponse http code
		console.log(response.statusCode);
		console.log(url);


			// when the data ise response  from the response of the extrnal server that data wil be added to the object "data"
			response.on("data", function(data){

				//parse the data and add it to the the weather constonad
				const weatherData =JSON.parse(data);

				//console log the main.temp node
				const temp = weatherData.main.temp;
				const weatherDescription = weatherData.weather[0].description;
				const weathericon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";

				res.write("<p>the wather is currently" + weatherDescription + "</p>" )
				res.write("<h1> the temprature in " + query + " is " + temp + " kelvin </h1>")
				res.write("<img src= "  + weathericon  + " alt=" + weatherData.weather[0].icon + "</img>")
				res.send()

			})

	});
})
