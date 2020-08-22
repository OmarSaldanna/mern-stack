/*

index
este es el archivo principal del pryecto, este se ejecuta para iniciar el proyecto

*/

// requerimos el modulo que es para la variable del sistema en .env
require('dotenv').config();

// requerimos el modulo de base de datos, el cual se ejecuta al requerirlo
require('./database');

// importamos el modulo del servidor, ya configurado
const app = require('./app');

// definimos una funcion principal para un mejor orden
async function main(){
    await app.listen(app.get('port'));
    console.log('Server on port 4000')    
}

// ejecutamos la funcion
main();