const express = require("express")
const forums = express.Router();
const DB = require('../database/databaseConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

forums.post('/create', urlencodedParser, async (req, res) => {
    var prompt = req.body.prompt;
    var faculty_id = req.body.faculty_id;
    if (prompt && faculty_id) {
        try {
            let queryResult = await DB.createForum(prompt, faculty_id);
            if (queryResult.affectedRows) {
                console.log("Forum created")
                res.json({
                    "success": true,
                    "message": "Forum created"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/delete', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.deleteForum(id);
            if (queryResult.affectedRows) {
                console.log("Forum deleted")
                res.json({
                    "success": true,
                    "message": "Forum deleted"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/comment', urlencodedParser, async (req, res) => {
    var text = req.body.text;
    var user_id = req.body.user_id;
    var forum_id = req.body.forum_id;

    var isCompleteRequest = text && user_id && forum_id
    if (isCompleteRequest) {
        try {
            let queryResult = await DB.createComment(text, user_id, forum_id);
            if (queryResult.affectedRows) {
                console.log("Comment posted")
                res.json({
                    "success": true,
                    "message": "Comment posted"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/reply', urlencodedParser, async (req, res) => {
    var text = req.body.text;
    var user_id = req.body.user_id;
    var forum_id = req.body.forum_id;
    var reply_id = req.body.reply_id;

    var isCompleteRequest = text && user_id && forum_id && reply_id
    if (isCompleteRequest) {
        try {
            let queryResult = await DB.createReply(text, user_id, forum_id, reply_id);
                console.log("Comment posted")
                res.json(queryResult)
            
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/deletecomment', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.deleteComment(id);
            if (queryResult.affectedRows) {
                console.log("Comment deleted")
                res.json({
                    "success": true,
                    "message": "Comment deleted"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/find', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.findForum(id);
                console.log("Forum found")
                res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/getcomments', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.getComments(id);
                console.log(queryResult)
                res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/listallfac', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.listForumsByFac(id);
                console.log(queryResult)
                res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/getreplies', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.getReplies(id);
                console.log(queryResult)
                res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});


forums.post('/listall', urlencodedParser, async (req, res) => {
    var order = req.body.order
    if (!order || order == 'ASC') {
        try {
            let queryResult = await DB.listForumsASC();
            console.log("Forums listed")
            res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    } else if (order == 'DSC') {
        try {
            let queryResult = await DB.listForumsDSC();
            console.log("Forums listed")
            res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    } else {
        console.error('invalid order')
    }

})

module.exports = forums