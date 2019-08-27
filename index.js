const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');


const registerRoutes = require('./src/routes/registerRoutes');
const loginRoutes = require('./src/routes/loginRoutes');

const app = express();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    ()=>{console.log('Conectado à base de dados')}
)


app.use(express.json());
app.use('/register', registerRoutes);
app.use('/login',loginRoutes);

app.get('/', (req,res) => {
    res.json({"nome": "joao"});
})

const port = 3001;

app.listen(port, ()=>{
    console.log("Servidor rodando!")
})