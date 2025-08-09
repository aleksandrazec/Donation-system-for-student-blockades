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
        let queryResult1=await DB.listUniversitiesENUM();
        console.log(queryResult1)
        var data = queryResult1[0].COLUMN_TYPE;
        console.log(data)
        data=data.slice(5, data.length-1);

        console.log(data)
        var newsql=`ALTER TABLE Faculty MODIFY university ENUM(`+data+`,'`+university+`')`
        
        let queryResult=await DB.runSQL(newsql)
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

 var isCompleteFaculty = name && city && address && coordinates && working_hours && university

   if (isCompleteFaculty)
   {
       try
       {
        let queryResult=await DB.addFaculty(name, city, address, coordinates, working_hours, university);
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
faculties.post('/find', urlencodedParser, async (req, res) => {
 var university = req.body.university;
   if (university)
   {
       try
       {
        let queryResult=await DB.findFaculties(university);
               if (queryResult.length>0) {
               console.log("faculties found")
               res.json(queryResult)
             }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Field is missing!")
       res.status(204)
   }
   res.end();
});

faculties.post('/info', urlencodedParser, async (req, res) => {
 var id = req.body.id;
   if (id)
   {
       try
       {
        let queryResult=await DB.showFacultyInfo(id);
               console.log(queryResult[0])
               res.json(queryResult[0])
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Field is missing!")
       res.status(204)
   }
   res.end();
});

faculties.post('/manager', urlencodedParser, async (req, res) => {
 var faculty_id = req.body.faculty_id;
 var student_id = req.body.student_id;
   if (faculty_id&&student_id)
   {
       try
       {
        let queryResult=await DB.assignStudentManager(faculty_id, student_id);
               if (queryResult.affectedRows) {
               console.log("Student manager assigned")
               res.json({
                "success": true,
                "message": "Student manager assigned"
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
       console.log("Field is missing!")
       res.status(204)
   }
   res.end();
});

faculties.post('/update', urlencodedParser, async (req, res) => {

    var id = req.body.id;
    var field = req.body.field;
    var info = req.body.info;
    var isComplete = id && field && info
    if (isComplete) {
        if (field == 'address' || field == 'coordinates' || field == 'city' || field == 'working_hours' || field=='university') {
            try {
                var queryResult = await DB.updateFacultyInfo(id, field, info)
                if (queryResult.affectedRows) {
                    console.log("Faculty info updated")
                    res.json({
                        "success": true,
                        "message": "Faculty info updated."
                    })
                }
            }
            catch (err) {
                console.log(err)
                res.status(500)
            }
        }
        else if (field == 'id' || field == 'user_id') {
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


faculties.post('/removefac', urlencodedParser, async (req, res) => {
 var id = req.body.id;

   if (id)
   {
       try
       {
        let queryResult=await DB.deleteFaculty(id);
               if (queryResult.affectedRows) {
               console.log("Faculty removed")
               res.json({
                "success": true,
                "message": "Faculty removed"
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
       console.log("Field is missing!")
       res.status(204)
   }
   res.end();
});

faculties.get('/listfac', urlencodedParser, async (req, res) => {
    try{
        let queryResult=await DB.listFaculties();
               if(queryResult.length>0)
               {
                    console.log(queryResult)
                    console.log("OK");
                    res.json(queryResult);      
                    res.status(200)
               }else
               {
                  console.log("no facs?");
                  res.status(204)  
               }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});


faculties.get('/listuni', urlencodedParser, async (req, res) => {
    try{
        let queryResult=await DB.listUniversitiesForSearch();
               if(queryResult.length>0)
               {
                    console.log(queryResult)
                    console.log("OK");
                    res.json(queryResult);      
                    res.status(200)
               }else
               {
                  console.log("no unis?");
                  res.status(204)  
               }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});

faculties.get('/listcities', urlencodedParser, async (req, res) => {
    try{
        let queryResult=await DB.listCities();
               if(queryResult.length>0)
               {
                    console.log(queryResult)
                    console.log("OK");
                    res.json(queryResult);      
                    res.status(200)
               }else
               {
                  console.log("no cities?");
                  res.status(204)  
               }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});

module.exports=faculties