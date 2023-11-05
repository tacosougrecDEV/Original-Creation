const getChaine = document.getElementById("chaine");
const getInfosDuJour = document.getElementById("infosDuJour");
const getToday = document.getElementById("today");

let tableauToday = [];
let tableauSemaine = [];
let tableauStats = ["Ressenti", "Humidité", "Vent"];
let selectedValue = 'Paris';
let choixVille = document.getElementById("choixVille");
choixVille.value = "";

function majuscule(chaine) {
    let premiereLettreMajuscule = chaine.charAt(0).toUpperCase();
    let resteDeLaChaineEnMinuscules = chaine.slice(1).toLowerCase();
    let chaineMajuscule = premiereLettreMajuscule + resteDeLaChaineEnMinuscules;
    return chaineMajuscule;
}

//Date
//Jour de la semaine (en majuscule)
const date = new Date();
const options = {
    day: 'numeric',
    weekday: 'long'
};
const dateFormatee = date.toLocaleDateString('fr-FR', options);
let dateMaj = majuscule(dateFormatee);
//Jour de la semaine (en majuscule)

//Mois (en majuscule)
const optionsMois = {
    month: 'long'
};
const month = date.toLocaleDateString('fr-FR', optionsMois);
let moisMaj = majuscule(month);
//Mois (en majuscule)
//Date


//Creer ElementToday
function creerElementToday(type, i, parent) { //MEME FONCTION
    let createEl = document.createElement(type);
    if(type === "img"){
        createEl.src = tableauToday[0][i];
        parent.appendChild(createEl);
        return;
    }
    createEl.innerText = tableauToday[0][i];
    parent.appendChild(createEl);
}
//Creer un ElementToday

//Creer un ElementWeek
function creerElementWeek(typeParent, nomParent, i, typeEnfant, j, nomEnfant) { 
    let createDiv = document.createElement(typeParent);
    createDiv.classList.add(nomParent);
    createDiv.id = nomParent + i;
    if(typeEnfant === "img"){
        let createImg = document.createElement(typeEnfant);
        createImg.src = tableauSemaine[i][j];
        createDiv.appendChild(createImg);
        return createDiv;
    }
    let createEl = document.createElement(typeEnfant);
    createEl.classList.add(nomEnfant);
    createEl.innerText = tableauSemaine[i][j];
    createDiv.appendChild(createEl);
    return createDiv;
}
//Creer un ElementWeek

//Ajouter le contenu dans le corps de la page
function addContentToPage(nomParent,typeEnfant,nomGP,nomEnfant){
    let valeurs = creerElementWeek("div", nomParent , i, typeEnfant, j, nomEnfant);
    nomGP.appendChild(valeurs);
}
//Ajouter le contenu dans le corps de la page

//delete
function suppr() {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    getChaine.textContent = "";
    getToday.textContent = "";
    let ul = document.createElement("ul");
    ul.id = "infosDuJour";
    let li = document.createElement("li");
    li.innerText = "Météo";
    ul.appendChild(li);
    getToday.appendChild(ul);
}
//delete

//Demarrage
//Aujourd'hui

fetch('http://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&lang=fr&appid=245fcaaec0c578ff00818166cc28347b')
    .then(res => res.json())
    .then(resJson => {
        
        let description = majuscule(resJson.weather[0].description);

        tableauToday.push([
            dateMaj + " " + moisMaj,
            description,
            resJson.name + " (" + resJson.sys.country + ")",
            "https://openweathermap.org/img/wn/" + resJson.weather[0].icon + "@2x.png",
            Math.round(resJson.main.temp) + "°C",
            "Ressenti: " + Math.round(resJson.main.feels_like) + "°C",
            "Humidité: " + resJson.main.humidity + "%",
            "Vent: " + resJson.wind.speed + "km/h"
        ]);
        for (i = 0; i < tableauToday[0].length; i++) {
            if(i === 0 ||i === 1 ){
                creerElementToday("li", i, getInfosDuJour);
            }
            if(i === 2 ||i === 4 ){
                creerElementToday("h1", i, getToday);
            }
            if(i === 3){
                creerElementToday("img", i, getToday);
            }
            if(i === 5 ||i === 6 ||i === 7 ){
                creerElementToday("h3", i, getToday);
            }
        }
        
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    })
    .catch(() => {
        document.getElementById('loadingScreen').style.display = 'block';
        document.getElementById('content').style.display = 'none';
        choixVille.setAttribute("placeholder", "");
    });
