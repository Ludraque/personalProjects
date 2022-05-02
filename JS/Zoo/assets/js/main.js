import { Ours } from "./modules/ours.js";
import { Girafe } from "./modules/girafe.js";
import { Lion } from "./modules/lion.js";
import { Koala } from "./modules/koala.js";

const buttons = document.querySelectorAll('.sub-div');
const total = 3;
let lions = [];
let ourses = [];
let girafes = [];
let koalas = [];

function reset() {
    lions = [];
    ourses = [];
    girafes = [];
    koalas = [];
    let animaux = document.querySelectorAll('.animaux');
    animaux.forEach(animal => {
        animal.innerHTML = ""
    })
}

function alerte(race) {
    alert("Trop de " + race + 's');
}

 for (let i = 0; i < buttons.length; i++) {
     buttons[i].addEventListener('click', () => {
         let race = buttons[i].getAttribute('id');
         switch (race) {
             case 'reset':
                 reset();
                 break;
             case 'Ours':
                 if (ourses.length < total) {
                     let ours = new Ours(race);
                     ours.generateAnimal();
                     ourses.push(ours);
                 } else {
                     alerte(race);
                 }
                 break;
             case 'Lion':
                 if (lions.length < total) {
                     let lion = new Lion(race);
                     lion.generateAnimal();
                     lions.push(lion);
                 } else {
                     alerte(race);
                 }
                 break;
             case 'Girafe':
                 if (girafes.length < total) {
                     let girafe = new Girafe(race);
                     girafe.generateAnimal();
                     girafes.push(girafe);
                 } else {
                     alerte(race);
                 }
                 break;
             case 'Koala':
                 if (koalas.length < total) {
                     let koala = new Koala(race);
                     koala.generateAnimal();
                     koalas.push(koala);
                 } else {
                     alerte(race);
                 }
                 break;
             default:
                 break;
         }
     })
 }