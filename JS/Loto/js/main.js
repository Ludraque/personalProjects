import { getPlayers } from './get.js';
import { getLoto } from './play.js';
import { compare } from './compare.js';
import { displayMessage } from './message.js';
import { displayResults } from './display.js';
import { resetGame } from './reset.js';

const joue = document.getElementById('joue');
const reset = document.getElementById('rejouer');

joue.addEventListener('click', () => {
    let player_numbers = getPlayers();
    let wrong = player_numbers[0];
    player_numbers.splice(0,1);
    if (!wrong) {
        joue.disabled = true;
        reset.disabled = false;
        let loto_numbers =  getLoto();
        let score = compare(player_numbers, loto_numbers);
        displayMessage(score);
        displayResults(loto_numbers);
    }
});
reset.addEventListener('click', () => {
    resetGame();
    joue.disabled = false;
    reset.disabled = true
});