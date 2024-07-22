// ## Урок 3. Модули и фреймворк Express (WIP)

// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.



// Подсказка:
// Вы можете сохранять файл в формате JSON,
// где в объекте ключом будет являться URL страницы, а значением количество просмотров страницы

// Формат сдачи работы:
// — Ссылка на гитхаб/гитлаб
// — Файл с кодом.

const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const filePath = path.join(__dirname, 'counter.json');

const counterData = {
    "about": 0,
    "home": 0
};

if (fs.existsSync(filePath)) {
    const dataJson = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(dataJson);
    counterData.about = data.about;
    counterData.home = data.home;
};
 

app.get('/', (req,res) => {
    let counterHome = counterData.home;
    res.send(`<h1>Главная страница</h1>
        <a href="./">Ссылка на главную страницу /</a>
        <a href="./about">about</a>
        <p>Просмотров: ${++counterHome}</p>`)
    counterData.home = counterHome;  
    fs.writeFileSync(filePath, JSON.stringify(counterData));
});

app.get('/about', (req,res) => {
    let counterAbout = counterData.about;
    res.send(`<h1>Страница about</h1>
        <a href="./">Ссылка на главную страницу </a>
        <p>Просмотров: ${++counterAbout}</p>`)
    counterData.about = counterAbout; 
    fs.writeFileSync(filePath, JSON.stringify(counterData));    
});

app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
// http://localhost:3000/