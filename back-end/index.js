const express = require('express')
const app = express()

const port = 3333
    
app.get("/api",(req,res)=>{
    res.json({ fruits: ["apple", "orange", "banana "]})
})

app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})
