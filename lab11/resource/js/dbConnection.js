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


module.exports = getDbPool;
