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
//txt
function creerElementTodayInfos(type, i) {
    let createEl = document.createElement(type);
    createEl.innerText = tableauToday[0][i];
    document.getElementById("infosDuJour").appendChild(createEl);
}
//txt

//txt
function creerElementTodayTxt(type, i, parent) {
    let createEl = document.createElement(type);
    createEl.innerText = tableauToday[0][i];
    parent.appendChild(createEl);
}
//txt

//img
function creerElementTodayImg(type, i, parent) {
    let createEl = document.createElement(type);
    createEl.src = tableauToday[0][i];
    parent.appendChild(createEl);
}
//img
//Creer un ElementToday

//Creer un ElementWeek
//txt
function creerElementWeekTxt(typeParent, nomParent, i, typeEnfant, nomEnfant, j) {
    let createDiv = document.createElement(typeParent);
    createDiv.classList.add(nomParent);
    createDiv.id = nomParent + i;
    let createEl = document.createElement(typeEnfant);
    createEl.classList.add(nomEnfant);
    createEl.innerText = tableauSemaine[i][j];
    return [createDiv, createEl];
}
//txt

//img
function creerElementWeekImg(typeParent, nomParent, i, typeEnfant, j) {
    let createDiv = document.createElement(typeParent);
    createDiv.classList.add(nomParent);
    createDiv.id = nomParent + i;
    let createImg = document.createElement(typeEnfant);
    createImg.src = tableauSemaine[i][j];
    return [createDiv, createImg];
}
//img
//Creer un ElementWeek

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
            switch (i) {
                case 0:
                    creerElementTodayTxt("li", i, getInfosDuJour);
                    break;
                case 1:
                    creerElementTodayTxt("li", i, getInfosDuJour);
                    break;
                case 2:
                    creerElementTodayTxt("h1", i, getToday);
                    break;
                case 3:
                    creerElementTodayImg("img", i, getToday);
                    break;
                case 4:
                    creerElementTodayTxt("h1", i, getToday);
                    break;
                default:
                    creerElementTodayTxt("h3", i, getToday);
            }
        }
        tableauToday = []; //vider tableau
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
            for (var j = 0; j < 1; j++) {
                let valeurs = creerElementWeekTxt("div", "jour", i, "h1", "day", j);
                valeurs[0].appendChild(valeurs[1]);
                getChaine.appendChild(valeurs[0]);
            }
            for (var j = 1; j < 2; j++) {
                let getJour = document.getElementById("jour" + i);
                let valeurs = creerElementWeekImg("div", "details", i, "img", j);

                valeurs[0].appendChild(valeurs[1]);
                getJour.appendChild(valeurs[0]);
            }
            for (var j = 2; j < 3; j++) {
                let getDetails = document.getElementById("details" + i);
                let valeurs = creerElementWeekTxt("div", "dayStats", i, "h1", "temp", j);

                valeurs[0].appendChild(valeurs[1]);
                getDetails.appendChild(valeurs[0]);
            }
            for (var k = 0; k < tableauStats.length; k++) {
                let getDayStats = document.getElementById("dayStats" + i);
                let createDiv = document.createElement("div");

                createDiv.classList.add("dayStat");
                createDiv.id = "dayStat" + i + "-" + k;
                getDayStats.appendChild(createDiv);

                let getDayStat = document.getElementById("dayStat" + i + "-" + k);
                for (l = 0; l < 2; l++) {
                    let createH3 = document.createElement("h3");
                    let colonne = l;
                    switch (colonne) {
                        case 0:
                            createH3.innerText = tableauStats[k];
                            getDayStat.appendChild(createH3);
                            break;
                        default:
                            createH3.innerText = tableauSemaine[i][k + 3];
                            getDayStat.appendChild(createH3);
                    }
                }
            }
        }
        tableauSemaine = []; //vider tableau

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


    //Changement de l'adresse pour l'API
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + selectedValue + '&units=metric&lang=fr&appid=245fcaaec0c578ff00818166cc28347b')
        .then(res => res.json())
        .then(resJson => {
            suppr();
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
                switch (i) {
                    case 0:
                        creerElementTodayInfos("li", i);
                        break;
                    case 1:
                        creerElementTodayInfos("li", i);
                        break;
                    case 2:
                        creerElementTodayTxt("h1", i, getToday);
                        break;
                    case 3:
                        creerElementTodayImg("img", i, getToday);
                        break;
                    case 4:
                        creerElementTodayTxt("h1", i, getToday);
                        break;
                    default:
                        creerElementTodayTxt("h3", i, getToday);
                }
            }
            tableauToday = []; //vider tableau
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
                for (var j = 0; j < 1; j++) {
                    let valeurs = creerElementWeekTxt("div", "jour", i, "h1", "day", j);
                    valeurs[0].appendChild(valeurs[1]);
                    getChaine.appendChild(valeurs[0]);
                }
                for (var j = 1; j < 2; j++) {
                    let getJour = document.getElementById("jour" + i);
                    let valeurs = creerElementWeekImg("div", "details", i, "img", j);

                    valeurs[0].appendChild(valeurs[1]);
                    getJour.appendChild(valeurs[0]);
                }
                for (var j = 2; j < 3; j++) {
                    let getDetails = document.getElementById("details" + i);
                    let valeurs = creerElementWeekTxt("div", "dayStats", i, "h1", "temp", j);

                    valeurs[0].appendChild(valeurs[1]);
                    getDetails.appendChild(valeurs[0]);
                }
                for (var k = 0; k < tableauStats.length; k++) {
                    let getDayStats = document.getElementById("dayStats" + i);
                    let createDiv = document.createElement("div");

                    createDiv.classList.add("dayStat");
                    createDiv.id = "dayStat" + i + "-" + k;
                    getDayStats.appendChild(createDiv);

                    let getDayStat = document.getElementById("dayStat" + i + "-" + k);
                    for (l = 0; l < 2; l++) {
                        let createH3 = document.createElement("h3");
                        let colonne = l;
                        switch (colonne) {
                            case 0:
                                createH3.innerText = tableauStats[k];
                                getDayStat.appendChild(createH3);
                                break;
                            default:
                                createH3.innerText = tableauSemaine[i][k + 3];
                                getDayStat.appendChild(createH3);
                        }
                    }
                }
            }
            tableauSemaine = []; //vider tableau*/

        })
        .catch(()=> {
            document.getElementById('loadingScreen').style.display = 'block';
            document.getElementById('content').style.display = 'none';
            choixVille.setAttribute("placeholder", "");
        });
    //Météo prochains 5 Jours


}
//Changer de ville