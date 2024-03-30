const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')

const TOKEN = '7121504275:AAHPive5eXJbB8RssVnYWZeBgloZZ7nXGvs';
const PORT = 3000;
const app = express();
const bot = new TelegramBot(TOKEN, { polling: false });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')))
app.post('/send', (req, res)=>{
    const { name, gmail } = req.body;
    console.log(name);
    console.log(gmail);
    fs.writeFile('users.txt', JSON.stringify(req.body), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`The user is saved`)
        }
    })
})




app.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);
});