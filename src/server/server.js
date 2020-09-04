// Require Express to run server and routes
const express = require('express');

// Start up an instance of the Express server with variable app
const app = express();

// Setup the Express server on port 3030 // Note: "build-prod"
const port = 3030;
const server = app.listen(port, listening);

function listening(){
    // console.log(server);
    console.log(`Front end developer final project: running on localhost: ${port}`);
};

// Require the dotenv file for the Express server to work
const dotenv = require('dotenv');
dotenv.config();

// Require bodyParser
const bodyParser = require('body-parser');

// Require Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Require fetch in the node environment
const fetch = require('node-fetch');

// *****************
// /* Middleware */
// // Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Access and build to /dist folder
app.use(express.static('dist'));

// *****************
// /* Server */
// Simple /GET to review server functionality
// app.get("/", (req, res)=> {
//     res.send("Hello World!")
// })

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Function to complete GET /all for user input on travel details
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// Function to complete POST /all for user input on travel details
app.post('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// //.env credentials
// let geoNamesUser = process.env.API_ID;
// let weatherApiKey = process.env.API_KEY;

// // Add a GET route that returns the geoNames location data into lat / long variables for the next API
app.get('/geoNames', (req, res) => {
    console.log('GET geonames is working!');
    // **************** Using query parameters on the client.js file will pass the data to the server through "req.query" as below
    // **************** console.log("Req: ", req.query)
    // **************** Now, entries from the req.query parameters will be callable in the url as below, 
    // **************** const url = `http://api.geonames.org/searchJSON?q=${req.query.cityName}&maxRows=1&username=${process.env.GEONAMES_API_ID}`
    const url = `http://api.geonames.org/searchJSON?q=${req.query.placename}&maxRows=1&username=${process.env.GEONAMES_API_ID}`
    console.log(url);
    getData(url).then(response => {
        console.log('Data from Genames[0]')
        console.log(response.geonames[0]);
        projectData.lat = response.geonames[0].lat;
        projectData.long = response.geonames[0].lng;

        console.log('projectData is: ', projectData);
        res.send(true);
    }).catch(error => {
        res.send(JSON.stringify({error: error}))
    });
});

















app.post('/createTrip', (req, res) => {
  console.log(req.body);

  // targeting the days of date to get the difference
  console.log(req.body.startDate);
  console.log(req.body.endDate);
  console.log(req.body.duration);

  const startDays = req.body.startDate.slice(0, 10);
  const endDays = req.body.endDate.slice(0, 10);

  projectData.location = req.body.location;
  projectData.startDate = startDays;
  projectData.endDate = endDays;
  projectData.duration = req.body.duration;

  console.log(projectData);
  res.send('ok');
});

// // Shubham test for understanding - Add a POST route to send form data into /geoNames endpoint
// // app.post('/geoNames2', (req, res) => {
// //   console.log('POST geonames');
// //   // const location = req.body.location;
// //   console.log(`Location is: ${req.body.location}`);
// // });

// // Add a GET route that returns the geoNames location data into lat / long variables for the next API
// app.get('/geoNames', (req, res) => {
//   console.log('GET geonames');
//   const url = `http://api.geonames.org/searchJSON?placename=${projectData.location}&maxRows=1&username=${process.env.GEONAMES_API_ID}`
//   console.log(url);
//   getData(url).then(response => {
//     console.log('Data from Genames[0]')
//     console.log(response.geonames[0]);
//     projectData.lat = response.geonames[0].lat;
//     projectData.long = response.geonames[0].lng;

//     console.log('projectData is: ', projectData);
//     res.send(true);
//   }).catch(error => {
//     res.send(JSON.stringify({error: error}))
//   });
// });

// // Testing based on help from Shubham
// // import org.testng.Assert;
// // import org.testng.annotations.Test;
// // import io.restassured.RestAssured;
// // import io.restassured.response.Response;
// // import io.restassured.specification.RequestSpecification;
// //
// // public class QUERYPARAMETERRequest {
// //
// //   @Test
// //         public void queryParameter() {
// //
// //     RestAssured.baseURI ="http://api.geonames.org/searchJSON";
// //     RequestSpecification request = RestAssured.given();
// //
// //     Response response = request.queryParam("placename", "hollister")
// //                            .queryParam(`${process.env.GEONAMES_API_ID}`)
// //                            .get("/geoNames");
// //
// //     String jsonString = response.asString();
// //     System.out.println(response.getStatusCode());
// //     Assert.assertEquals(jsonString.contains("hollister"), true);
// //
// //   }
// // }

// app.get('/weatherBit', (req, res) => {
//   console.log('GET weatherBit');
//   const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${projectData.lat}&lon=${projectData.long}&key=${process.env.WEATHERBIT_API_KEY}`
//   console.log(url);
//   getData(url).then(response => {
//     console.log('Data from weatherBit');
//     const weatherData = response.data;

//     weatherData.forEach((data) => {
//       if (data.valid_date == projectData.startDate) {
//         projectData.description = data.weather.description;
//         projectData.temp = data.temp;
//         console.log(projectData);
//         res.send(true);
//       } else return
//     })
//   })
// })

// app.get('/pixabay', (req, res) => {
//   console.log('GET pixabay');
//   const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${projectData.location}&image_type=photo`
//   console.log(url);
//   getData(url).then(response => {
//     console.log("Data from pixabay");
//     projectData.img = response.hits[0].webformatURL;
//     console.log(projectData);
//     res.send(true);
//   })
// })

// app.get("/all", (req, res) => {
//   res.send(projectData);
//   console.log(projectData);
// });

// // Global functions
// const getData = async (url) => {
//   const response = await fetch(url);
//   try {
//     const data = await response.json();
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// };