import React, { Component } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class TaskList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      currentState: '',
      updateEdit: false
    }
  }

  componentDidMount() {
    this.setState({
      currentState: this.props.task.todo
    })
  }

 
  handleEdit = (id) => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
      updateEdit: !prevState.updateEdit
    }), () => {

      if (!this.state.toggle) {
        this.handleServerEdit(id)
        this.setState({
          updateEdit: false
        })
      }
    }) 
  }
 

  handleServerEdit = (id) => {

    var token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    let newObj = {
      id,
      newTodo: this.state.currentState
    }

    axios.put(`http://localhost:3000/todo/updatetodo/${decoded.id}?_method=PUT`, newObj)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })

  }

  handleUpdateEdit = (id) => {

    this.setState({
      currentState: this.refs.updatedText.value
    }, () => {
      
      this.setState({
        updateEdit: false
      })

      this.props.handleUpdateEdit(id, this.state.currentState)
    })
  }

  handleDelete = (id) => {
   this.props.handleDelete(id)
  }

  render() {
    return (
      <li className={`list-group-item ${(this.props.checked) ? "list-group-item-danger completed" : ""}`} key={this.props.task._id} >
        <input type="button" className="float-right btn btn-danger  btn-sm" value="delete" style={{textAlign: 'center', marginLeft: 5}} onClick={this.handleDelete.bind(this, this.props.task._id)} />
        { !!this.state.updateEdit ? <input type='button' className="float-right btn btn-info  btn-sm" value="No Edit" style={{textAlign: 'center'}} onClick={this.noEdit} /> : ''}
        <input type="button" disabled={this.state.updateEdit} className="float-right btn btn-info  btn-sm" value="edit" style={{textAlign: 'center', marginRight: 5}} onClick={this.handleEdit.bind(this, this.props.task._id)} />
        <input type="checkbox" style={{margin: "7px 5px"}} className="float-right" checked={this.props.checked} onChange={this.handleChecked.bind(this, this.props.task._id)} />
        
        {this.state.toggle ? <input value={this.state.currentState} 
                                    type="text" 
                                    ref="updatedText"
                                    onChange={this.handleUpdateEdit.bind(this, this.props.task._id)} /> : this.props.task.todo}
     
    </li>

    )
  }
}


/*

import React, { Component } from 'react'

export default class TaskList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      toggle: false
    }

  }

  handleEdit = (id) => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  handleDelete = (id) => {

  }
  
  handleChecked = (id) => {
   this.props.handleChecked(id)
  }

  render() {

    let task = [];

    if (this.state.toggle) {
      task = (
        <li className={`list-group-item ${(this.props.checked) ? "list-group-item-danger completed" : ""}`} key={this.props.task.id} >
          <input type="button" className="float-right btn btn-danger  btn-sm" value="delete" style={{textAlign: 'center', marginLeft: 5}} onClick={this.handleDelete.bind(this, this.props.task.id)} />
          <input type="button" className="float-right btn btn-info  btn-sm" value="edit" style={{textAlign: 'center'}} onClick={this.handleEdit.bind(this, this.props.task.id)} />
          <input type="checkbox" style={{margin: "7px 5px"}} className="float-right" checked={this.props.checked} onChange={this.handleChecked.bind(this, this.props.task.id)} />
        {this.props.task.todo}
       </li>
      )
    } else {
      task = (
        <li className={`list-group-item ${(this.props.checked) ? "list-group-item-danger completed" : ""}`} key={this.props.task.id} >
          <input type="button" className="float-right btn btn-danger  btn-sm" value="delete" style={{textAlign: 'center', marginLeft: 5}} onClick={this.handleDelete.bind(this, this.props.task.id)} />
          <input type="button" className="float-right btn btn-info  btn-sm" value="edit" style={{textAlign: 'center'}} onClick={this.handleEdit.bind(this, this.props.task.id)} />
          <input type="checkbox" style={{margin: "7px 5px"}} className="float-right" checked={this.props.checked} onChange={this.handleChecked.bind(this, this.props.task.id)} />
          {this.props.task.todo}
      </li>
      )
    }

    return (
     {task}
    )
  }
}


*/