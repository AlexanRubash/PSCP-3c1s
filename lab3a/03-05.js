const http=require('http');
const url = require('url');
const fs= require('fs');
const route = 'fact';

let factorial=(x)=>
{
    if(x<0)
        return "Invalid value!";

    else if (x===1)

        return 1;
    else if (x===0)
        return 0
    else
        return  x*factorial(x-1);
}

function Fact(k, func)
{
    this.k = k;
    this.factorial = factorial;
    this.func = func;
    this.calculateFact = () => {setImmediate(() => {this.func(null, this.factorial(this.k))})};
}

http.createServer((req, res)=>{
    let rc = JSON.stringify({k: 0});
    if (url.parse(req.url).pathname === '/' + route && typeof url.parse(req.url, true).query.k != 'undefined')
    {
        let k = parseInt(url.parse(req.url, true).query.k);
        if (Number.isInteger(k))
        {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            let facts = new Fact(k, (err, result) =>
            {
                err != null ? console.log('Error: ' + err) : res.end(JSON.stringify({ k: k, fact: result }));
            });
            facts.calculateFact();
        }
    }
    else if(url.parse(req.url).pathname==='/'){
        rc=fs.readFileSync('03-03.html');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(rc);
    }
    else
        res.end(rc);
}).listen(5000, () => console.log('Server running at localhost:5000/' + route));