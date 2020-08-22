/*

database
es el archivo principal de la base de datos, en este se encuantran las configuraciones
del modulo, para que ya que quede configurado sea ocupado para hacer queries a la base
de datos

Arrancar la base de datos:
$ brew services start mongodb-community@4.2

Parar la base de datos:
$ brew services stop mongodb-community@4.2

*/

// requerimos el paquete
const mongoose = require('mongoose');

// recurrimos a una variable alojada en .env que contiene la ruta de la db
const URI = process.env.MONGODB_URI;

// configuraciones de la base de datos
mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

// conetamos a la db
const connection = mongoose.connection;

// una vez se conecte la base de datos se mostrara el console.log 
connection.once('open',() => {
    console.log('DB is connected');
});

/*

*/