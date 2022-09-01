require('dotenv').config()

const express = require ("express");
const cors = require ("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = (rq, res, next) =>{
    const authHeader = req.hjeaders['authorization'];
    const token = authHeader && authHeader.split('')[1];
    console.log(authHeader);
    if(token=null)
     return res.status(401).send("Token requerido");
    jwt.verify(token, TOKEN_KEY, (err, user)=>{
        if(err) return res.status(403).send("Token invalido");
        console.log(user);
        req.user = user;
        next();
    });
}

app.post("/usuario/login", (req,res)=>{
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    if(usuario=='fmendoza' && clave=='123456'){
        const datos={
                id:"123",
                nombre: "Felipe Mendoza",
                email: "fmendoza@mail.com",
                codigo: "ABDE456-lk"
        };
        const token = jwt.sign(
            {userID:datos.id, email:datos.email},
            TOKEN_KEY,
            {EXPIRESiN : "2h"}
        );
        let nDatos = {...datos, token};
        res.status("200").json(datos);
    }else{
        res.status(400).send("Crendenciales incorrectas");
    }
});

app.get("/usaurio/:id/ventas", verifyToken, (req, res)=>{
    const datos = [
        {id:1,cliente:"Empresa A",total:2500,fecha:"2022-01-15"},
        {id:2,cliente:"Empresa B",total:2100,fecha:"2022-01-15"},
        {id:3,cliente:"Empresa B",total:2200,fecha:"2022-01-15"},

    ];
    res.json(datos);
});

app.listen(3001, ()=>{
    console.log("Servidor iniciado en el puerto 3001");
})