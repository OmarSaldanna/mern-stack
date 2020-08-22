/*

app
Este archivo instancia el servidor mediante express, se configura y se le asignan las rutas.
Este exporta el modulo de la aplicacion o servidor, y este es ocupado en el src/index

*/
const express = require('express');
const app = express();
const cors = require('cors');

// settings

// usara el puerto que le asigne el sistema o si no el 4000
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
// estas lineas ejecutaran los modulos cada que la app vaya a esa url
// contienen las acciones a la base de datos y respuestas del servidor
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));

// exportamos el objeto del servidor
module.exports = app;