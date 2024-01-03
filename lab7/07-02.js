let http = require('http');
let query = require('querystring');

let params = query.stringify({x:3, y:5});
let path = `/second?${params}`;


let options = {
    host: 'localhost',
    path: path,
    port: 5000,
    method: 'GET'
}

const req = http.request(options, (res)=>{
    console.log('response: ', res.statusCode);
    let data ='';
    res.on('data', (chunk)=>{
        console.log('data: body: ', data += chunk.toString('utf-8'));
    });
});

req.on('error', (e)=>{console.log('error: ', e.message);});
req.end();
