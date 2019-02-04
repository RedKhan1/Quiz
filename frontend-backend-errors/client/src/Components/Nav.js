import React, { Component } from 'react'


export default class Nav extends Component {

  
  handleInput = (event) => {
    
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();


    this.form.reset();
  }


  logout = () => {
    this.props.logout()
  }

  render() {

    console.log(this.props)

    return (
      <nav className="navbar navbar-light" style={{backgroundColor:"#e3f2fd"}}>
       <span className="navbar-brand" href="#">React Todo</span>

    {this.props.error ? (<div>{this.props.errorMessage}</div>) : ''}

        {this.user ?  (<div>
                                <span style={{marginRight: 10}}>{this.props.user}</span>
                              <input type="button" className="btn btn-primary mb-2"  value="logout" onClick={this.logout}/>
                            </div>) : ( <form className="form-inline" onSubmit={this.handleSubmit} ref={(node) => this.form = node}>
          <div className="form-group mb-2">
            <input type="text" className="form-control" name="email" placeholder="Email" onChange={this.handleInput} />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input type="text" className="form-control" name="password" placeholder="Password" onChange={this.handleInput}/>
          </div>
          <button type="submit" className="btn btn-primary mb-2">Sign up/ Sign in</button>
        </form>)}

      </nav>
    )
  }
}
