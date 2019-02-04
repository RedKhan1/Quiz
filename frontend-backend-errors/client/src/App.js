import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import './App.css';

import Nav from './Components/Nav';
import Task from './Components/Task';
import Input from './Components/Input';

import setAuthJWT from './utils/setAuthJWT';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      user: null,
      errorMessage: ''
    }

  } 

  componentDidMount() {
    

    try {
      var token = localStorage.getItem('jwtToken');

      if (token) {

        const currentTime = Date.now() / 1000;
        const decoded = jwt_decode(token);
  
        if (decoded.exp < currentTime) {
          localStorage.removeItem('jwtToken');
          this.setState({
            user: null
          })
        }
        //axios.defaults.headers.common['Authorization'] = token;
        setAuthJWT(token);
        this.setState({
          user: decoded.email
        }, () => {

        })
      }

    } catch (err) {
      return;
    }
  }


  handleChecked = (id) => {

    let updatedTasks = this.state.tasks.map( (todo) => {
      if (todo._id === id) {
        todo.completed = todo.completed      
      }
      return todo;
    })

  }

  handleAddTask = (task) => {
    var token = localStorage.getItem('jwtTokens');
    const decoded = jwt_decode(token);
    let newTask = {
      todo: task,
    }


    axios.post('http://localhost:3000/todo/createtodo', newTask, axiosConfig)
      .then(result => {
        let currentTaskObj = Object.assign([], this.state.tasks);
        currentTaskObj.push(result);

      })
      .catch(error => {
        console.log(error)
      })

  }

  handleUpdateEdit = (id, updatedTask) => {
    let updated = Object.assign([], this.state.tasks);
    updated.map((task) =>
      (task._id === id ? task.todo = updatedTask : task) 
    )

  }

  handleDelete = (id) => {
    //let updated = Object.assign([], this.state.tasks);
 
    // let updatedList = updated.filter((task) => 
    //   task._id !== id  
    // );

    var token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    axios.delete(`http://localhost:3000/todo/deleetodo`)
      .then(user => {
        this.setState({
          tasks: user.data.todos
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleGetData = () => {

    var token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    axios.get(`http://localhost:3000/todo/getalltodos/${decoded.id}`)
    .then(result => {
      this.setState({
        tasks: result
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleSignUpAndSignIn = () => {

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

    axios.post('http://localhost:3000/users/register-login', data, axiosConfig)
      .then(result => {


        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header

        // Decode token to get user data
        const decoded = jwt_decode(token);

        this.setState({
          user: decoded.email,
          errorMessage: ''
        }, () => {

        })

      })
      .catch(err => {

        this.setState({
          error: true,
          errorMessage: JSON.stringify(err.response.data.payload.password)
        })

      })
  }

  logout = () => {
    this.setState({
      user: null
    })
  }

  render() {
    return (
      <div className="App">
        <Nav 
          handleSignUpAndSignIn={this.handleSignUpAndSignIn} 
          user={this.state.user}
          logout={this.logout}
          error={this.state.error}
          errorMessage={this.state.errorMessage}
          />
        <Input handleAddTask={this.handleAddTask} />
        <Task {...this.state} 
              handleChecked={this.handleChecked} 
              handleUpdateEdit={this.handleUpdateEdit}  
              handleDelete={this.handleDelete}
              />
      </div>
    );
  }
}

export default App;
