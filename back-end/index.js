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

const port = 3333
    
app.get("/",(req,res)=>{
res.send("hola")
})

app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
   secret: 'some secret',
   resave: true,
   saveUninitialized: true,
   cookie: { secure: false }
  }))

app.use(cors({
    origin: `http://88.200.63.148:3334`,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
 }))
 
app.use('/users', users);
app.use('/faculties', faculties)
app.use('/donationrequests', donationrequests)
app.use('/forums', forums)
app.use('/search', search)

app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})
