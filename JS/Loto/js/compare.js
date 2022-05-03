export function compare(player, loto) {
    player = player[0];
    let starp = player[player.length - 1];
    let starl = loto[loto.length - 1];
    let score = 0;
    if (starp == starl) {
        score++;
    }
    for (let i = 0; i < player.length - 1; i++) {
        for (let j = 0; j < loto.length - 1; j++) {
            if (player[i] == loto[j]) {
                score++;
            }
        }
    }
    return score
}