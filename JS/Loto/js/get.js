export function getPlayers() {
    let wrong = false;
    let player_numbers = [];
    let player_inputs = document.querySelectorAll('input');
    for (let i = 0; i < player_inputs.length; i++) {
        let number = parseInt(player_inputs[i].value);
        let change = false;
        if (i < (player_inputs.length - 1)) {
            for (let j = 0; j < player_numbers.length; j++) {
                if (number == player_numbers[j]) {
                    player_inputs[i].classList.add('wrong');
                    player_inputs[j].classList.add('wrong');
                    wrong = true;
                    change = true;
                }
            }
        }
        if (isNaN(number)) {
            player_inputs[i].classList.add('wrong');
            wrong = true;
            change = true;
        }
        if (player_inputs[i].classList.contains('wrong') && !change) {
            player_inputs[i].classList.remove('wrong');
        }
        player_numbers.push(number);
    }
    return [wrong , player_numbers];
}