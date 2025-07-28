const express= require("express")
const faculties = express.Router();
const DB=require('../database/databaseConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

faculties.post('/adduni', urlencodedParser, async (req, res) => {
 var university = req.body.university;
   if (university)
   {
       try
       {
        let queryResult=await DB.addUniversity(university);
               if (queryResult.affectedRows) {
               console.log("New university registered!!")
               res.json({
                "success": true,
                "message": "New university registered."
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
       console.log("Please enter university!")
       res.status(204)
   }
   res.end();
});

faculties.post('/addfac', urlencodedParser, async (req, res) => {
 
 var name = req.body.name;
 var city = req.body.city;
 var address = req.body.address;
 var coordinates = req.body.coordinates;
 var working_hours = req.body.working_hours;
 var university = req.body.university;
 var id = req.body.id;

 var isCompleteFaculty = name && city && address && coordinates && working_hours && university && id

   if (isCompleteFaculty)
   {
       try
       {
        let queryResult=await DB.addFaculty(name, city, address, coordinates, working_hours, university, id);
               if (queryResult.affectedRows) {
               console.log("New faculty registered!!")
               res.json({
                "success": true,
                "message": "New faculty registered."
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
       console.log("Fields are missing!")
       res.status(204)
   }
   res.end();
});

module.exports=faculties