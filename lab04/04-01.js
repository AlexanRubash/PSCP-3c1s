const http = require('http');
const fs = require('fs');
const url = require('url');
const database = require('./DB')

let db = new database.DB();

db.on('GET', (req, res) => {
    db.select().then((results) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(results));
    });
});

db.on('POST', (req, res) => {
    req.on('data', (data) => {
        let r = JSON.parse(data);
        db.insert(r).then(data => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        }).catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: err.message}));
        });
    });
});

db.on('PUT', (req, res) => {
    req.on('data', (data) => {
        let r = JSON.parse(data);
        db.update(r).then(data => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        }).catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: err.message}));
        });

    });
});

db.on('DELETE', (req, res) => {
    req.on('data', (data) => {
        let r = JSON.parse(data);
        db.delete(r.id).then((data) => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        }).catch((err) => {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({ error: err.message }));
        });
    });
});


http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/') {
        let html = fs.readFileSync("./04-01.html", 'utf8');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.end(html);
    } else if (url.parse(req.url).pathname === "/api/db") {
        db.emit(req.method, req, res);
    }
}).listen(5000, () => console.log('Server is running at http://localhost:5000'));