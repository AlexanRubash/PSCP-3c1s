const http=require('http');
const fs=require('fs');
const getroute='html';

http.createServer(function (req, res) {
    if (req.url === '/' + getroute)
    {
        let html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html)
    }
    else
        res.end('<html><body><h1>Error! Visit localhost:5000/' + getroute + '</h1></body></html>');
}).listen(5000, () => console.log('Server running at localhost:5000/' + getroute));