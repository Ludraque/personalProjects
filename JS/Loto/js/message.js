export function displayMessage(s) {
    let main = document.querySelector('main');
    let message = document.createElement('h3');
    switch (s) {
        case 0:
            message.innerText = "Vous n'avez trouvé aucun numéro, Nul! NUL NUL NUL!!!";
            break;
        case 1:
            message.innerText = "Vous avez trouvé un bon numéro, pas fou!";
            break;
        case 6:
            message.innerText = "Incroyable! Nous avons un gagnant";
            break;
        default:
            message.innerText = "Vous avez trouvé " + s + " numéros. Pas mal!"
            break;
    }
    main.append(message);
}