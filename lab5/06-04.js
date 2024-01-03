const http = require('http');
const send = require('m06-03raa11');

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    send("mrfiref@mail.ru","тут ваш пароль для приложений",'я просто хочу жить)');
    response.end('<h2>Message sucessfully sent.</h2>');
}).listen(5000, () => console.log('Server running at localhost:5000/\n'));
