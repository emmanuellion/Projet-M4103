class Weather {
    constructor(json) {
        this.json = json;
        this.setup();
    }

    setup = () => {
        document.querySelector('#lon').textContent += this.json.coord.lon;
        document.querySelector('#lat').textContent += this.json.coord.lat;
        document.querySelector('#tmp').textContent += this.json.main.temp + '°C';
        document.querySelector('#tmp_max').textContent += this.json.main.temp_max + '°C';
        document.querySelector('#tmp_min').textContent += this.json.main.temp_min + '°C';
        document.querySelector('#tmp_like').textContent += this.json.main.feels_like + '°C';
        document.querySelector('#humidity').textContent += this.json.main.humidity + '%';
        let a = new Date(this.json.sys.sunrise * 1000);
        let b = new Date(this.json.sys.sunset * 1000);
        document.querySelector('#rise').textContent += a.getHours() + 'h ' + a.getMinutes();
        document.querySelector('#set').textContent += b.getHours() + 'h ' + b.getMinutes();
        document.querySelector('#t').textContent += this.json.weather[0].main;
        document.querySelector('#des').textContent += this.json.weather[0].description;
        document.querySelector('#wind_s').textContent += this.json.wind.speed + ' km/h';
        document.querySelector('#wind_d').textContent += this.getDirection(this.json.wind.deg);
    }

    getDirection = function (deg) {
        var dir = ""
        if (deg < 23 || deg > 338)
            dir = "Nord";
        else if (deg < 68 && deg > 22)
            dir = "Nord ouest";
        else if (deg < 113 && deg > 67)
            dir = "Est";
        else if (deg < 158 && deg > 112)
            dir = "Sud est";
        else if (deg < 203 && deg > 157)
            dir = "Sud";
        else if (deg < 248 && deg > 202)
            dir = "Sud ouest";
        else if (deg < 293 && deg > 247)
            dir = "Ouest";
        else if (deg < 339 && deg > 292)
            dir = "Nord ouest";
        return dir;
    }
}

export default Weather;