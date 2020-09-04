function init() {
    console.log('Initializing.. begin gathering trip details.');
  }
  
const postData = async ( url='', data={})=>{
      const response = await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
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
  
// export const getData = async (url) => {
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
  
// const updateUI = async (url) => {
//     console.log('UpdateUI function starting');
//     const response = await fetch(url);
//     try {
//       const data = await response.json();
//       // document.getElementById("results-image").src = data.img;
//       // document.getElementById("result-destination").innerHTML = `Trip to: ${data.location}`
//       // document.getElementById("result-departure").innerHTML = `Departure: ${data.startDate}`
//       // document.getElementById("result-return").innerHTML = `Return: ${data.endDate}`
//       // document.getElementById("result-duration").innerHTML = `Duration: ${data.duration} days`
//       // document.getElementById("trip-start").innerHTML = `Your trip is ${data.timeTillTravel} days from now`
//       // document.getElementById("result-temp").innerHTML = `${data.temp}°F`
//       // document.getElementById("result-description").innerHTML = `${data.description}`
//       document.getElementById('allData').innerHTML = 'Hello, your trip details are below. /n `Trip to: ${data.location}`'
//     } catch (error) {
//       console.log("error", error);
//     }
// };
  
  /* Global Variables */
  const travelCard = document.getElementById('input-submit');
  // const travelResults = document.getElementById('travel-results');
  
  // export async function handleSubmi t(event) {
  async function handleSubmit(event) {
    // Set submit data into key variables
    const destination = document.getElementById('input-destination').value;
    const departureDate = document.getElementById('input-date').value;
    const returnDate = document.getElementById('input-return-date').value;
    // Create a new date instance dynamically with javascript
    const currentDate = new Date();
    const newDate = currentDate.getMonth() + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    console.log(`newDate: ${newDate}`)
    // Calculate the travel duration
    const startDate = new Date(departureDate);
    const endDate = new Date(returnDate);
    const tripDuration = endDate.getTime() - startDate.getTime();
    const daysInTravel = tripDuration / (1000 * 60 * 60 * 24);
    // Console log all values for reference
    console.log(`destination: ${destination}`);
    console.log(`departureDate:  ${departureDate}`);
    console.log(`returnDate:  ${returnDate}`);
    console.log(`daysInTravel: ${daysInTravel}`);
    console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);
    // Let the functions run async and wait until completion
    // await getData('http://localhost:3030/geoNames');
    await getData(`http://localhost:3030/geoNames/?placename=${destination}`)
    // await getData('http://localhost:3030/weatherBit');
    // await getData('http://localhost:3030/pixabay');
    // await updateUI('http://localhost:3030/all');
  }
  
  travelCard.addEventListener('click', handleSubmit);
  
  // await Client.getData('http://localhost:3030/geoNames')
  // await Client.getData('http://localhost:3030/weatherBit')
  // await Client.getData('http://localhost:3030/pixabay')
  // await Client.updateUI('http://localhost:3030/all')
  // travelCard.style.display = 'none';
  
  export {
    //main function from client.js
    init
  }
  