//Aujourd'hui

//Météo prochains 5 Jours
fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + selectedValue + '&units=metric&lang=fr&appid=245fcaaec0c578ff00818166cc28347b')
    .then(res => res.json())
    .then(resJson5Days => {
        //Pour +1
        for (i = 0; i < 5; i++) {

            //Formatage Date
            let dateI = new Date();
            dateI.setDate(date.getDate() + 1 + 1 * i);
            const options = {
                day: 'numeric',
                weekday: 'long'
            };
            let dateIFormatee = dateI.toLocaleDateString('fr-FR', options);
            let dateIMaj = majuscule(dateIFormatee);
            //Formatage Date

            tableauSemaine.push([
                dateIMaj,
                "https://openweathermap.org/img/wn/" + resJson5Days.list[7 + 8 * i].weather[0].icon + "@2x.png",
                Math.round(resJson5Days.list[7 + 8 * i].main.temp) + "°C",
                Math.round(resJson5Days.list[7 + 8 * i].main.feels_like) + "°C",
                resJson5Days.list[7 + 8 * i].main.humidity + "%",
                resJson5Days.list[7 + 8 * i].wind.speed + "km/h",
            ]);

        }

        for (i = 0; i < tableauSemaine.length; i++) {
            for(j = 0; j < 4; j++){
                if (j === 0) {
                    addContentToPage("jour","h1",getChaine,"day");
                }
                if (j === 1) {
                    let getJour = document.getElementById("jour" + i);
                    addContentToPage("details","img",getJour);
                }
                if (j === 2) {
                    let getDetails = document.getElementById("details" + i);
                    addContentToPage("dayStats","h1",getDetails,"temp");
                }
                if(j === 3){
                    for (var k = 0; k < tableauStats.length; k++) {
                        let getDayStats = document.getElementById("dayStats" + i);

                        let createDiv = document.createElement("div");
                        createDiv.classList.add("dayStat");
                        createDiv.id = "dayStat" + i + "-" + k;
                        getDayStats.appendChild(createDiv);
                        
                        let getDayStat = document.getElementById("dayStat" + i + "-" + k);
                        for (l = 0; l < 2; l++) {
                            let createH3 = document.createElement("h3");
                            if(l === 0){
                                    createH3.innerText = tableauStats[k];
                                    getDayStat.appendChild(createH3);
                            }
                            if(l === 1){
                                    createH3.innerText = tableauSemaine[i][k + 3];
                                    getDayStat.appendChild(createH3);
                            }
                        }
                    }
                }
            }
        }
    })
    .catch(() => {
        document.getElementById('loadingScreen').style.display = 'block';
        document.getElementById('content').style.display = 'none';
        choixVille.setAttribute("placeholder", "");
        
    });
//Météo prochains 5 Jours

//Demarrage

//Changer de ville


//Aujourd'hui
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
});

