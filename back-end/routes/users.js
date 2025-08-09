const express = require("express")
const users = express.Router();
const DB = require('../database/databaseConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

users.post('/login', urlencodedParser, async (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        try {
            let queryResult = await DB.authUser(email);
            if (queryResult.length > 0) {
                if (password === queryResult[0].password) {
                    console.log(queryResult)
                    console.log("LOGIN OK");
                    res.status(200)
                    req.session.logged_in = true;
                    req.session.user_id = queryResult[0].id;
                    req.session.role = queryResult[0].role
                    console.log(req.session)
                    res.json({
                        role: req.session.role,
                        user_id: req.session.user_id
                    })
                }
                else {
                    console.log("INCORRECT PASSWORD");
                    res.status(204)
                }
            } else {
                console.log("USER NOT REGISTRED");
                res.status(204)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Please enter Username and Password!")
        res.status(204)
    }
    res.end();
});

users.get('/session', async (req, res, next) => {
    try {
        console.log("session data: ")
        console.log(req.session)
        res.json(req.session);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
        next()
    }
})

users.get('/logout', async (req, res, next) => {
    try {
        req.session.logged_in = false;
        req.session.user_id = 0;
        req.session.role = 'Guest'
        console.log(req.session)
        res.json(req.session)

    }
    catch (err) {
        console.log(err)
        res.json({ status: { success: false, msg: err } })
        res.sendStatus(500)
        next()
    }
})

users.post('/register', urlencodedParser, async (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var city = req.body.city;

    var isAcompleteUser = email && password && first_name && last_name && city
    if (isAcompleteUser) {
        try {
            var queryResult = await DB.createUser(email, password, first_name, last_name, city)
            if (queryResult.affectedRows) {
                console.log("New user registered!!")
                res.json({
                    "success": true,
                    "message": "New user registered."
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("A field is empty!!")
    }
    res.end()


});

users.post('/update', urlencodedParser, async (req, res) => {

    var id = req.body.id;
    var field = req.body.field;
    var info = req.body.info;
    var isComplete = id && field && info
    if (isComplete) {
        if (field == 'password' || field == 'city' || field == 'first_name' || field == 'last_name') {
            try {
                var queryResult = await DB.updateUserInfo(id, field, info)
                if (queryResult.affectedRows) {
                    console.log("User info updated")
                    res.json({
                        "success": true,
                        "message": "User info updated."
                    })
                }
            }
            catch (err) {
                console.log(err)
                res.status(500)
            }
        }
        else if (field == 'id' || field == 'email' || field == 'role') {
            console.log("You can't update these fields.")
        }
        else {
            console.log("Invalid field")
        }
    }
    else {
        console.log("A field is empty!!")
    }
    res.end()
});

users.post('/getrole', urlencodedParser, async (req, res) => {

    var id = req.body.id;

    if (id) {

        try {
            var queryResult = await DB.getRole(id)

            console.log(queryResult[0])
            res.json(queryResult[0])

        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("A field is empty!!")
    }
    res.end()
});

users.post('/delete', urlencodedParser, async (req, res) => {

    var id = req.body.id;

    if (id) {

        try {
            var queryResult = await DB.deleteUser(id)
            console.log(queryResult[0])
            res.json('Deleted')

        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("A field is empty!!")
    }
    res.end()
});

users.post('/getfac', urlencodedParser, async (req, res) => {

    var id = req.body.id;

    if (id) {

        try {
            var queryResult = await DB.getFaculty(id)

            console.log(queryResult[0])
            res.json(queryResult[0])

        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("A field is empty!!")
    }
    res.end()
});
users.post('/setrole', urlencodedParser, async (req, res) => {

    var id = req.body.id;
    var role = req.body.role;

    var isCompleteRequest = id && role
    if (isCompleteRequest) {
        if (role == 'Citizen' || role == 'Student' || role == 'Admin') {
            try {
                var queryResult = await DB.setRole(id, role)
                res.json(id, role, queryResult)
            }
            catch (err) {
                console.log(err)
                res.status(500)
            }
        } else {
            console.log(`Not a valid role`)
        }
    }
    else {
        console.log("Field is empty!!")
    }
    res.end()
});

users.post('/getinfo', urlencodedParser, async (req, res) => {

    var id = req.body.id;

    if (id) {

        try {
            var queryResult = await DB.getInfo(id)

            console.log(queryResult[0])
            res.json(queryResult[0])

        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("A field is empty!!")
    }
    res.end()
})

users.get('/listcitizen', urlencodedParser, async (req, res) => {
    try {
        let queryResult = await DB.listCitizen();
        if (queryResult.length > 0) {
            console.log(queryResult)
            console.log("OK");
            res.json(queryResult);
            res.status(200)
        } else {
            console.log("no citizens?");
            res.status(204)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500)
    }
    res.end();
});
users.get('/listnotadmin', urlencodedParser, async (req, res) => {
    try {
        let queryResult = await DB.listNotAdmin();
        console.log(queryResult)
        res.json(queryResult);
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.status(500)
    }
    res.end();
});

module.exports = users