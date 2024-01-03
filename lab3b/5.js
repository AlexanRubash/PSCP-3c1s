function square(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject("Ошибка: Введи нормальное число");
        } else {
            resolve(number * number);
        }
    });
}

function cube(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject("Ошибка: Введи нормальное число");
        } else {
            resolve(number * number * number);
        }
    });
}

function fourthPower(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject("Ошибка: Введи нормальное число");
        } else {
            resolve(Math.pow(number, 4));
        }
    });
}

const inputNumber =3 ; // Измените значение для тестирования разных входных данных.

Promise.all([
    square(inputNumber),
    cube(inputNumber),
    fourthPower(inputNumber)
])
    .then((results) => {
        console.log("Square:", results[0]);
        console.log("Cube:", results[1]);
        console.log("Fourth Power:", results[2]);
    })
    .catch((error) => {
        console.error(error);
    });
