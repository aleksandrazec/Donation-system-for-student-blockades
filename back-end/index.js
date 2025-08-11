const express = require('express')
require('dotenv').config()
const DB = require('./database/databaseConn.js')
const session = require('express-session')
const users= require("./routes/users.js")
const faculties = require("./routes/faculties.js")
const donationrequests = require("./routes/donationrequests.js")
const forums = require("./routes/forums.js")
const search = require("./routes/search.js")
const app = express()
const cors = require('cors')
const path = require('path');
const connection = require("./database/connection.js");

const port = 3333

app.use(express.static(path.join(__dirname, "build")))


app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.set('trust proxy', 1) 
app.use(session({
   secret: 'some secret',
   resave: true,
   saveUninitialized: true,
   cookie: { secure: false }
  }))

app.use(cors({
    origin: `http://88.200.63.148:3333`,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
 }))
 


app.use('/users', users);
app.use('/faculties', faculties)
app.use('/donationrequests', donationrequests)
app.use('/forums', forums)
app.use('/search', search)


app.get("/ping", async (req, res) => {
    function checkDatabaseConnection() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT 1", (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    }

    try {
        await checkDatabaseConnection();
        res.status(200).send("OK");
    } catch (err) {
        console.error("DB health check failed:", err.message);
        res.status(500).send("Unhealthy");
    }
})

app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})

app.get(/(.*)/, (req, res)=>{
    res.sendFile(path.join(__dirname, "build", "index.html"))
})