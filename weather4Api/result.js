// getting data from front end handling in the front end itself
let reports = JSON.parse(localStorage.getItem('weatherReports'))
console.log(reports)
const celcius = (reports.main.temp - 273.15).toFixed(0)
const farenheit = ((reports.main.temp - 273.15) * 9/5 + 32).toFixed()
const place = reports.location
const windSpeed = (reports.wind.speed *  3.6).toFixed(2) + " km/hr"
const windDirection = getDirections(reports.wind.deg)
const airPressure = reports.main.pressure
const humidityValue = reports.main.humidity +'%'
const visibilityValue = Math.round(reports.visibility * 0.000621371) ;
const iconId = reports.weather[0].icon
const desVal = reports.weather[0].description
console.log(iconId)
// getting elements 
const icon = document.querySelector('.icon')
const img = document.getElementById("img")
const celciusAndFarenheit = document.querySelector(".celciusAndFarenheit");
const weatherInfo = document.querySelector(".weatherInfo");
const speed = document.querySelector(".speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const airpressure = document.querySelector(".airpressure");


// first container - icon
img.src = `https://openweathermap.org/img/wn/${iconId}.png`
const des = document.createElement('p')
des.textContent = capitalizeFirstLetter(desVal)
icon.appendChild(des)

// second container - for celcius and farenheit
const cfElement = document.createElement('p')
cfElement.id = 'cfvalue'
cfElement.textContent = celcius
const cfSup = document.createElement('sup')
cfSup.textContent = 'C/F'
cfSup.id = 'cfsup'
const temp = document.createElement('p')
temp.textContent = 'Temperature'
temp.id = 'temp'
cfElement.appendChild(cfSup)
celciusAndFarenheit.appendChild(cfElement)
celciusAndFarenheit.appendChild(temp)


celciusAndFarenheit.addEventListener('click',()=>{
  if(cfElement.innerText === celcius+'C/F'){
    cfElement.innerHTML = cfElement.innerHTML.replace(celcius,farenheit)
    cfElement.innerHTML = cfElement.innerHTML.replace('C/F','F/C')
    console.log(cfSup.textContent)
  } 
  else{
    cfElement.innerHTML = cfElement.innerHTML.replace(farenheit,celcius)
    cfElement.innerHTML = cfElement.innerHTML.replace('F/C','C/F')

  }
});

//Third container 

const placevalue = document.createElement('p')
const datevalue = document.createElement('p')
placevalue.textContent = capitalizeFirstLetter(place)
placevalue.id = 'placevalue'
datevalue.textContent = getCurrentDateFormatted();
datevalue.id = 'datevalue'
weatherInfo.appendChild(placevalue)
weatherInfo.appendChild(datevalue)

// fourth container
const windhead = document.createElement('p')
windhead.id ='windhead'
windhead.textContent = 'Wind Status'
const windValue  = document.createElement('p')
windValue.id ='windvalue'
windValue.textContent = windSpeed
const windDir= document.createElement('p')
windDir.id ='winddir'
windDir.textContent = getDirections(windDirection)
speed.appendChild(windhead)
speed.appendChild(windValue)
speed.appendChild(windDir)

//fifth container]
const humidityHead = document.createElement('p')
humidityHead.textContent = 'Humidity'
const humidityVal  = document.createElement('p')
humidityVal.id ='humidityval'
humidityVal.textContent = humidityValue
humidity.appendChild(humidityHead)
humidity.appendChild(humidityVal)

//sixth container
const visibilityHead = document.createElement('p')
visibilityHead.textContent = 'Visibility'
const visibilityVal  = document.createElement('p')
visibilityVal.id ='humidityval'
visibilityVal.textContent = visibilityValue
const miles  = document.createElement('span')
miles.id ='miles'
miles.textContent = 'Miles'
visibilityVal.appendChild(miles)
visibility.appendChild(visibilityHead)
visibility.appendChild(visibilityVal)

//seveth container
const apHead = document.createElement('p')
apHead.textContent = 'Air Pressure'
const apVal  = document.createElement('p')
apVal.id ='apVal'
apVal.textContent = airPressure
const mb  = document.createElement('span')
mb.id ='mb'
mb.textContent = 'Mb'
apVal.appendChild(mb)
airpressure.appendChild(apHead)
airpressure.appendChild(apVal)

// finding the direction 
function getDirections(deg){
 switch (true) {
   case deg === 0 || deg === 360:
     direction = 'North';
     break;
   case deg === 90:
     direction = 'East';
     break;
   case deg === 180:
     direction = 'South';
     break;
   case deg === 270:
     direction = 'West';
     break;
   case deg > 0 && deg < 90:
     direction = 'North East';
     break;
   case deg > 90 && deg < 180:
     direction = 'South East';
     break;
   case deg > 180 && deg < 270:
     direction = 'South West';
     break;
   case deg > 270 && deg < 360:
     direction = 'North West';
     break;
 }

 return direction;
}

// getting current date using Date class
function getCurrentDateFormatted() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  
  return `${day} ${month} ${year}`;
}

function capitalizeFirstLetter(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}