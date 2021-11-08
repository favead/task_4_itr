const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = {
    host        : 'localhost',
    user        : 'root',
    port        : '3308',
    password    : 'Dan62785678',
    database    : 'database',
    insecureAuth : true,
    tableMessage : 'messageinfo',
    tableBro : 'broinfo',
    tableSis : 'sisinfo'
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const getBroInfo = `SELECT * FROM ${db.tableBro}`
const getSisInfo = `SELECT * FROM ${db.tableSis}`
const getMessageInfo = `SELECT * FROM ${db.tableMessage}`;
const connection = mysql.createConnection({
    host : db.host,
    user : db.user,
    port : db.port,
    password : db.password,
    database : db.database,
    insecureAuth : db.insecureAuth,
})


connection.connect(err => {
    if(err) throw err;
    console.log("Успешное соединение с БД");


})


app.listen(3001,"127.0.0.1",()=>{
     console.log("Сервер запущен")
})


app.get("/getBroInfo",(req,response)=>{
    connection.query(getBroInfo,(err,res)=>{
        if(err) throw err;
        response.json({user : res})
    })
})


app.get("/getSisInfo",(req,response)=>{
    connection.query(getSisInfo,(err,res)=>{
        if(err) throw err;
        response.json({user : res}) 
    })
})


app.get("/getMessage",(req,response)=>{
    connection.query(getMessageInfo,(err,res)=>{
        if(err) throw err;
        response.json({mes : res})
    })
})


app.get("/setBroMessage/:name/:date",(req,response)=>{
    let setBroInfo = `INSERT INTO ${db.tableBro} (name,date) VALUES (?,?)`
    let name = req.params.name;
    let date = req.params.date;
    connection.query(setBroInfo,[name,date],(err,res)=>{
        if(err) throw err;
        response.json("Ok")
    })

})


app.get("/setSisMessage/:name/:date",(req,response)=>{
    let setSisInfo = `INSERT INTO ${db.tableSis} (name,date) VALUES (?,?)`
    let name = req.params.name;
    let date = req.params.date;
    connection.query(setSisInfo,[name,date],(err,res)=>{
        if(err) throw err;
        response.json("Ok")
    })
})


app.get("/setMessage/:lcBro/:lcSis",(req,response)=>{
    let Bro = "Bro";
    let sis = "Sis"
    let lcBro = +req.params.lcBro;
    let lcSis = +req.params.lcSis
    let q = `INSERT INTO ${db.tableMessage} (${Bro},${sis}) VALUES (?,?)`
    connection.query(q,[lcBro,lcSis],(err,res)=>{
        if(err) throw err;
        response.json("Ok")
    });
})
