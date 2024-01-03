
const write202 = (res, data) => {
    res.statusCode = 202;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data, null, 2));
}

const write404 = (res, error) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(error, null, 2));
}

module.exports = { write202, write404 };