function onSelect() {
    //Selection ville
    let selectedValue = choixVille.value;
    let placeholder = majuscule(selectedValue);
    choixVille.setAttribute("placeholder", placeholder);
    
    document.getElementById('loadingScreen').style.display = 'block';
    document.getElementById('content').style.display = 'none';


    //Changement de l'adresse pour l'API
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + selectedValue + '&units=metric&lang=fr&appid=245fcaaec0c578ff00818166cc28347b')
        .then(res => res.json())
        .then(resJson => {
            suppr();
            let description = majuscule(resJson.weather[0].description);
            tableauToday = [];
            tableauToday.push([
                dateMaj + " " + moisMaj,
                description,
                resJson.name + " (" + resJson.sys.country + ")",
                "https://openweathermap.org/img/wn/" + resJson.weather[0].icon + "@2x.png",
                Math.round(resJson.main.temp) + "°C",
                "Ressenti: " + Math.round(resJson.main.feels_like) + "°C",
                "Humidité: " + resJson.main.humidity + "%",
                "Vent: " + resJson.wind.speed + "km/h"
            ]);
            for (i = 0; i < tableauToday[0].length; i++) {
                if(i === 0 ||i === 1 ){
                    creerElementToday("li", i, document.getElementById("infosDuJour"));
                }
                if(i === 2 ||i === 4 ){
                    creerElementToday("h1", i, getToday);
                }
                if(i === 3){
                    creerElementToday("img", i, getToday);
                }
                if(i === 5 ||i === 6 ||i === 7 ){
                    creerElementToday("h3", i, getToday);
                }
            }
        })
        .catch(() => {
            document.getElementById('loadingScreen').style.display = 'block';
            document.getElementById('content').style.display = 'none';
            choixVille.setAttribute("placeholder", "");
        });
    //Aujourd'hui


    //Météo prochains 5 Jours
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + selectedValue + '&units=metric&lang=fr&appid=245fcaaec0c578ff00818166cc28347b')
        .then(res => res.json())
        .then(resJson5Days => {

            tableauSemaine = [];
            for (i = 0; i < 5; i++) {

                //Formatage Date
                let dateI = new Date();
                dateI.setDate(date.getDate() + 1 + 1 * i);
                const options = {
                    day: 'numeric',
                    weekday: 'long'
                };
                let dateIFormatee = dateI.toLocaleDateString('fr-FR', options);
                let dateIMaj = majuscule(dateIFormatee);
                //Formatage Date

                tableauSemaine.push([
                    dateIMaj,
                    "https://openweathermap.org/img/wn/" + resJson5Days.list[7 + 8 * i].weather[0].icon + "@2x.png",
                    Math.round(resJson5Days.list[7 + 8 * i].main.temp) + "°C",
                    Math.round(resJson5Days.list[7 + 8 * i].main.feels_like) + "°C",
                    resJson5Days.list[7 + 8 * i].main.humidity + "%",
                    resJson5Days.list[7 + 8 * i].wind.speed + "km/h",
                ]);

            }

            for (i = 0; i < tableauSemaine.length; i++) {
            for(j = 0; j < 4; j++){
                if (j === 0) {
                    addContentToPage("jour","h1",getChaine,"day");
                }
                if (j === 1) {
                    let getJour = document.getElementById("jour" + i);
                    addContentToPage("details","img",getJour);
                }
                if (j === 2) {
                    let getDetails = document.getElementById("details" + i);
                    addContentToPage("dayStats","h1",getDetails,"temp");
                }
                if(j === 3){
                    for (var k = 0; k < tableauStats.length; k++) {
                        let getDayStats = document.getElementById("dayStats" + i);

                        let createDiv = document.createElement("div");
                        createDiv.classList.add("dayStat");
                        createDiv.id = "dayStat" + i + "-" + k;
                        getDayStats.appendChild(createDiv);
                        
                        let getDayStat = document.getElementById("dayStat" + i + "-" + k);
                        for (l = 0; l < 2; l++) {
                            let createH3 = document.createElement("h3");
                            if(l === 0){
                                    createH3.innerText = tableauStats[k];
                                    getDayStat.appendChild(createH3);
                            }
                            if(l === 1){
                                    createH3.innerText = tableauSemaine[i][k + 3];
                                    getDayStat.appendChild(createH3);
                            }
                        }
                    }
                }
            }
        }
        })
        .catch(() => {
            document.getElementById('loadingScreen').style.display = 'block';
            document.getElementById('content').style.display = 'none';
            choixVille.setAttribute("placeholder", "");
            
        });
    //Météo prochains 5 Jours
}
//Changer de ville