export function buildDetails(selected_launch) {

    let list_details = document.getElementById('deep-details');
    list_details.innerHTML = "";
    let arrow_wrapper = document.getElementById('extend-wrapper');
    arrow_wrapper.style.display = "initial";
    let arrow = document.getElementById('extend');
    arrow.classList.remove('rotating-animation');
    let infos_video = document.querySelector('#infos-video');
    infos_video.classList.remove('opening-animation');

    fetch("https://api.spacexdata.com/v5/launches/" + selected_launch).then(function (response) {
        return response.json();
    }).then(function (details) {
        let video = details.links.youtube_id;
        let iframe = document.querySelector('iframe');
        iframe.setAttribute('src', "https://youtube.com/embed/" + video);
        return details;
    }).then(function (details) {
        let launchpad_id = details.launchpad;
        fetch("https://api.spacexdata.com/v4/launchpads/" + launchpad_id).then(function (response) {
            return response.json();
        }).then(function (launchpad) {
            let li = document.createElement('li');
            li.innerText = "Launch location: " + launchpad.name + " / " + launchpad.region;
            list_details.append(li);
        });
        return details
    }).then(function (details) {
        let cores = details.cores;
        let cores_landpads = [];
        cores.forEach(core => {
            cores_landpads.push(core.landpad);
        })
        Promise.all(cores_landpads.map(core_landpad =>
            fetch("https://api.spacexdata.com/v4/landpads/" + core_landpad).then(function (response) {
                return response.json();
            })
        )).then(function (details_landpads) {
            cores.forEach(function (core, index) {
                let template_core = document.getElementById('core');
                let clone = document.importNode(template_core.content, true);

                let core_number = clone.querySelector('.core-number');
                core_number.innerText = "Core " + (index + 1) + ": ";

                let attempt = clone.querySelector('.attempt');
                if (core.landing_attempt === true) {
                    attempt.style.color = "green";
                    attempt.innerText = "Attempted";
                    let attempt_success = clone.querySelector('.attempt-success');
                    if (core.landing_success === true) {
                        attempt_success.innerText = "Success";
                        attempt_success.style.color = "green";
                        let landing_type = clone.querySelector('.landing-type');
                        if (core.landing_type !== "Ocean") {
                            landing_type.innerHTML = core.landing_type + "<br />";
                            landing_type.style.color = "orange";
                            let core_landpad = clone.querySelector('.core-landpad');
                            core_landpad.innerText = details_landpads[index].name + " / " + details_landpads[index].locality + " / " + details_landpads[index].region;
                        } else {
                            landing_type.innerText = "Ocean";
                            landing_type.style.color = "cyan";
                        }
                    } else {
                        attempt_success.innerText = "Failure";
                        attempt_success.style.color = "red";
                    }
                } else {
                    attempt.innerText = "Not Attempted";
                    attempt.style.color = "yellow";
                }
                list_details.append(clone);
            })
        })
    })
}