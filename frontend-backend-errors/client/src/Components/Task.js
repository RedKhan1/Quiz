import React, { Component } from 'react'
import TaskList from './TaskList';


export default class Task extends Component {



  handleDelete = (id) => {
    this.props.handleDelete(id)
  }

  
  handleChecked = (id) => {
   this.props.handleChecked(id)
  }

  render() {
    const tasks = this.props.tasks;
    let task = tasks.map((task, index) => {
      let checked = (task.completed === true ? true : false )
      return (
       <TaskList checked={checked}
                 task={task}
                 key={task._id}
                 handleDelete={this.handleDelete}
       />
      )
    })

    return (
      <div style={{margin: "10px 50px"}}>
        <ul className="list-group">
          {task}
        </ul>
      </div>
    )
  }
}

/*

import React, { Component } from 'react'
import TaskList from './TaskList';


export default class Task extends Component {

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
    const tasks = this.props.tasks;
    let task = tasks.map((task, index) => {
      let checked = (task.completed === true ? true : false )
      return (
        <li className={`list-group-item ${(checked) ? "list-group-item-danger completed" : ""}`} key={task.id} >
          <input type="button" className="float-right btn btn-danger  btn-sm" value="delete" style={{textAlign: 'center', marginLeft: 5}} onClick={this.handleDelete.bind(this, task.id)} />
          <input type="button" className="float-right btn btn-info  btn-sm" value="edit" style={{textAlign: 'center'}} onClick={this.handleEdit.bind(this, task.id)} />
          <input type="checkbox" style={{margin: "7px 5px"}} className="float-right" checked={checked} onChange={this.handleChecked.bind(this, task.id)} />
          {this.state.toggle ? '' : task.todo}
        </li>
      )
    })

    return (
      <div style={{margin: "10px 50px"}}>
        <ul className="list-group">
          {task}
        </ul>
      </div>
    )
  }
}

*/