let http = require('http');
let fs = require('fs');
let qs = require('querystring');
let url = require('url');
let parseString = require("xml2js").parseString;
let xmlbuilder = require("xmlbuilder");
const mp = require("multiparty");
const Console = require("console");

let xmlbuild = (obj) => {
    let rc = "<result>parse error</result>";
    try {
        let sum = 0;
        let concat = "";
        let xmldoc = xmlbuilder.create("response").att("request", obj.request.$.id);

        obj.request.x.map((e, i) => {
            sum += parseInt(e.$.value);
        });

        obj.request.m.map((e, i) => {
            concat += String(e.$.value);
        });
        xmldoc.ele("sum", {element: "x", result: sum});
        xmldoc.ele("concat", {element: "m", result: concat});

        rc = xmldoc.toString({pretty: true});
    } catch (e) {
        console.log(e);
    }
    return rc;
};

let server = http.createServer((req, res) => {
    console.log(url.parse(req.url).pathname);
    switch (req.method){
        case 'GET':{
            switch (url.parse(req.url).pathname){
                case '/favicon.ico':
                    res.end();
                    break;
                case '/':
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    res.write(fs.readFileSync('./index.html'));
                    res.end();
                    break;
                case '/connection':
                    res.write(`KeepAliveTimeout: ${server.keepAliveTimeout}`);
                    let set = Number(url.parse(req.url, true).query.set);
                    if (Number.isInteger(set)) {
                        server.keepAliveTimeout = set;
                        res.write(`\nKeepAliveTimeout after changing: ${server.keepAliveTimeout}`);
                    }
                    res.end();
                    break;
                case '/headers':
                    //res.setHeader('MyHeader', '1');
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.write(`<h3>req headers:</h3>`);
                    res.write(`<pre>${JSON.stringify(req.headers, null, 2)}</pre>`);
                    res.write(`<h3>res headers:</h3>`);
                    res.write(`<pre>${JSON.stringify(res.getHeaders(), null, 2)}</pre>`);
                    res.end();
                    break;
                case '/socket':
                    const {headers} = req;
                    const ip = req.connection.remoteAddress;
                    const port = req.connection.remotePort;

                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(`
                Client IP: ${ip}, 
                Client Port: ${port},
                Server IP: ${headers.host.split(':')[0]},
                Server Port: ${headers.host.split(':')[1]}`);
                    break;
                case '/resp-status':
                    let statusCode = parseInt(url.parse(req.url, true).query.code);
                    let mess = url.parse(req.url, true).query.mess;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.statusCode = statusCode;
                    res.statusMessage = mess;
                    res.write(`status code: ${res.statusCode}, status message: ${res.statusMessage}`);
                    res.end();
                    break;
                case '/formparameter':
                    res.write(fs.readFileSync('./formparameter.html'));
                    res.end();
                    break;
                case '/upload':
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    res.end(fs.readFileSync("uploadForm.html"));
                    break;    
                default:
                    let urlTest = url.parse(req.url).pathname.split('/')[1];
                    console.log(urlTest);
                    switch (urlTest){
                        case 'parameter':
                            let x = parseInt(url.parse(req.url, true).query.x);
                            let y = parseInt(url.parse(req.url, true).query.y);
                            let xRoute = parseInt(url.parse(req.url).pathname.split('/')[2]);
                            let yRoute = parseInt(url.parse(req.url).pathname.split('/')[3]);
                            Console.log(`${xRoute} : ${yRoute}`);
                            if (Number.isInteger(x) && Number.isInteger(y)) {
                                res.end('x+y=' + (x + y) +
                                    '\nx-y=' + (x - y) +
                                    '\nx*y=' + (x * y) +
                                    '\nx/y=' + (x / y));
                            } else if (Number.isInteger(xRoute) && Number.isInteger(yRoute)) {
                                res.end('x+y=' + (xRoute + yRoute) +
                                    '\nx-y=' + (xRoute - yRoute) +
                                    '\nx*y=' + (xRoute * yRoute) +
                                    '\nx/y=' + (xRoute / yRoute));
                            }
                            else{
                                if((Number.isInteger(x)||Number.isInteger(y))&&(isNaN(xRoute) && isNaN(yRoute))){
                                    res.write(`Error!`);
                                    res.end();
                                }
                                else{res.write(`URI: ${req.url}`);
                                    res.end();}

                            }
                            break;
                        case 'files':
                            let result = url.parse(req.url, true).pathname.split("/");
                            if (result[2]) {
                                const decodedFileName = decodeURIComponent(result[2]); // Декодируем имя файла
                                fs.access(`./static/${decodedFileName}`, fs.constants.R_OK, err => {
                                    if (err) {
                                        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
                                        res.end(`файл ${decodedFileName} не найден`);
                                    } else {
                                        res.writeHead(200, { "Content-Type": "application/txt; charset=utf-8" });
                                        fs.createReadStream(`./static/${decodedFileName}`).pipe(res);
                                    }
                                });
                            } else {
                                fs.readdir("./static", (err, files) => {
                                    res.setHeader("X-static-files-count", files.length);
                                    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                                    res.write(`${JSON.stringify(res.getHeaders(), null, 1)}`);
                                    //res.end(`${files.length}`);
                                });
                            }
                            break;
                    }
            }
            break;
        }
        case 'POST':
            switch (url.parse(req.url).pathname) {
                case '/formparameter':{
                    let obj = "";
                    req.on("data", data => {
                        obj += data;
                    });
                    req.on("end", () => {
                        let result = qs.parse(obj);
                        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                        res.write(`text: ${result.text}\n`);
                        res.write(`number: ${result.number}\n`);
                        res.write(`date: ${result.date}\n`);
                        res.write(`checkbox: ${result.checkbox}\n`);
                        res.write(`radio: ${result.radio}\n`);
                        res.write(`textarea: ${result.textarea}\n`);
                        res.write(`send: ${result.send}\n`);
                        res.end();
                    });
                    break;
                }
                case '/json':
                    let jsonData = "";
                    req.on("data", data => {
                        jsonData += data;
                    });
                    req.on("end", () => {
                        let result = JSON.parse(jsonData);
                        let comment = "Ответ";
                        let sum = result.x + result.y;
                        let concat = `${result.s}: ${result.o.surname}, ${result.o.name}`;
                        let length = result.m.length;
                        res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
                        res.end(JSON.stringify(
                            {
                                "__comment": comment,
                                "x_plus_y": sum,
                                "Concatination_s_o": concat,
                                "Length_m": length
                            }
                        ));
                    });
                    break;
                case '/xml':
                    let xmltxt = "";
                    req.on("data", data => {
                        xmltxt += data;
                    });
                    req.on("end", () => {
                        parseString(xmltxt, (err, result) => {
                            if (err) res.end("bad xml");
                            else {
                                res.writeHead(200, {"Content-Type": "text/xml; charset=utf-8"});
                                res.end(xmlbuild(result));
                            }
                        });
                    });
                    break;
                case '/upload':
                    let form = new mp.Form({uploadDir: "./static"});
                    let uploadedFileName = "";

                    form.on("field", (name, value) => {
                    });

                    form.on("file", (name, file) => {
                        uploadedFileName = file.originalFilename;  // Сохранение изначального имени файла
                        const targetPath = "./static/" + uploadedFileName;
                        fs.rename(file.path, targetPath, (err) => {
                            if (err) {
                                console.error("Ошибка при сохранении файла:", err);
                            }
                        });
                    });

                    form.on("error", (err) => {
                        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                        res.end(`${err}`);
                    });

                    form.on("close", () => {
                        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                        res.end(`Файл "${uploadedFileName}" получен`);
                    });

                    form.parse(req);
                    break;
            }
            break;
        
    }
});

server.listen(5000,'127.0.0.1', ()=>{
    console.log('Server started at http://localhost:5000')
})
server.on('connection', () =>{
    Console.log(`New connection. KeepAliveTimeout: ${server.keepAliveTimeout}`)
});