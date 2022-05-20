import {buildLaunches} from "./build-launches.js";

let total_launches = 0;
let success = 0;
let list_types = new Set;
const max_launches = 32;

export function buildStats(selected) {
    fetch("https://api.spacexdata.com/v5/launches").then(function (response) {
        return response.json();
    }).then(function (launches) {
        list_types.clear();
        let selected_list = [];
        launches.forEach(launch => {
            let year = launch.date_utc.split("-")[0];
            let id_rocket = launch.id;
            if (year === selected) {
                selected_list.push(id_rocket);
            }
        })
        total_launches = selected_list.length;
        return selected_list;
    }).then(function (ids) {
        success = 0;
        ids.forEach(id => {
            let list = new Set;
            fetch("https://api.spacexdata.com/v5/launches/" + id).then(function (response) {
                return response.json();
            }).then((infos) => {
                if (infos.success === true) {
                    success++;
                }
                let rocket_number = infos.rocket;
                list.add(rocket_number);
                return list;
            }).then(function (ids_rockets) {
                ids_rockets.forEach(id_rocket => {
                    fetch("https://api.spacexdata.com/v4/rockets/" + id_rocket).then(function (response) {
                        return response.json();
                    }).then((infos_rockets) => {
                        let rocket_name = infos_rockets.name;
                        list_types.add(rocket_name)
                    }).then(function () {
                        let template = document.getElementById('per-year');
                        let clone = document.importNode(template.content, true);
                        let info = document.getElementById('info-year');
                        info.innerHTML = "";
                        let nb_launches = clone.querySelector('.number');
                        let nb_success = clone.querySelector('.valeur-succes');
                        let value_launches = clone.querySelectorAll('.value-graph')[0];
                        let value_success = clone.querySelectorAll('.value-graph')[1];
                        let img_launches = clone.querySelectorAll('img')[0];
                        let img_success = clone.querySelectorAll('img')[1];
                        let ul_list = clone.querySelector('ul');
                        info.append(clone);

                        list_types.forEach(list_typec => {
                            let li = document.createElement('li');
                            li.classList.add(list_typec.replace(/\s+/g, '-'));
                            let img = document.createElement('img');
                            img.setAttribute('src', "img/" + list_typec + ".jpg")
                            li.append(img);
                            li.innerHTML += list_typec.split(" ")[0] + "<br />" + list_typec.split(" ")[1];
                            ul_list.append(li);
                        })

                        let fromzero = 0;
                        let jump_launches = ((total_launches * 100) / max_launches) / total_launches;
                        let jump_success = ((success * 100) / total_launches) / total_launches;
                        let jumps_launches = 0;
                        let jumps_success = 0;
                        let count = setInterval(() => {
                            nb_launches.innerHTML = ++fromzero - 1;
                            img_launches.style.bottom = 0.75*jumps_launches + "%";
                            value_launches.style.height = jumps_launches + "%";
                            img_success.style.bottom = 0.75*jumps_success + "%";
                            value_success.style.height = jumps_success + "%";
                            jumps_launches += jump_launches;
                            jumps_success += jump_success;
                            nb_success.innerText = Math.floor(success * 100 / total_launches);
                            if (fromzero > total_launches) {
                                clearInterval(count);
                            }
                        }, 50)
                    }).then(function () {
                        let models = document.querySelectorAll('.types li')
                        models.forEach(model => {
                            model.addEventListener('click', function () {
                                models.forEach(model2 => {
                                    model2.classList.remove('selected-model');
                                })
                                let waiting = document.querySelectorAll('.waiting-for')[0];
                                waiting.style.display = "none";
                                model.classList.add('selected-model');
                                buildLaunches(model.innerText.replace("\n", " "), selected);
                            })
                        })
                    })
                })
            })
        })
    })
}