/*

users.contollers.js
contiene las funciones de crear, borrar y mostrar los usuarios almacenados en la base de 
datos, dichas funciones son ejecutadas por el archivo de routes/users, y las funciones 
exportan el modulo de models/User que contiene la estructura de datos para poder hacer
queries mediante el objeto User.

http://localhost:4000/api/users

*/

// creamos un objeto para almacenar y exportar las funciones
const usrCtrl = {};

// importamos el modulo que contiene el modelo de la base de datos
const User = require('../models/User');

// get
usrCtrl.getUsers = async (req, res) => {
    const users = await User.find(); // devuelve un array con todos los usuarios  
    res.json(users);
};

// post
usrCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json('User Created');
};

// delete + id
usrCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json('User Deleted');
};

// exportamos el objeto con las funciones 
module.exports = usrCtrl;