function secondJob(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject("Какая-то ошибка");
        },3000);
    });
}

secondJob()
    .then((result) => {
        console.log("С использованием обработчиков Promise:", result);
    })
    .catch((error) => {
        console.error(error);
    });

async function executeSecondJob() {
    try {
        await secondJob();
        console.log("С использованием async/await и try/catch: Эта строка не выполнится");
    } catch (error) {
        console.error(error);
    }
}
executeSecondJob();