const total = 6;
const imgs = "img/";
export function displayResults(loto) {
    let main = document.querySelector('main');
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'results');
    for (let i = 0; i < total; i++) {
        let li = document.createElement('li');
        li.setAttribute('id', 'number' + i);
        let bg = document.createElement('img');
        bg.setAttribute('class', 'bg')
        if (i == total - 1) {
            bg.setAttribute('src', imgs + "joker.png");
        } else {
            bg.setAttribute('src', imgs + "boule.png");
        }
        li.append(bg);
        li.append(loto[i]);
        ul.append(li);
    }
    main.append(ul);
}