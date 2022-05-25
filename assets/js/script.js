var searchBoxEl = document.querySelector("#search-box");
var pastSearchBoxEl = document.querySelector("#past-searches");
var todayBoxEl = document.querySelector("#today-forecast");
var fiveDayBoxEl = document.querySelector("#five-day-forecast");
var citySearchFormEl = document.querySelector("#city-search-box");
var submitButtonEl = document.querySelector("#submit-button")

//var thisLat = null;
//var thisLon = null;

// 1) need to get repo
// 2) Need to enter info in:


var getCityLatLon = function (city) {
    var locationApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=a149e2710325b95921f8e4aacd82ed4d";
    //optional to exclude a part: &exclude={part}
    fetch(locationApiURL).then(function(response) {
        //if request was successful:
        if(response.ok) {
            response.json().then(function(data) {
                //pass response data to DOM function
                var thisLat = data[0].lat;
                var thisLon = data[0].lon;
                var thisCity = data[0].name
                getTodayForecast(thisLat, thisLon, thisCity);
                
        })}
        else {
            //direct to homepage if not successful or display alert?
          //  document.location.replace("./index.html");
        }
    });         
}

var getTodayForecast = function(lat, lon, city) {
    //var weatherApiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=a149e2710325b95921f8e4aacd82ed4d";
    var weatherApiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=a149e2710325b95921f8e4aacd82ed4d";

    fetch(weatherApiURL).then(function(response) {
            //if request was successful:
            if(response.ok) {
                response.json().then(function(data) {
                    //pass response data to DOM function
                    console.log(data);
            
                   var thisDate = calculateDate(data.current.dt)

                    displayToday(city, thisDate, data.current.weather[0].icon, data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi);

                    for (var i= 1; i < 6; i++ ){
                       thisDate = calculateDate(data.daily[i].dt);
                    displayFiveDay(thisDate, data.daily[i].weather[0].icon, data.daily[i].temp.day, data.daily[i].wind_speed, data.daily[i].humidity);
                    }
            })}
            else {
                //direct to homepage if not successful
                //document.location.replace("./index.html");
            }
        });   
}

var calculateDate = function(timestamp) {
    var unixTime = timestamp;
    var currentDate = new Date(unixTime * 1000);
    var fullDate = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear(); 
    return fullDate;
}


var displayToday = function (city, date, iconCode, temp, wind, humidity, UVindex) {
    //city and date [no picture as of yet]
    var cityAndDateEl = document.createElement("h2");
    var forecastIconEl = document.createElement("img");
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    //NEEDS TO GET THE icon CODE
    forecastIconEl.setAttribute("src", iconURL);


    cityAndDateEl.textContent = city + " on " + date;
    //display next few areas
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + temp + "\xB0 F";
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + wind + "MPH";
    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + humidity + " %";
    var UVindexTextEl = document.createElement("p");
    UVindexTextEl.textContent = "UV index: ";
    var UVindexScaleEl = document.createElement("span");
    UVindexScaleEl.textContent = "  " + UVindex + "  ";
    if (UVindex < 2 ){
        UVindexTextEl.setAttribute("id", "favorable");
    } else if (UVindex < 5 ) {
        UVindexTextEl.setAttribute("id", "moderate");
    } else {
        UVindexTextEl.setAttribute("id", "severe");

    }


    todayBoxEl.appendChild(cityAndDateEl);
    cityAndDateEl.appendChild(forecastIconEl);
    todayBoxEl.appendChild(tempEl);
    todayBoxEl.appendChild(windEl);
    todayBoxEl.appendChild(humidEl);
    todayBoxEl.appendChild(UVindexTextEl);
    UVindexTextEl.appendChild(UVindexScaleEl);
}

var displayFiveDay = function (date, iconCode, temp, wind, humidity) {
    
    var dateEl = document.createElement("h3");
    var forecastIconEl = document.createElement("img");
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    //NEEDS TO GET THE icon CODE
    forecastIconEl.setAttribute("src", iconURL);


    dateEl.textContent = date;
    //display next few areas
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + temp + "\xB0 F";
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + wind + "MPH";
    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + humidity + " %";

    fiveDayBoxEl.appendChild(dateEl);
    dateEl.appendChild(forecastIconEl);
    fiveDayBoxEl.appendChild(tempEl);
    fiveDayBoxEl.appendChild(windEl);
    fiveDayBoxEl.appendChild(humidEl);

}


var displayWeather = function () {
    //get info from input
        getCityLatLon("New York City");
    }
//click button

displayWeather();



//when a button is clicked, it fetches data, and displays the current weather and the next 5 days. Then create a button of the most recent input

submitButtonEl.addEventListener("click", displayWeather);
