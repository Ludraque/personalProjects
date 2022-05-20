export function buildYears() {
    const years = new Set;
    fetch("https://api.spacexdata.com/v5/launches").then(function (response) {
        return response.json()
    }).then(function (launches) {
        launches.forEach(launch => {
            years.add(launch.date_utc.split('-')[0]);
        })
    }).then(function () {
        years.forEach(year => {
            let ul = document.querySelector('.fa-options')
            let li = document.createElement('li');
            li.setAttribute('rel', year);
            li.innerText = year;
            ul.append(li)
        })
    })
}