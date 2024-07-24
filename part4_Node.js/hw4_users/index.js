
const express = require('express');
const fs = require('fs');

const path = require('path');
const filePath = path.join(__dirname, '/users.json');
const { checkBody,  } = require('./validation/validator');
const { userSchema } = require('./validation/schema');

const app = express();
app.use(express.json());



/**Получить данные из файла json */
function getUsersData () {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/**Получить id последней записи */
function getUniqueId () {
    return getUsersData().pop().id;
}



/**Получить всех пользователей */
app.get('/users', (req, res) => {
    res.send({users: getUsersData()});
})

/**Получить конкретного пользователя */
app.get('/users/:id', (req, res) => {
    const usersJson = fs.readFileSync(filePath, 'utf-8');
    const usersData = JSON.parse(usersJson);
    const user = usersData.find((user) => user.id === Number(req.params.id));
    if (user) {
        res.send({user});
    } else {
        res.status(404).send({user: null, message: 'User not found'});
    }
})

/**Создать пользователя */
app.post('/users', checkBody(userSchema), (req, res) => {
    if (validateData.error) {
        return res.status(400).send({error: validateData.error.details});
    };

    const usersJson = fs.readFileSync(filePath, 'utf-8');
    const usersData = JSON.parse(usersJson);
    uniqueId = getUniqueId() + 1;
    usersData.push({
        id: uniqueId,
        ...req.body     
    });
    fs.writeFileSync(filePath, JSON.stringify(usersData));
    res.send({
        id: uniqueId
    });
})

/**Обновить данные пользователя */
app.put('/users/:id', checkBody(userSchema), (req, res) => {
    if (validateData.error) {
        return res.status(400).send({error: validateData.error.details});
    };

    const usersJson = fs.readFileSync(filePath, 'utf-8');
    const usersData = JSON.parse(usersJson);
    const user = usersData.find((user) => user.id === Number(req.params.id));
    if (user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city;

        fs.writeFileSync(filePath, JSON.stringify(usersData));
        res.send({user});
    } else {
        res.status(404).send({user: null, message: 'User not found'});
    }
})

/**Удаление пользователя */
app.delete('/users/:id', (req, res) => {
    const usersJson = fs.readFileSync(filePath, 'utf-8');
    const usersData = JSON.parse(usersJson);
    const userIndex = usersData.findIndex((user) => user.id === Number(req.params.id));
    if (userIndex > -1) {
        usersData.splice(userIndex, 1);

        fs.writeFileSync(filePath, JSON.stringify(usersData));
        res.send({message: 'User deleted.'});
    } else {
        res.status(404).send({user: null, message: 'User not found'});
    }
})




app.use((req, res) => {
    res.status(404).send({message: 'URL not found.'})
})

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000.');
})