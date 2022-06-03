const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')
require("dotenv").config();
// const { TwitterScraper } = require("@tcortega/twitter-scraper");
const nodemailer = require('nodemailer');
const axios = require('axios');
const cheerio = require('cheerio');
// const {Auth} =require ('./config.js')
const app = express();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = process.env.PORT || 5003;
app.use(cors());
app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
var auth = {
    user: process.env.AUTH_USER_NAME,
    pass: process.env.AUTH_USER_PASS,
}
var transporter = nodemailer.createTransport({
    host: 'mail.divsync.net',
    port: 465,
    secure: true,
    auth:auth,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
  });

const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

route.post('/text-mail', (req, res) => {
    const {to, text,name } = req.body;
    const mailData = {
        from: process.env.AUTH_USER_NAME,
        to: process.env.to_maillist,
        subject: "ZKR lead",
        text: `Hey you got a new lead from ${name}! ${text}`,
        html: `<h3>Dear Sir/Madam,</h3></b><br/></b><br/>&nbsp; ${text}</b><br/> </b><br/><h4>Regards,<h4></b><br/>${name}</b><br/>${to}`,
    };
  const mailData2 = {
        from: process.env.AUTH_USER_NAME,
        to: to,
        subject: "ZKR-ContactUs Confirmation",
        text: `Dear ${name}, We have recieved your lead our team will contact you soon.`,
        html: `<h3>Dear ${name},</h3></b><br/></b><br/>&nbsp; We have recieved your lead our team will contact you soon.</b><br/> </b><br/><h4>Regards,<h4></b><br/>ZKR Rollups</b><br/>`,
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        
        
              transporter.sendMail(mailData2, (error, info) => {
                
                  
                });
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});


route.post('/scraptwitter', async (req, res) => {
    const {link } = req.body;
    console.log("data -====>> ")
    const data = await scraperController(browserInstance,link);
    console.log("data -====>> ",data)
    res.status(200).send({ message: "Mail send", message_id: "dsv",data:data});

});

