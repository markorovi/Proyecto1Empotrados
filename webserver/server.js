const { log } = require("console");
const express = require("express");
const bcrypt = require("bcrypt");

const path = require("path");
const default_user = require("./src/default_user");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

/**Solicitud de inicio de sesion 
 * 
 */
app.post('/login', (req,res)=>{
    const {username, password} = req.body;
    if(username == default_user.user){
        //Algoritmo de encriptación
        bcrypt.compare(password,default_user.password, (err, result)=>{
            if(result){
                res.status(200).json({status: "200",response:"acceso permitido"});
            }else{
                res.status(401).json({status: "401",response:"acceso denegado contraseña mal"});
            }
        });
    }else{
        res.status(401).json({status: "401",response:"acceso denegado usuario no encontrado"});
    }
    
});
/**
 * Solicitud de estado de la luces
 */
app.get("/lights", (req, res) =>{
    console.log("luces")
});
/**
 * Solicitud de estado de las puertas
 */
app.get("/doors", (req,res)=>{
    console.log("obtener estado de las puertas");
});
/**
 * Solictud de foto
 */
app.get("/cam", (req, res)=>{
    console.log("tomando foto");
});
/**
 * encender luces
 */
app.post("/lights", (req, res) =>{
    console.log(req.body);
});

app.listen(3000,'0.0.0.0',()=>{
    console.log("escuchando en puerto 3000");
});