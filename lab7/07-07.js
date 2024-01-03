const http = require('http');
const fs = require('fs');

let options =
    {
        host: 'localhost',
        path: '/seven',
        port: 5000,
        method:'GET'
    }
const req = http.request(options,(res)=>
{
    res.pipe(fs.createWriteStream('file1.mp3'));
});

req.end();