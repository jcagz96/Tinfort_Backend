const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')



const registerRoutes = require('./src/routes/registerRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const findUserRoutes = require('./src/routes/findUserRoutes');
const playersRoutes = require('./src/routes/playersRoutes');

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {

}

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
})

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    ()=>{console.log('Conectado à base de dados')}
)

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/register', registerRoutes);
app.use('/login',loginRoutes);
app.use('/finduser',findUserRoutes);
app.use('/players',playersRoutes);
app.use('/files', express.static(path.resolve(__dirname, 'tmp', 'uploads')));




const port = 3001;

server.listen(port, ()=>{
    console.log("Servidor rodando!")
})