import './style.css';

const magnifybtn = document.getElementById("magnify");
magnifybtn.addEventListener("click",()=>{
    const input = document.getElementById("searchbar").value;
    fetchfn(input);


})

const renderWeather = (locationData)=>{
    const maincontent = document.getElementById("maincontent");
    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weatherContainer-style");
    maincontent.append(weatherContainer);

    const location = locationData.address;
    const latitude = locationData.latitude;
    const longitude = locationData.longitude;
    const timezone = locationData.timezone;
    const conditions = locationData.currentConditions.conditions;
    console.log(conditions);
    const humidity = locationData.currentConditions.humidity;
    const temp = locationData.currentConditions.temp;
    const time = locationData.currentConditions.datetime;
    const feelslike = locationData.currentConditions.feelslike;



}

const fetchfn = (location)=>{
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=3AD5LGCDKCFCUR85HKZZBLM66`, {mode: 'cors'}).then((e)=>{
        // console.log(e.json(),"is the json");
        return e.json();
    }).then((e)=>{
        renderWeather(e);
    })
}
