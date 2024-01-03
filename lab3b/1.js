function firstJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello World");
        }, 2000);
    });
}

// Способ 1: С использованием обработчиков Promise
firstJob()
    .then((result) => {
        console.log("С использованием обработчиков Promise:", result);
    })
    .catch((error) => {
        console.error("Произошла ошибка:", error);
    });

// Способ 2: С использованием async/await и try/catch
async function executeFirstJob() {
    try {
        const result = await firstJob();
        console.log("С использованием async/await и try/catch:", result);
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}

executeFirstJob();
