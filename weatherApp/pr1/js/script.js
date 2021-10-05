const api   =   {
    key:    "1a4b0a1f83d49b88dc786a76ada41355",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

// get the selected element
const searchBox =   document.querySelector(".search-box");

// using an add eventlstner
searchBox.addEventListener('keypress', setQuery);
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchBox.value);
        console.log(searchBox.value);
    }
    
}

function getResult(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city    =   document.querySelector('.location .city');
    city.innerText  =   `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');

    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML  =   `${Math.round(weather.main.temp)}<span>°c</span>`
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText    =   weather.weather[0].main;
    console.log(weather.weather[0].main);
    let bg    =   document.querySelector("body");
    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText    =   `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`

}

function dateBuilder(d) {
    let months  =   ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "December"];
    let days    =   ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date    =   d.getDate();
    let month  =   months[d.getMonth()];
    let year    =   d.getFullYear()

    return `${day} ${date} ${month} ${year}`;
}