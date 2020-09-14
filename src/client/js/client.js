const getData = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
  
const postData = async ( url='', data={})=>{
      const response = await fetch(url, {
          method: 'POST',
          // credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          // Body data type must match "Content-Type" header
          body: JSON.stringify(data)
      });
      try {
          const newData = await response.json();
          console.log(newData);
          return newData;
        } catch (error) {
          console.log("error", error);
        };
};
  
const updateUI = async (url, projectData) => {
    console.log('UpdateUI function starting');
    console.log(projectData); // nothing displayed??
    const city = document.getElementById('input-destination-city').value;
    const state = document.getElementById('input-destination-state').value;
    const imgElem = document.getElementById("my-trip-image");
    console.log(imgElem.src);
    imgElem.src = "";
    console.log(imgElem.src);
    // imgElem.src = projectData.data.img; // "data is not defined"
    // imgElem.src = projectData.img; // "data is not defined"
    // imgElem.src = data.img; // "data is not defined"
    imgElem.src = img; // "data is not defined"
    console.log(imgElem.src);
    const response = await fetch(url);
    try {
      const data = await response.json();
      document.getElementById('results-city-state').innerHTML = `Hello, your trip details are below. \n You would like to travel to: ${city}, ${state}`;
      document.getElementById('results-image').src = `${imgElem}`;
      // getting the reference to our img element
      // console.log(imgElem);
      // Replacing the src value with the data obtained from the server-
      // imgElem.src = ${data.img};
      // document.getElementById('allData').innerHTML = `The latitude is:  ${data.lat}.`;
      // document.getElementById('allData').innerHTML = `The latitude is:  ${data.long}.`;
      // document.getElementById("result-departure").innerHTML = `Departure: ${data.startDate}`
      // document.getElementById("result-return").innerHTML = `Return: ${data.endDate}`
      // document.getElementById("result-duration").innerHTML = `Duration: ${data.duration} days`
      // document.getElementById("trip-start").innerHTML = `Your trip is ${data.timeTillTravel} days from now`
      // document.getElementById("result-temp").innerHTML = `${data.temp}°F`
      // document.getElementById("result-description").innerHTML = `${data.description}`
    } catch (error) {
      console.log("error", error);
    }
};
  
  /* Global Variables */
  const travelCard = document.getElementById('input-submit');
  // const travelResults = document.getElementById('travel-results');
  
  // Async function to manage user input and store client side variables
  async function handleSubmit(event) {
    // Set submit data into key variables
    const city = document.getElementById('input-destination-city').value;
    const state = document.getElementById('input-destination-state').value;
    const departureDate = document.getElementById('input-date').value;
    const returnDate = document.getElementById('input-return-date').value;
    // Create a new date instance dynamically with javascript
    const currentDate = new Date();
    const newDate = currentDate.getMonth() + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    console.log(`newDate: ${newDate}`);
    // Calculate the travel duration
    const startDate = new Date(departureDate);
    const endDate = new Date(returnDate);
    const tripDuration = endDate.getTime() - startDate.getTime();
    const daysInTravel = tripDuration / (1000 * 60 * 60 * 24);
    // Console log all values for reference
    console.log(`city: ${city}`);
    console.log(`state: ${state}`);
    console.log(`departureDate:  ${departureDate}`);
    console.log(`returnDate:  ${returnDate}`);
    console.log(`daysInTravel: ${daysInTravel}`);
    console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);
    // Pass key variables into the chained promises, display to console to validate client side can read the variables.
    let placenameData = {
      placenameCity: city,
      placenameState: state
    };
    const coord = await postData('http://localhost:3030/geoNames', placenameData);
    // console.log(`The latitude of ${city.toUpperCase()}, ${state.toUpperCase()} is:  ${coord.lat}.`);
    // console.log(`The longitude of ${city.toUpperCase()}, ${state.toUpperCase()} is:  ${coord.long}.`);

    const fcst = await postData('http://localhost:3030/weatherBit', coord);
    // console.log(`The forecast low temperature for ${city.toUpperCase()}, ${state.toUpperCase()} today is: ${fcst.minTempF} F`);
    // console.log(`The forecast high temperature for ${city.toUpperCase()}, ${state.toUpperCase()} today is: ${fcst.maxTempF} F`);

    const picture = await postData('http://localhost:3030/pixabay', placenameData);
    // console.log(`Pixabay image is ${picture.pixabayImage}.`);

    const allData = await updateUI('http://localhost:3030/all');
  };
  
  // travelCard.addEventListener('click', handleSubmit);

  if(travelCard != null){
    travelCard.addEventListener('click', handleSubmit);
  }
  
  // travelCard.style.display = 'none';
  
  export {
    //main function from client.js
    handleSubmit
  }
  