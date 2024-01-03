const http=require('http');
const getroute='api/name';

http.createServer(function (req, res) {
    if(req.url==='/'+getroute){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Рубашек Алексндр Александрович');
    }
    else
    res.end('<html><body><h1>Error! Visit localhost:5000/' + getroute + '</h1></body></html>');
}).listen(5000, () => console.log('Server running at localhost:5000/' + getroute));
