import React, { Component } from 'react'

export default class Input extends Component {

  constructor(props) {
    super(props);

    this.state = {
      task: ''
    }
  }

  handleInput = (event) => {
    this.setState({
      task: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form  style={{margin: "10px 50px"}}>
        <div className="form-group">
        <input type="text" className="form-control" placeholder="enter todo" name="task" />
        </div>
      </form>
    )
  }
}
