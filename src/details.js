import './css/second.css';
import load from './exports/loaderHTML.js';
import Weather from './exports/Weather.js';

function getWeather(){
    let nomRC = "weather=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nomRC) == 0)
            return c.substring(nomRC.length, c.length);
    }
    return "unknow";
}

var json = getWeather();
if(json !== "unknow"){
    json = JSON.parse(json);
    console.log(json);
    load();
    new Weather(json);
}
