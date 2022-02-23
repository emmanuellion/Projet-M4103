import Weather from "./Weather";

class Searcher {
	constructor(para = 1) {
		this.para = para;
		if (this.para == 1) {
			this.initHTMLIndex();
		} else {
			this.initHTMLPop();
		}
		this.init();
	}

	initHTMLIndex = function() {
		
		let inp = document.createElement("input");
		let box = document.createElement("div");
		let map = document.createElement("div");
		let a = document.createElement("a");
		let	but = document.createElement("button");
		let img = document.createElement("img");

		this.bar = inp;
		this.container = box;

		inp.setAttribute("type", "text");
		inp.setAttribute("id", "search");
		inp.setAttribute("placeholder", "Veuillez saisir une adresse");
		box.setAttribute("id", "box");
		map.setAttribute("id", "map");
		a.setAttribute("href", "details.html");
		a.setAttribute("id", "info");
		a.setAttribute("class", "hide handler");
		a.textContent = "Plus d'informations";
		but.setAttribute("id", "end");
		but.setAttribute("class", "hide handler");
		but.textContent = "Relancer"
		img.setAttribute("src", "https://www.univ-amu.fr/system/files/2021-01/DIRCOM-Logo_AMU_Blanc.png");
		img.setAttribute("id", "logo");

		document.getElementsByTagName("body")[0].appendChild(inp);
		document.getElementsByTagName("body")[0].appendChild(box);
		document.getElementsByTagName("body")[0].appendChild(map);
		document.getElementsByTagName("body")[0].appendChild(a);
		document.getElementsByTagName("body")[0].appendChild(but);
		document.getElementsByTagName("body")[0].appendChild(img);
	}

	initHTMLPop = function() {
		let inp = document.createElement("input");
		let box = document.createElement("div");
		
		this.bar = inp;
		this.container = box;
		
		inp.setAttribute("type", "text");
		inp.setAttribute("id", "search");
		inp.setAttribute("placeholder", "Veuillez saisir une adresse");
		box.setAttribute("id", "box");

		document.getElementsByTagName("body")[0].appendChild(inp);
		document.getElementsByTagName("body")[0].appendChild(box);
	}

	init = function() {
		this.bar.addEventListener("keyup", () => {
			for (let i = 0; i < this.container.children.length; i++) {
				if (this.container.children[i].className.includes("li")) {
					this.container.removeChild(this.container.children[i]);
				}
			}
			if (this.bar.value.length == 0) {
				this.container.innerHTML = "";
				return;
			}
			let string = "";
			this.bar.value.split(" ").forEach(char => {
				if (char !== "" && char !== " " && char !== '' && char !== ' ') {
					string += char + "+";
				}
			});
			if (string[string.length - 1] == "+") {
				string = string.slice(0, string.length - 1);
			}
			(async () => {
				await fetch(`https://api-adresse.data.gouv.fr/search/?q=${string}`).then((response) => {
					if (response.status >= 400 && response.status < 600) {
						throw new Error("Bad response from server");
					}
					return response;
				}).then((json) => {
					this.reponseAddress(json);
				}).catch((error) => {
					console.log(error)
				});
			})();
		});
	}

	reponseAddress = async function (json) {
		json = await json.json();
		console.log(json);
		let i = 0;
		json.features.forEach(rue => {
			let li = document.createElement("li");
			li.textContent = rue.properties.label;
			li.setAttribute("data-city", rue.properties.city);
			li.setAttribute("data-lon", rue.geometry.coordinates[0]);
			li.setAttribute("data-lat", rue.geometry.coordinates[1]);
			li.setAttribute("class", "li");
			li.style.marginTop = 10 * i + "px";
			li.addEventListener("click", () => {
				this.container.innerHTML = "";
				(async () => {
					await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${li.dataset.city}&units=metric&appid=<TOKEN>&lang=fr`).then((response) => {
						if (response.status >= 400 && response.status < 600) {
							throw new Error("Bad response from server");
						}
						return response;
					}).then((json) => {
						if (this.para == 1) {
							this.reponseWeather(json, li);
						} else {
							this.responsePop(json);
						}
					}).catch((error) => {
						console.log(error)
					});
				})();
				document.querySelectorAll('.handler').forEach(el => {
					el.classList.remove("hide");
				});
				if (this.para == 1) {
					document.querySelector('#logo').classList.add('hide');
				}
			});
			this.container.appendChild(li);
		});
	}

	reponseWeather = async function (json, li) {
		json = await json.json();
		console.log(json);
		document.cookie = 'weather=' + JSON.stringify(json);
		var map = L.map('map').setView([li.dataset.lat, li.dataset.lon], 12);
		var marker = L.marker([li.dataset.lat, li.dataset.lon]).addTo(map);
		marker.bindPopup(`<strong>Météo pour : ${json.name}</strong><br>${json.main.temp}°C`).openPopup();
		L.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=<TOKEN>', {
				maxZoom: 18,
				attribution: 'Moi - Mabule',
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1
			}
		).addTo(map);
	}

	responsePop = async function (json) {
		document.getElementsByTagName('body')[0].removeChild(this.container);
		document.getElementsByTagName('body')[0].removeChild(this.bar);
		json = await json.json();
		new Weather(json);
	}
}

export default Searcher;
