/*

User
Contiene el esquema de base de datos para mongo db, similar a crear una tabla en mysql.
Exporta el objeto del modelo, el cual se usara en controllers/users.contoller para 
la realizacion de queries a la base de datos

*/

// requerimos los modulos de equema y modelo del paquete de mongoose
const { Schema, model } = require('mongoose');

// instanciamos el modelo de base de datos con los campos de esta y su contenido
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
}, {
    timestamps: true
});

// el timestamps activa registros de fechas de modificacion y creacion en la misma db

// exportamos el modelo para las queries
module.exports = model('User', userSchema);