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
     return res.status(401).send("Required Token");
    jwt.verify(token, TOKEN_KEY, (err, user)=>{
        if(err) return res.status(403).send("Invalid Token");
        console.log(user);
        req.user = user;
        next();
    });
}

app.post("/username/login", (req,res)=>{
    const name = req.body.name;
    const code = req.body.code;
    if(name=='fmendoza' && code=='123456'){
        const datos={
                id:"123",
                name: "Felipe Mendoza",
                email: "fmendoza@mail.com",
                code: "ABDE456-lk"
        };
        const token = jwt.sign(
            {userID:datos.id, email:datos.email},
            TOKEN_KEY,
            {EXPIRESiN : "2h"}
        );
        let nDatos = {...datos, token};
        res.status("200").json(datos);
    }else{
        res.status(400).send("Wrong credentials");
    }
});

app.get("/usaurio/:id/ventas", verifyToken, (req, res)=>{
    const datos = [
        {id:1,client:"Business A",total:2500,date:"2022-01-15"},
        {id:2,client:"Business B",total:2100,date:"2022-01-15"},
        {id:3,client:"Business B",total:2200,date:"2022-01-15"},

    ];
    res.json(datos);
});

app.listen(3001, ()=>{
    console.log("Server Started 3001");
})