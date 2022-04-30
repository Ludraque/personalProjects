export function drawScore (score) {
    let span_score = document.querySelector('.score');
    span_score.innerHTML = "Score : " + score;
}

export function drawLives (lives) {
    let span_lives = document.querySelector('.lives');
    span_lives.innerHTML = "Lives : " + lives;
}

export function drawLevel (level) {
    let span_level = document.querySelector('.level');
    span_level.innerHTML = "Level : " + level;
}