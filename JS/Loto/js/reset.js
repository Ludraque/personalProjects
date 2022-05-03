export function resetGame() {
    let message = document.querySelector('h3');
    message.remove();
    let ul = document.querySelector('ul');
    ul.remove();
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
}