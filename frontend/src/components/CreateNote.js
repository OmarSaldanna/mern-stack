import React, { Component } from 'react'
import axios from 'axios'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {
    
    state = {
        users: [],
        userSelected: '',
        date: new Date(),
        content: '',
        title: '',
        // 
        editing: false,
        _id: ''
    }

    async componentDidMount(){
        this.getUsers();
        // ese objeto refiere al id en el url
        const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
        if (this.props.match.params.id) {
            this.setState({
                editing: true,
                title: res.data.title,
                content: res.data.content,
                author: res.data.author,
                date: new Date(res.data.date)
            });
        }
    }

    getUsers = async () => {
        const users = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: users.data,
            _id: this.props.match.params.id
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state)
        
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }

        // si queremos editar la accion del boton sera esta
        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);
            // console.log(this.state._id, newNote);
        } 
        
        // y esta sera si es que no queremos editar
        else {
            await axios.post('http://localhost:4000/api/notes', newNote);
            // this.setState({ title: '', content: '',});
        }    
        window.location.href="/";
    }

    // sirvio solo para el select, se creo otra para los 3 inputs
    // onInputChange = (e) => {
    //     this.setState({userSelected: e.target.value});
    //     // console.log(e.target.value);
    // }
    
    onInputChange = (e) => {
        // console.log(e.target.name, e.target.value);
        // A
        this.setState({[e.target.name]: e.target.value});
        // console.log(e.target.value);
    }

    onChangeDate = date => {
        this.setState({date: date});
    }

    render() {
        return (
            <div className=" col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Note</h4>
                    {/* select user */}
                    <div className="form-group">
                        <select className="form-control" name="userSelected"
                        onChange={this.onInputChange}>
                            {
                                this.state.users.map(user => ( 
                                    <option key={user._id} value={user.username}>
                                        {user.username}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    {/* input title */}
                    <div className="form-group">
                            <input type="text" className="form-control" placeholder="Note Title" name="title" required onChange={this.onInputChange}
                            value={this.state.title}/>
                    </div>
                    {/* textarea content */}
                    <div className="form-group">
                            <textarea className="form-control" placeholder="Note Content"
                            name="content" required onChange={this.onInputChange}
                            value={this.state.content}/>
                    </div>
                    {/* date picker date*/}
                    <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date}
                            onChange={this.onChangeDate}/>
                    </div>

                    <form onSubmit={this.onSubmit}>
                            
                        <button type="submit" className="btn btn-outline-dark">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}
