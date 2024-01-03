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

    let endpoint = decodeURI(url.parse(req.url).pathname);

    let endpointParams = endpoint.split('/');

    if (endpointParams.length !== 4)
        return write404(res, "Wrong endpoint");

    const code = endpointParams[3];

    const endpointWithoutCode = `/${endpointParams[1]}/${endpointParams[2]}`;


    if (endpoints.includes(endpointWithoutCode)) {

        db.executeQueryByEndpoint(`DELETE: ${endpointWithoutCode}`, code).then((data) => {

            if (data.message === 'There are no record with this pk!') {
                throw { message: 'There are no record with this pk!' };
            }

            write202(res, data.recordset);
        }).catch(err => {
            write404(res, err);
        }).catch(err => console.log('Error: ', err));

        return;
    }
    write404(res, 'Not found');


}

