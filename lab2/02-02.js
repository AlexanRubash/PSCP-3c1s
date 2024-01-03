var http = require('http');
var fs = require('fs');
const getroute = 'png';

http.createServer(function (request, response) {
    if (request.url === '/' + getroute)
    {
        const fname = './pic.jpg';
        let jpg = null;

        fs.stat(fname, (err, stat) => {
                jpg = fs.readFileSync(fname);
                response.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length': stat.size});
                response.end(jpg, 'binary');
        })
    }
    else
        response.end('<html><body><h1>Error! Visit localhost:5000/' + getroute + '</h1></body></html>');
}).listen(5000, () => console.log('Server running at localhost:5000/' + getroute));