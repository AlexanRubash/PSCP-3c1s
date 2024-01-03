const url = require('url');
const fs = require('fs');
const DB = require('./db')
const { write202 } = require("./responce");
const { write404 } = require("./responce");

const endpoints =
    [
        '/api/faculties',
        '/api/pulpits',
        '/api/subjects',
        '/api/auditoriumstypes',
        '/api/auditoriums',
    ]

const endpoints2 =
    [
        /\/api\/faculty\/.*\/pulpits$/,
        /\/api\/auditoriumtypes\/.*\/auditoriums$/
    ]


module.exports = async (req, res, db) => {
    let endpoint = url.parse(req.url).pathname;

    if (endpoint === '/') {
        res.end(fs.readFileSync('./resource/views/index.html'));
        return;
    }
    if (endpoints.includes(endpoint)) {

        db.executeQueryByEndpoint(`GET: ${endpoint}`).then(data => {
            write202(res, data.recordset);
        }).catch(err => {
            write404(res, err);
        }).catch(err => console.log('Error: ', err));

        return;
    }

    for (const pattern of endpoints2) {
        if (pattern.test(endpoint)) {
            db.executeQueryByEndpoint(`GET: ${endpoint}`).then(data => {
                write202(res, data.recordset);
            }).catch(err => {
                write404(res, err);
            }).catch(err => console.log('Error: ', err));

            return;
        }
    }

    write404(res, 'Not found');

};

// http://localhost:3000/api/auditoriumtypes/ЛБ-К/auditoriums
// http://localhost:3000/api/faculty/ТОВ/pulpits