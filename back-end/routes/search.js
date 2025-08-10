const express= require("express")
const search = express.Router();
const DB=require('../database/databaseConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


search.post('/', urlencodedParser, async (req,res)=>{
    var filter=req.body.filter;
    var sort=req.body.sort;
    var types=req.body.types;
    var items=req.body.items;
    var faculties=req.body.faculties;
    var unis=req.body.unis;
    var cities=req.body.cities;
    var quantity=req.body.quantity;
    var urgency_level=req.body.urgency_level;
    var date=req.body.date;

    
    var sqlBuilder= []
    var sqlStart='SELECT item, type, urgency_level, quantity, DATE_FORMAT(date, "%M %d %Y") AS date, name AS faculty, university, city FROM Donation_request INNER JOIN Faculty ON Donation_request.faculty_id=Faculty.id INNER JOIN Type_of_donation ON Donation_request.item=Type_of_donation.subtype'
    var sqlPart=''
    if(filter){
        if(items){
            sqlPart=sqlStart+' WHERE item IN '+items
            sqlBuilder.push(sqlPart)
        }
        if(types){
            sqlPart=sqlStart+' WHERE type IN '+types
            sqlBuilder.push(sqlPart)
        }
        if(faculties){
            sqlPart=sqlStart+' WHERE name IN '+faculties
            sqlBuilder.push(sqlPart)
        }
        if(unis){
            sqlPart=sqlStart+' WHERE university IN '+unis
            sqlBuilder.push(sqlPart)
        }
        if(cities){
            sqlPart=sqlStart+' WHERE city IN '+cities
            sqlBuilder.push(sqlPart)
        }
        sqlStart=''
        for(i=0; i < sqlBuilder.length; i++){
            sqlStart+=sqlBuilder[i]
            if(i!=sqlBuilder.length-1){
                sqlStart+=' INTERSECT '
            }
        }  
        if(!sqlStart){
        sqlStart='SELECT item, type, urgency_level, quantity, date, name, university, city FROM Donation_request INNER JOIN Faculty ON Donation_request.faculty_id=Faculty.id INNER JOIN Type_of_donation ON Donation_request.item=Type_of_donation.subtype'
    }  
    }
    console.log('i get to here')
    if(sort){
        var sqlHelper ='SELECT * FROM ('+sqlStart+') AS everything ORDER BY'
        if(quantity){
            if(quantity===1){
                sqlHelper+=' quantity ASC'
            }else{
                sqlHelper+=' quantity DESC'
            }
        }
        if(quantity&&urgency_level || quantity&&date){
            sqlHelper+=','
        }
        if(urgency_level){
            if(urgency_level===1){
                sqlHelper+=' urgency_level ASC'
            }else{
                sqlHelper+=' urgency_level DESC'
            }
        }
        if(urgency_level && date){
            sqlHelper+=','
        }
        if(date){
            if(date===1){
                sqlHelper+=' date ASC'
            }else{
                sqlHelper+=' date DESC'
            }
        }
        sqlStart=sqlHelper
    }
    if(!filter && !sort){
        sqlStart+=` ORDER BY date DESC`
    }
    try
       {
        console.log(sqlStart)
        let queryResult=await DB.runSQL(sqlStart);
               console.log("Search results: \n"+queryResult)
               res.json(queryResult)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }
})

search.get('/subtype', urlencodedParser, async (req, res) => {
       try
       {
        let queryResult1=await DB.listDonationSubtypesForSearch();
        console.log(queryResult1)
        res.json(queryResult1)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});
search.get('/fac', urlencodedParser, async (req, res) => {
       try
       {
        let queryResult1=await DB.listFacultiesForSearch();
        console.log(queryResult1)
        res.json(queryResult1)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});
search.get('/uni', urlencodedParser, async (req, res) => {
       try
       {
        let queryResult1=await DB.listUniversitiesForSearch();
        console.log(queryResult1)
        res.json(queryResult1)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});
search.get('/cities', urlencodedParser, async (req, res) => {
       try
       {
        let queryResult1=await DB.listCitiesForSearch();
        console.log(queryResult1)
        res.json(queryResult1)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});

search.get('/type', urlencodedParser, async (req, res) => {
       try
       {
        let queryResult1=await DB.listDonationTypeENUM();
        console.log(queryResult1)
        var data = queryResult1[0].COLUMN_TYPE;
        console.log(data)
        data=data.slice(6, data.length-2);
        console.log(data)
        var typesArray = data.split(`','`)
        var withKeys= []
        for (let i = 0; i < typesArray.length; i++) {
            withKeys.push({name: typesArray[i], key: i+1})
        }
        console.log(withKeys)
        res.json(withKeys)
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   res.end();
});

module.exports=search