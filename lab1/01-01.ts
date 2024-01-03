import * as http from 'http';
import {ServerResponse} from "http";

const server = http.createServer((request:http.IncomingMessage, res:ServerResponse)=> {
    res.end("<h1>Hello World</h1>");
});

const port=3000;
server.listen(port);