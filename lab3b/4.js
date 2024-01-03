const { v4: uuidv4 } = require('uuid');

//13
function validateCard(cardNumber) {
    console.log("Cardnumber:", cardNumber);


    const isValid = Math.random() < 0.5;
    return isValid;
}


// 14
function proceedToPayment(orderId) {

    return new Promise((resolve, reject) => {
        // Рандомно разрешаем или отклоняем Promise для имитации успешной или неуспешной оплаты.
        const isSuccess = Math.random() < 0.5;

        setTimeout(() => {
            if (isSuccess) {
                resolve("Payment successful");
            } else {
                reject("Payment failed");
            }
        }, 1000);
    });
}

//12
function createOrder(cardNumber) {
    return new Promise(async (resolve, reject) => {
        const isValidCard = await validateCard(cardNumber);

        if (!isValidCard) {
            reject("Card is not valid");
            return;
        }

        const orderId = uuidv4();
        setTimeout(() => {
            resolve(orderId);
        }, 5000);
    });
}

// Вызов функции createOrder и обработка результата.
createOrder("1234 5678 9123 2456")
    .then((orderId) => {
        console.log("Order ID:", orderId);
        return proceedToPayment(orderId);
    })
    .then((paymentResult) => {
        console.log(paymentResult);
    })
    .catch((error) => {
        console.error(error);
    });


async function executeOrder() {
    try {
        const orderId = await createOrder("1234 5678 9123 456");
        console.log("Order ID:", orderId);

        const paymentResult = await proceedToPayment(orderId);
        console.log(paymentResult);
    } catch (error) {
        console.error(error);
    }
}

//executeOrder();


