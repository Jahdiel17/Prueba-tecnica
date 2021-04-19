const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const router = require('./routes');
const cors = require('cors');

// crear el servidor
const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

// habilitar cors
//app.use(cors(corsOptions));
app.use(cors());

// conectar a mongooose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tienda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// habilitar el bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// habilitar routing
app.use('/', routes())


// puerto y arrancar el servidor
app.listen(4000, () => {
    console.log('Servidor funcionando');
})