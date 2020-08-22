import React, { Component } from 'react'

// modulo adicional, sirve para hacer peticiones al backend y recuperar arrays
import axios from 'axios'

export default class CreateUser extends Component {
    
    // variable que se usa para almacenar datos de la app
    state = {
        // alojara la lista de usuarios de la db 
        users: [],
        // alojara los datos del form
        username: ''
    }
    
    // la funcion se ejecuta sola
    async componentDidMount(){

        // hacemos la peticion y arroja un objeto, como en insomnia
        // const res = await axios.get('http://localhost:4000/api/users'); // A

        // los datos de la base de datos se encuentran en res.data
        // console.log(res);

        // // guardaos en state los datos de la db
        // this.setState({users: res.data});

        // mudamos la funcion para actualisar en el submit del form
        this.getUsers();
    }

    getUsers = async () => {
        // A)
        const res = await axios.get('http://localhost:4000/api/users');

        // guardaos en state los datos de la db
        this.setState({users: res.data});
    }

    onChangeUsername = (e) => {
        // asignamos al username el valor del input(target)
        this.setState({
            username:  e.target.value
        });
    }

    onSubmit = async (e) => {
        // evitamos que el formulario refresque la pagina
        e.preventDefault();
        // B)
        await axios.post('http://localhost:4000/api/users', {username: this.state.username});
        // dejamos el username vacio un vez se de submit
        this.setState({username: ''});
        // refrescamos los usuarios sin refrescar la pagina
        this.getUsers();
    }
    
    deleteUser = async (id) =>{
        // C)
        await axios.delete('http://localhost:4000/api/users/' + id);
        // console.log('delete')
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                
                {/* Formulario para agregar usuarios */}
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        {/* cuando se de submit se realizara la funcion */}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group col">
                                <input type="text" className="from-control col" 
                                // si se cambia se guarda el texto en el state.username
                                onChange={this.onChangeUsername} 
                                // esto es para que al submit el input se vacie 
                                value={this.state.username}
                                />
                            </div>
                            <button type="submit" className="btn btn-outline-dark">Save</button>
                        </form>
                    </div>
                </div>

                {/* lista de usuarios */}
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            // mapeamos e imprimimos los elementos de users
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" key={user._id}>
                                    {user.username}
                                    <button type="button" className="btn btn-outline-danger" onClick={() => this.deleteUser(user._id)}>Delete</button>
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
