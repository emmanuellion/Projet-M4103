function mashup(tline, ti, ts){
    tline.appendChild(ti);
    tline.appendChild(ts);
    return tline;
}

const fa = ['fa fa-map', 'fa fa-map', 'fa-solid fa-temperature-half', 'fa-solid fa-temperature-full', 'fa-solid fa-temperature-empty', 'fa-solid fa-temperature-half', 'fa fa-tint', 'fa fa-clock-o', 'fa fa-clock-o', 'fa fa-globe', 'fa fa-globe', 'fa-solid fa-wind', 'fa-solid fa-wind'];
const txt = ["Longitude : ", "Lattitude : ", "Température : ", "Température maximum : ", "Température minimum : ", "Température ressentie : ", "Humidité : ", "Heure de lever de soleil : ", "Heure du coucher de soleil : ", "Météo : ", "Description de la météo : ", "Vent : ", "Provenance du vent : "];
const id = ['lon', 'lat', 'tmp', 'tmp_max', 'tmp_min', 'tmp_like', 'humidity', 'rise', 'set', 't', 'des', 'wind_s', 'wind_d'];

function load(){
    let center = document.createElement('div');
    let line = document.createElement('div');
    let j = document.createElement('i');
    let span = document.createElement('span');

    center.setAttribute('class', 'center hide handler');
    line.setAttribute('class', 'line');
    j.setAttribute('aria-hidden', 'true');
    j.setAttribute('style', 'color: white;');

    for(let i = 0; i < fa.length; i++){
        let tline = line.cloneNode(true);
        let k = j.cloneNode(true);
        let ts = span.cloneNode(true);

        k.setAttribute('class', fa[i]);
        ts.setAttribute('id', id[i]);
        ts.textContent = " "+txt[i];
        center.appendChild(mashup(tline, k, ts));
    }
    document.getElementsByTagName('body')[0].appendChild(center);
}

export default load;