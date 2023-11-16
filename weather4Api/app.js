 //let apiKey = 17eacaa5a5c047bb3de8cdc287ee3c4b
 //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
 //https://openweathermap.org/img/wn/50d.png - icon
const city = document.querySelector('input')
const btn = document.getElementById('btn')
const apiKey = '8eafd8a45aaf9f21d6f0842a533fe35a'; 
let validation = document.getElementById('validation')

btn.addEventListener('click',()=>{
  const forLatAndLon = fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city.value}}`)
 .then(response => response.json())
 .then(result => result[0]);

  forLatAndLon.then(obj=>{
   if(obj == undefined){
    validation.innerHTML = 'Invalid City Name';
   }
   else{
    validation.innerHTML = ''
    const lat = obj.lat;
    const lon = obj.lon;
     // weather reports
     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.json())
    .then(reports => weatherReports(reports))
   }
})
})

function weatherReports(reports){
 reports['location'] = document.querySelector('input').value
 localStorage.setItem('weatherReports',JSON.stringify(reports)) 
 window.location.href = 'result.html'
}


