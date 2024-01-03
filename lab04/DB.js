const EventEmitter = require('events');
class DB extends EventEmitter {
    checkData(data) {
        const currentDate = new Date();

        const [day, month, year] = data.split('-').map(Number);

        const currentYear = new Date().getFullYear();
        const currentDay = String(currentDate.getDate());
        const currentMonth = String(currentDate.getMonth() + 1)
        console.log(`: ${currentDay}-${currentMonth}-${currentYear}`)
        if (year <= currentYear) {
            if(month <= currentMonth) {
                if (day <= currentDay) {
                    return true;
                }
            }
        }
        return false;
    }

    db_data = [
        {id: 1, name: 'Shumksiy N.A.', bday: '12-08-2003'},
        {id: 2, name: 'Volikov D.A.', bday: '13-11-2003'},
        {id: 3, name: 'Podobed V.G.', bday: '22-09-2003'},
        {id: 4, name: 'Erohovec I.A.', bday: '27-01-2003'},
        {id: 5, name: 'Kartuzov D.A.', bday: '23-01-2003'}
    ]
    async select() {
        return new Promise((resolve) => {
            resolve(this.db_data);
        });
    };

    async insert(person) {
        return new Promise((resolve, reject) => {
            let foundPersonIndex = this.db_data.findIndex(el => el.id === person.id);
            let parts = person.bday.split('-');
            console.log(parts[2] + '-' + parts[1] + '-' + parts[0]);
            if(person.id === "" || person.name === "" || person.bday === "")
                reject(new Error("All fields are required"));
            if(!this.checkData(parts[2] + '-' + parts[1] + '-' + parts[0]))
                reject(new Error("Incorrect date"));
            else {
                if (foundPersonIndex === -1) {
                    console.log(person.id + person.name + person.bday)
                    this.db_data.push(person);
                    resolve(person);
                } else {
                    reject("Found person with id " + person.id);
                }
            }
        })
    };

    async update(person) {
        return new Promise((resolve, reject) => {
            let foundPersonIndex = this.db_data.findIndex(el => el.id === person.id);
                if(!this.checkData(person.bday))
                    reject(new Error("Incorrect date"));
            if (foundPersonIndex !== -1) {
                if(person.id !== undefined && person.name !== "" && person.bday !== "") {
                    this.db_data[foundPersonIndex] = person;
                    resolve(person);
                }
                else
                    reject(new Error("All fields are required"));
            } else {
                reject("There's no person with id " + person.id);
            }
        });
    };
    async delete(id) {
        return new Promise((resolve, reject) => {
            let foundPersonIndex = this.db_data.findIndex(el => el.id === id);
            if (foundPersonIndex !== -1) {
                this.db_data.splice(foundPersonIndex, 1);
                resolve(id);
            } else {
                reject(new Error("There's no person with id " + id));
            }
        });
    }
}

module.exports.DB = DB;