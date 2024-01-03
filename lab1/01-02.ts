import * as http from "http";

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

    response.setHeader("Content-Type", "text/html");

    const method = request.method;
    const url = request.url;
    const httpVersion = request.httpVersion;
    const headers = request.headers;

    let bodyData = "";
    request.on("data", (chunk) => {
        bodyData += chunk;
    });

    request.on("end", () => {
        const responseBody = `
            <head>
                <meta charset="UTF-8">
                <title>Структура запроса</title>
            </head>
            <body>
                <h1>Структура запроса</h1>
                <p><strong>Метод:</strong> ${method}</p>
                <p><strong>URI:</strong> ${url}</p>
                <p><strong>Версия HTTP:</strong> ${httpVersion}</p>
                <h2>Заголовоки:</h2>
                <pre>${JSON.stringify(headers, null, 2)}</pre>
                <h2>Тело:</h2>
                <pre>${bodyData}</pre>
            </body>
        `;

        response.end(responseBody);
    });
});

const port = 3000;

server.listen(port);
