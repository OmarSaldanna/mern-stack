/*

App
Es el archivo principal de la aplicacion, en este se importaran todos los componentes extra 
y de instanciara el enrutador de React, mediante react-router-dom(esta se instala por aparte)


Dependencias extras:

frontend $ npm i react-router-dom
frontend $ npm install bootstrap

*/
import React from 'react';
import './App.css';

// importamos los modulos del enrutador
import { BrowserRouter as Router, Route} from 'react-router-dom'

// importamos el archivo css de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// importamos los componentes
import Navigation from './components/Navigation';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import NotesList from './components/NotesList';

function App() {
  return (
    <Router>
      {/* dejamos el navbar arriba para que todos lo tengan */}
      <Navigation/>
        {/* agregamos espaciado mediante un div para todas las rutas */}
        <div className="container p-4">
          <Route exact path="/" component={NotesList}></Route>
          <Route path="/edit/:id" component={CreateNote}></Route>
          <Route path="/create" component={CreateNote}></Route>
          <Route path="/user" component={CreateUser}></Route>
        </div>
    </Router>
  );
}

export default App;
