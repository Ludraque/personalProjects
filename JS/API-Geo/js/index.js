const select = document.querySelector('#departementArea');

fetch("https://geo.api.gouv.fr/departements").then(function (response) {
    return response.json();

}).then(function (departements) {
    departements.forEach(departement => {
        let option = document.createElement('option');
        option.setAttribute('value', departement.code);
        option.innerText = departement.code + " - " + departement.nom;
        select.append(option)
    })
})

select.addEventListener('change', () => {
    document.querySelector('#resultat').style.display = "initial";
    let ulD = document.querySelector('#citiesAreaByDepartement');
    ulD.innerHTML = "";
    fetch("https://geo.api.gouv.fr/departements/" + select.value + "/communes").then(function (response) {
        return response.json()

    }).then(function (communes) {
        let totalVilles = 0;
        let totalHabitants = 0;
        communes.forEach(commune => {
            totalVilles++;
            totalHabitants += commune.population;
            let li = document.createElement('li');
            li.innerText = commune.codesPostaux[0] + " : " + commune.nom + " - " + commune.population + " habitants.";
            ulD.append(li)
        })
        let nombre = document.querySelector('#nombre');
        nombre.innerHTML = totalVilles;
        let habitants = document.querySelector('#habitants');
        habitants.innerHTML = totalHabitants;
    })
})

document.addEventListener('keyup', () => {
    let search = document.querySelector('#search');
    let cP = search.value;
    let infoCommune = document.querySelector('#villesCP');
    let ulCP = document.querySelector('#citiesArea');

    if (cP.length == 5) {
        let urlCommune = "https://geo.api.gouv.fr/communes?codePostal=" + cP;

        fetch(urlCommune).then(function (response) {
            return response.json();

        }).then(function (communes) {
            if (infoCommune.innerHTML == "" && ulCP.innerHTML == "") {
                if (communes.length == 0) {
                    infoCommune.innerHTML = "Il n'y a pas de ville possédant ce code postal.";
                } else {

                    let totalHabitants = 0;
                    communes.forEach(commune => {
                        totalHabitants += commune.population;
                        let li = document.createElement('li');
                        li.innerText = cP + " : " + commune.nom + " - " + commune.population + " habitants.";
                        ulCP.append(li)
                    })
                    if (communes.length == 1) {
                        infoCommune.innerHTML = "Il y a 1 ville possédant ce code postal."
                    } else {
                        infoCommune.innerHTML = "Il y a " + communes.length + " villes possédant ce code postal pour un total de " + totalHabitants + " habitants."
                    }
                }
            }


        }).catch(function (error) {

        })
    } else {
        infoCommune.innerHTML = "";
        ulCP.innerHTML = ""
    }
})

