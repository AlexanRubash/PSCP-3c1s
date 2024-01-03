const http=require('http');
const fs=require('fs');
const getroute='fetch';

http.createServer((req,res)=> {
    const httpFileName='./fetch.html';

    if(req.url==='/api/name'){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Рубашек Александр Алекссандрович')
    }
    else if(req.url==='/'+getroute){
        fs.readFile(httpFileName,(err, data)=>{
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            err != null ? console.log("error:" + err) : res.end(data);
        })
}
    else
    res.end('<html><body><h1>Error! Visit localhost:5000/fetch</h1></body></html>')
}).listen(5000, () => console.log('Server running at localhost:5000/fetch'));
