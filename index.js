//Dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');

/*
Verbos HTTP
GET - OBTENER RECURSOS
POST - ALMACENAR/CREAR RECURSOS 
PUT - MODIFICAR UN RECURSO
PATCH - MODIFICAR UNA PARTE DE UN RECURSO
DELETE - BORRAR UN RECURSO
REGULAR EXPRECION 
OPERADORES TERNARIOS
*/ 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", index);

app.use("/user", user);

app.use(auth);

app.use("/pokemon", pokemon);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('server is runing...')
});