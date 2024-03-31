const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')
const nodemailer = require('nodemailer');
const TOKEN = '7121504275:AAHPive5eXJbB8RssVnYWZeBgloZZ7nXGvs';
const PORT = 3000;
const app = express();
const bot = new TelegramBot(TOKEN, { polling: false });
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:false}));
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

app.post('/emailsSending', (req, res)=>{
    fs.readFile('users.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading gmails data');
        } else {
            const users = JSON.parse(data);
            const usersGmails = users.map(user => user.gmail);
            res.send(usersGmails);
            
            ///////
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: `${process.env.LOGIN}`,
                  pass: `${process.env.PASSWORD}`
                }
              });
              app.use(bodyParser.json());
              app.post('/send-mail', (req, res)=>{
                console.log(req.body);
                let mailOptions = {
                  from: 'Лист від Яни',
                  to: usersGmails,
                  subject: 'Hello!',
                  text: req.body.message,
                };
              
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
                res.sendStatus(200);
              })
              ///////
              
        }
    });
})


  

app.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);
});