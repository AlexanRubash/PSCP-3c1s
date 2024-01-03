function thirdJob(data){
    return new Promise((resolve, reject)=>{
        if(typeof data !== 'number'){
            reject("error");
        }
        else if(data % 2 === 1){
            setTimeout(()=>{
                resolve("odd");
            },1000);
        }
        else {
            setTimeout(()=>{
                reject("even");
            },2000);
        }
    });
}

thirdJob(5)
    .then((result)=>{
        console.log("С использованием обработчиков Promise:", result);
    })
    .catch((error)=>{
        console.error(error);
    });

async function executeThirdJob(number){
    try {
        const result = await thirdJob(number);
        console.log("С использованием async/await и try/catch:", result);
    } catch (error){
        console.log(error);
    }
}

executeThirdJob(4);
executeThirdJob(5);
executeThirdJob('asd');
