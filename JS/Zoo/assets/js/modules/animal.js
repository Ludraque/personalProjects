const min_size = 40;
const max_size = 200;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export class Animal {
    constructor(race="") {
         this.size = this.generateSize();
         this.baby = this.isBaby(this.size);
         this.race = race;
         this.audio = "assets/audio/" + this.race.toLowerCase() + ".mp3";
         this.image = "assets/img/" + (this.baby ? "bebe" : "parent") + this.race + ".gif";
    }

    generateSize() {
        return randomIntFromInterval(min_size, max_size)
    }

    isBaby(size) {
        return size < (max_size/2.5)
    }

    getHabitat(race) {
        switch(race) {
            case "Ours":
                return "montagne";
            case "Lion":
                return "savane";
            case "Koala":
                return "australia";
            case "Girafe":
                return "savaneNuit";
            default:
                break;

        }
    }

    generateAnimal() {
        let parent = document.getElementById(this.race.toLowerCase()+ 's');
        let audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.pause()
        })
        if (this.checkAudio(parent)) {
            this.generateAudio(parent)
        } else {
            let audio = parent.querySelector('audio');
            audio.play();
        }
        let animal = document.createElement('img');
        animal.setAttribute('src', this.image);
        animal.setAttribute('width', this.size + "px");
        parent.append(animal);
    }

    generateAudio(parent) {
        let audio = document.createElement('audio');
        audio.setAttribute('src', this.audio);
        audio.controls = true;
        audio.volume = 0.3;
        parent.append(audio);
        audio.autoplay = true;
    }

    checkAudio(parent) {
        let song = parent.querySelector('audio')
        return song == null;
    }
}