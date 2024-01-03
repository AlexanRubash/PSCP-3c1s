const http = require('http');
const fs = require('fs');

let bound = 'divider';
let body = `--${bound}\r\n`;
body += 'Content-Disposition: form-data; name="file"; filename="MyFile.png"\r\n';
body += 'Content-Type: image/png\r\n\r\n';

let options = {
    host: 'localhost',
    path: `/sixth`,
    port: 5000,
    method: 'POST',
    headers: {'Content-Type': `multipart/form-data; boundary=${bound}`}
};

const req = http.request(options, (res) => {});

req.write(body);

let stream = new fs.ReadStream("MyFile.jpeg");
stream.pipe(req, { end: false });

stream.on('end', () => {
    req.end(`\r\n--${bound}--\r\n`);
});
