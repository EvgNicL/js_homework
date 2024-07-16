"use strict";

// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.


let counterHome = 0;
let counterAbout = 0;

const http = require('http');  //импорт модуля
const server = http.createServer((req, res) => {
    console.log('Запрос получен.');
    if (req.url === '/') {
        res.writeHead(200, {'Content-Tipe': 'text/html; charset=utf-8'});
        counterHome++;
        res.end(`<h1>Корневая страница</h1>
                 <p>Просмотров: ${counterHome}</p>
                 <a href="http://localhost:3000/about">about</a>`);
    } else if (req.url === '/about') {
        res.writeHead(200, {'Content-Tipe': 'text/html; charset=utf-8'});
        counterAbout++;
        res.end(`<h1>Cтраница about</h1>
                 <p>Просмотров: ${counterAbout}</p>
                 <a href="http://localhost:3000/">home</a>`);
    } else {
        res.writeHead(404, {'Content-Tipe': 'text/html; charset=UTF-8'});
        res.end(`<h1>Cтраница не найдена</h1>`);
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

// http://localhost:3000/