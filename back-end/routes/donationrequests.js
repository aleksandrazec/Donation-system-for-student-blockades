const express= require("express")
const donationrequests = express.Router();
const DB=require('../database/databaseConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

donationrequests.get('/typelist', urlencodedParser, async (req, res) => {
       try
       {
        let queryResult1=await DB.listDonationTypeENUM();
        console.log(queryResult1)
        var data = queryResult1[0].COLUMN_TYPE;
        console.log(data)
        data=data.slice(6, data.length-2);
        console.log(data)
        var typesArray = data.split(`','`)
        console.log(typesArray)
        res.json(typesArray)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});

donationrequests.post('/type', urlencodedParser, async (req, res) => {
 var type = req.body.type;
   if (type)
   {
       try
       {
        let queryResult1=await DB.listDonationTypeENUM();
        console.log(queryResult1)
        var data = queryResult1[0].COLUMN_TYPE;
        console.log(data)
        data=data.slice(5, data.length-1);
        console.log(data)
        var newsql=`ALTER TABLE Type_of_donation MODIFY type ENUM(`+data+`,'`+type+`')`
        
        let queryResult=await DB.runSQL(newsql)
               if (queryResult.affectedRows) {
               console.log("New donation type added!!")
               res.json({
                "success": true,
                "message": "New donation type added!!"
               })
             }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Please enter donation type!!!")
       res.status(204)
   }
   res.end();
});

donationrequests.get('/subtypelist', urlencodedParser, async (req, res) => {
       try
       {
        let queryResult1=await DB.listDonationSubtypes();
        console.log(queryResult1)
        res.json(queryResult1)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});

donationrequests.post('/gettype', urlencodedParser, async (req, res) => {
 var subtype = req.body.subtype;
   if (subtype)
   {
       try
       {
        let queryResult=await DB.getDonationType(subtype);
            res.json(queryResult);
            console.log(queryResult)

       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Field/s missing")
       res.status(204)
   }
   res.end();
});

donationrequests.post('/listforfac', urlencodedParser, async (req, res) => {
 var id = req.body.id;
   if (id)
   {
       try
       {
        let queryResult=await DB.listDonationRequestFac(id);
            res.json(queryResult);
            console.log(queryResult)

       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Field/s missing")
       res.status(204)
   }
   res.end();
});

donationrequests.post('/getreq', urlencodedParser, async (req, res) => {
 var id = req.body.id;
   if (id)
   {
       try
       {
        let queryResult=await DB.getDonationRequest(id);
            res.json(queryResult[0]);
            console.log(queryResult[0])

       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Field/s missing")
       res.status(204)
   }
   res.end();
});

donationrequests.post('/subtype', urlencodedParser, async (req, res) => {
 var type = req.body.type;
 var subtype = req.body.subtype;
   if (type&&subtype)
   {
       try
       {
        let queryResult=await DB.createDonationSubtype(subtype, type);
               if (queryResult.affectedRows) {
               console.log("New donation subtype added!!")
               res.json({
                "success": true,
                "message": "New donation subtype added!!"
               })
             }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Field/s missing")
       res.status(204)
   }
   res.end();
});

donationrequests.post('/create', urlencodedParser, async (req, res) => {
    var quantity = req.body.quantity;
    var urgency_level = req.body.urgency_level;
    var item = req.body.item;
    var type = req.body.type;
    var faculty_id = req.body.faculty_id;

    var isCompleteRequest = quantity && urgency_level && item && faculty_id && type
    if (isCompleteRequest) {
        let subtypes = await DB.listDonationSubtypes();
        var isASubtype = false;
        subtypes.map(subtype => { if (subtype.subtype == item) { isASubtype = true } })
        if (!isASubtype) {
            let types = await DB.listDonationTypeENUM();
            console.log(types)
            var data = types[0].COLUMN_TYPE;
            console.log(data)
            data = data.slice(6, data.length - 2);
            console.log(data)
            var typesArray = data.split(`','`)
            var isAType = typesArray.includes(type);
            if (!isAType) {
                data = types[0].COLUMN_TYPE
                data = data.slice(5, data.length - 1)
                var newsql = `ALTER TABLE Type_of_donation MODIFY type ENUM(` + data + `,'` + type + `')`
                try {
                    let queryResult = await DB.runSQL(newsql)
                    if (queryResult.affectedRows) {
                        console.log("New donation type added!!")
                    }
                }
                catch (err) {
                    console.log(err)
                    res.status(500)
                }
            }
            try {
                let queryResult = await DB.createDonationSubtype(item, type);
                if (queryResult.affectedRows) {
                    console.log("New donation subtype added!!")
                }
            }
            catch (err) {
                console.log(err)
                res.status(500)
            }
        }

        try {
            let queryResult = await DB.createDonationRequest(quantity, urgency_level, item, faculty_id);
            if (queryResult.affectedRows) {
                console.log("New donation request added!!")
                res.json({
                    "success": true,
                    "message": "New donation request added!"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field/s missing")
        res.status(204)
    }
    res.end();
});

donationrequests.post('/update', urlencodedParser, async (req, res) => {
    var id = req.body.id;
    var field = req.body.field;
    var info = req.body.info;
    var isComplete = id && field && info
    if (isComplete) {
        if (field == 'quantity' || field == 'urgency_level') {
            try {
                var queryResult = await DB.updateDonationRequest(id, field, info)
                if (queryResult.affectedRows) {
                    console.log("Donation request updated")
                    res.json({
                        "success": true,
                        "message": "Donation request updated."
                    })
                }
            }
            catch (err) {
                console.log(err)
                res.status(500)
            }
        }
        else if (field == 'id' || field == 'faculty_id' || field == 'date' || field == 'item') {
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

donationrequests.post('/delete', urlencodedParser, async (req, res) => {
 var id = req.body.id;
   if (id)
   {
       try
       {
        let queryResult=await DB.deleteDonationRequest(id);
               if (queryResult.affectedRows) {
               console.log("Donation request deleted")
               res.json({
                "success": true,
                "message": "Donation request deleted"
               })
             }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Field/s missing")
       res.status(204)
   }
   res.end();
});


module.exports=donationrequests