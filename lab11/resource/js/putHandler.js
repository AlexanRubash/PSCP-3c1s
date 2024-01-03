const url = require('url');
const DB = require('./db')
const { write404, write202 } = require("./responce");
const endpoints =
    [
        '/api/faculties',
        '/api/pulpits',
        '/api/subjects',
        '/api/auditoriumstypes',
        '/api/auditoriums'
    ]


module.exports = (req, res, db) => {

    let endpoint = url.parse(req.url).pathname;
    let data_json = '';

    if (endpoints.includes(endpoint)) {

        req.on('data', chunk => {
            data_json += chunk;
        });
        req.on('end', () => {
            data_json = JSON.parse(data_json);
            db.executeQueryByEndpoint(`PUT: ${endpoint}`, data_json).then(data => {

                if (data.message === 'There are no record with this pk!') {
                    throw { message: 'There are no record with this pk!' };
                }

                const resp = [data_json];
                write202(res, resp);
            }).catch(err => {
                write404(res, err);
            }).catch(err => console.log('Error: ', err));
        });
        return;
    }
    write404(res, 'Not found');
}

