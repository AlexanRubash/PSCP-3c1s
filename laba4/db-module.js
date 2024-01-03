const EventEmitter = require('events');

function isValidDate(dateString) {
    // Паттерн для даты в формате dd-mm-eeee
    let datePattern = /^\d{2}-\d{2}-\d{4}$/;

    if (!datePattern.test(dateString)) {
        return false;
    }

    // Разбиваем дату на компоненты
    let parts = dateString.split('-');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    // Проверяем, является ли год четырехзначным и месяц и день в допустимых диапазонах
    if (year < 1000 || year > 9999 || month == 0 || month > 12 || day == 0 || day > 31) {
        return false;
    }

    // Проверяем февраль на високосный год
    if (month == 2) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            if (day > 29) {
                return false; // Февраль в високосный год не может иметь более 29 дней
            }
        } else {
            if (day > 28) {
                return false; // Февраль в невисокосный год не может иметь более 28 дней
            }
        }
    }

    // Проверяем дни в месяцах с 30 и 31 днем
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) {
            return false;
        }
    }

    // Получаем текущую дату
    const currentDate = new Date();

    const inputDateComponents = dateString.split('-');
    const inputDay = parseInt(inputDateComponents[0], 10);
    const inputMonth = parseInt(inputDateComponents[1], 10);
    const inputYear = parseInt(inputDateComponents[2], 10);

    // Создаем объект Date для входной даты
    const inputDate = new Date(inputYear, inputMonth - 1, inputDay);

    if (inputDate > currentDate) {
        return false;
    }

    return true; // Дата в правильном формате и не больше текущей
}


let db =
    [
        {
            id: 1,
            name: "Sanya",
            bday: "2004-01-23"
        },
        {
            id: 2,
            name: "Julya",
            bday: "2004-01-15"
        },
        {
            id: 3,
            name: "Egor",
            bday: "2000-06-13"
        }
    ];

class DB extends EventEmitter {
    select = () => {
        console.log("[SELECT]\n");
        return JSON.stringify(db, null, 2);
    }


    insert = (insertString) => {
        for (let i = 0; i < db.length; ++i)
            if (JSON.parse(insertString).id == db[i].id) {

                console.log('invalid id to insert!\n');
                return;
            }


        // Получаем дату из входной строки в формате "YYYY-MM-DD"
        const inputDateStr = JSON.parse(insertString).bday;

        // Преобразуем дату в формат "DD-MM-YYYY"
        const dateParts = inputDateStr.split('-');
        const formattedDateStr = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        // Проверяем дату с использованием функции isValidDate
        if (!isValidDate(formattedDateStr)) {
            console.log('date is not valid\n');
            return;
        }


        db.push(JSON.parse(insertString));
        console.log("[INSERT]\n");
        return JSON.stringify(db, null, 2);
    }

    update = (updateString) => {
        console.log("[UPDATE]");
        let jsonString = JSON.parse(updateString);
        let id = jsonString.id;
        console.log("id to update: " + id + "\n");

        // Проверка, существует ли объект с указанным id
        let existingRecord = db.find(elem => elem.id === parseInt(id));

        if (!existingRecord) {
            console.log('invalid id\n');
            return;
        }

        const inputDateStr = JSON.parse(updateString).bday;

        const dateParts = inputDateStr.split('-');
        const formattedDateStr = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        if (!isValidDate(formattedDateStr)) {
            console.log('date is not valid\n');
            return;
        }

        // Обновление объекта
        existingRecord.name = jsonString.name;
        existingRecord.bday = jsonString.bday;
        return JSON.stringify(existingRecord, null, 2);
    }




    delete = (id) => {
        console.log("[DELETE]\n");

        console.log(JSON.stringify(db));
        console.log(id);

        let index = db.findIndex(elem => {
            return parseInt(elem.id) === parseInt(id);
        });

        console.log('index: ' + index);

        if (index == -1) {
            console.log('id not found!\n');
            return;
        }
        let deleted = db[index];
        db.splice(index, 1);
        return JSON.stringify(deleted, null, 2);
    }
}

exports.DB = DB;