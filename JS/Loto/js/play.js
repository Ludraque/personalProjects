const total = 6;
export function getLoto() {
    let loto_numbers = [];
    for (let i = 0; i < total; i++) {
        if (i == total-1) {
            loto_numbers.push(Math.floor(Math.random() * 9));
        } else {
            let exist = true;
            let number;
            while (exist) {
                exist = false;
                number = Math.floor(Math.random() * 49);
                for (let j = 0; j < loto_numbers.length; j++) {
                    if (number == loto_numbers[j]) {
                        exist = true;
                        break;
                    }
                }
            }
            loto_numbers.push(number);
        }
    }
    return loto_numbers
}