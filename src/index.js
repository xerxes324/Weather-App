import './style.css';

const magnifybtn = document.getElementById("magnify");
magnifybtn.addEventListener("click",()=>{
    const input = document.getElementById("searchbar").value;
    const unitBtn = document.getElementById("tempunit")
    fetchfn(input,unitBtn.value);
})

const renderWeather = async(locationData, tempUnit)=>{

    const weatherdetails = document.getElementById("weatherdetails");
    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weatherContainer-style");
    const obj = {
        weatherContainerTop : null,
        weatherContainerMiddle : null,
        weatherContainerBottom : null
    };

    Object.keys(obj).forEach((e)=>{
        obj[e] = document.createElement("div");
        obj[e].classList.add(`${e}`);
    })

    const weatherData = {
        address : locationData.address,
        condition : locationData.currentConditions.conditions,
        humidity : locationData.currentConditions.humidity,
        temp : locationData.currentConditions.temp,
        time : locationData.currentConditions.datetime,
        feelslike : locationData.currentConditions.feelslike
      };
      
    const addressBox = document.createElement("p");
    weatherData.address = weatherData.address.charAt(0).toUpperCase() + weatherData.address.slice(1);
    

    addressBox.append("Location : ",weatherData.address);
    obj.weatherContainerTop.append(addressBox)
    await renderTop(obj.weatherContainerTop, weatherData.condition);
    
    const temperatureBox = document.createElement("p");
    const feelslikeBox = document.createElement("p");

    if ( tempUnit === "F"){
        temperatureBox.append("Current temperature : " + weatherData.temp + " °F");
        feelslikeBox.append("Feels Like : " + weatherData.feelslike + " °F");
    }
    else if ( tempUnit === "C"){
        const tempInCelsius = (  (weatherData.temp - 32) * 5 / 9 ).toFixed(2);
        console.log(tempInCelsius,"is the celsisu");
        temperatureBox.append("Current Temperature : " + tempInCelsius + " °C");
        feelslikeBox.append("Feels Like : " + tempInCelsius + " °C");
    }
    obj.weatherContainerMiddle.append(temperatureBox,feelslikeBox)
    weatherContainer.append(obj.weatherContainerTop,obj.weatherContainerMiddle,obj.weatherContainerBottom);
    
    const humidityBox = document.createElement("hp");
    const timeBox = document.createElement("p");

    humidityBox.append("Humidity : ",weatherData.humidity, "%");
    timeBox.append("Time : ", weatherData.time);
    obj.weatherContainerBottom.append(humidityBox,timeBox);

    weatherdetails.textContent = "";
    weatherdetails.append(weatherContainer);    
}


async function renderTop(container, condition) {

    console.log(container);
    try{
        const icon = await import(`./icons/${condition}.svg`)
        document.getElementById("weathericon").src = icon.default;
        const iconImage = document.getElementById("weathericon");
        iconImage.classList.add("weathericon-style");
        container.append(iconImage, condition);
    }
    catch(e){
        console.log(e);
        container.append(condition);
        console.log("we're here")
    }

}

const fetchfn = async(location, tempUnit)=>{
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=3AD5LGCDKCFCUR85HKZZBLM66`, {mode: 'cors'}).then((e)=>{
        return e.json();
    }).then (async(e)=>{
        // const weatherdetails = document.getElementById("weatherdetails");
        // weatherdetails.textContent = "LOADING";
        await renderWeather(e,tempUnit);        
    }).catch((e)=>{
        return;
    })
}


const toggleTemp = async()=>{
    const input = document.getElementById("searchbar").value;
    if ( input === ""){
        console.log("nay")
        return
    }
    else{
        const unitBtn = document.getElementById("tempunit");
        unitBtn.value = (unitBtn.value === "F")? "C" : "F";
        unitBtn.textContent = (unitBtn.value === "F")? " °C " : " °F "
        fetchfn(input, unitBtn.value)
    }
}

const toggleBtn = document.getElementById("tempunit");
toggleBtn.addEventListener("click",()=>{
    toggleTemp();
})