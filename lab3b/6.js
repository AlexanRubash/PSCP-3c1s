function square(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject("Invalid input: not a number");
            } else {
                resolve(number * number);
            }
        }, 1000); // Разрешить Promise через 1 секунду.
    });
}

function cube(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject("Invalid input: not a number");
            } else {
                resolve(number * number * number);
            }
        }, 2000); // Разрешить Promise через 2 секунды.
    });
}

function fourthPower(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject("Invalid input: not a number");
            } else {
                resolve(Math.pow(number, 4));
            }
        }, 3000); // Разрешить Promise через 3 секунды.
    });
}

const promises = [square(25), cube(''), fourthPower(2)];



Promise.race(promises)
    .then((result) => {
        console.log("Тут результат Promise.race:", result);
    })
    .catch((error) => {
        console.error("Тут ошибка Promise.race:", error);
    });

Promise.any(promises)
    .then((result) => {
        console.log("Тут результат Promise.any:", result);
    })
    .catch((errors) => {
        console.error("Тут ошибка Promise.any:", errors);
    });
