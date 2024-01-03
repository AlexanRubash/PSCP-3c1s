const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'Inul1234',
    pool: {
        max: 10,
        min: 4,
    },
    database: 'RAA',
    server: 'HOME-PC',
    options: { trustedConnection: true, trustServerCertificate: true }
};

const getDbPool = async () => {
    const pool = new sql.ConnectionPool(config);
    return pool.connect();
};

async function performTransaction() {
    const pool = await getDbPool();

    // Создаем новую транзакцию
    const transaction = new sql.Transaction(pool);

    //console.log('Активные соединения:', pool.activeConnections.length);


    // Подключаемся к базе данных и начинаем транзакцию
    await transaction.begin();

    // Ваш SQL-код для удаления данных из таблицы PULPIT
    await transaction.request().query("DELETE FROM PULPIT WHERE PULPIT = '2289'");

    if (false) {
        await transaction.rollback();

        await sql.close();

        console.log('Транзакция успешно откачена');

        return;
    }


    // Фиксируем транзакцию (если дошли до этой точки, значит, ошибок не произошло)
    await transaction.commit();

    console.log('Транзакция успешно выполнена');

    await sql.close();
}

// Выполняем транзакцию
performTransaction();