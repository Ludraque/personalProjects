import {buildDetails} from "./build-details.js";

export function buildLaunches(model, year_selected) {
    let waiting = document.querySelectorAll('.waiting-for')[1];
    waiting.style.display = "none";
    let id_rocket;
    const ul_launches = document.getElementById('list-launches');
    fetch("https://api.spacexdata.com/v4/rockets").then(function (response) {
        return response.json();
    }).then(function(infos_rockets) {
        infos_rockets.forEach(infos_rocket => {
            if (infos_rocket.name === model) {
                id_rocket = infos_rocket.id;
            }
        })
    }).then(function () {
        return fetch("https://api.spacexdata.com/v4/launches").then(function (response) {
            return response.json()
        });
    }).then(function (list_launches) {
        let years_list = [];
        list_launches.forEach(launch => {
            let date_utc = launch.date_utc.split('-')[0];
            if (date_utc === year_selected) {
               years_list.push(launch)
            }
        })
        let correspondings= [];
        years_list.forEach(year_launch => {
            if (year_launch.rocket === id_rocket) {
                correspondings.push(year_launch)
            }
        })
        ul_launches.innerHTML = "";
        correspondings.forEach(corresponding => {
            let li = document.createElement('li');
            let left = document.createElement('div');
            let right = document.createElement('div');
            let ymd = corresponding.date_utc.split('T')[0];
            let year = ymd.split('-')[0];
            let month = ymd.split('-')[1];
            let day = ymd.split('-')[2];
            let time = (corresponding.date_utc.split('T')[1]).split('.')[0];
            let name = corresponding.name;
            let number = corresponding.flight_number;
            left.innerHTML = "Flight name: " + name + "<br />" + "Flight number: " + number ;
            right.innerHTML = "Launch Date: " + day + "/" + month + "/" + year + ":" + time + "<br />" + "Launched: " + (corresponding.success ? "True" : "False");
            li.append(left);
            li.append(right);
            ul_launches.append(li);
            li.addEventListener('click', function () {
                let list_lis = document.querySelectorAll('#list-launches li');
                list_lis.forEach(list_li => {
                    list_li.classList.remove('selected-launch');
                })
                li.classList.add('selected-launch')
                buildDetails(corresponding.id);
            })
        })
    })
}