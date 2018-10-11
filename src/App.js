import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import Protected from './Protected'
import PrivateRoute from './PrivateRoute'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authToken: '',
      protectedComponent: Protected
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
    
  }

  handleLogin (event) {
    event.preventDefault();
    axios.post('http://localhost:8080/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      if(res.data.error) {
        alert('Wrong un/pwd!');
      } else {
        this.setState({authToken: res.data.token});
      }
    }).catch((res) => {
      alert(res.message)
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleLogout() {
    this.setState({authToken: undefined});
  }

  renderLoginForm() {
    return (
      <div className="App">
        <header>Welcome!</header>
        <br></br>
          <form >
              Username:<input type="text" key="username" name="username" value={this.state.username} onChange={this.handleChange} />
              Password:<input type="text" key="password" name="password" value={this.state.password} onChange={this.handleChange} />
              <input type="submit" onClick={this.handleLogin} />
          </form>
          { this.state.authToken ? 'You are Authorized!' : 'Please log in.'}
      </div>
      )
  }

  render() {
    const self = this;
    return (
      <div>
        <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
            
              {!!self.state.authToken ? (
                <li>
                  <a href="/" onClick={this.handleLogout}>Logout</a>
                </li>
              ) : (<span></span>)}
          </ul>
              <Switch>
                <Route exact path="/" component={self.renderLoginForm}  />
                <PrivateRoute isAuthenticated={!!self.state.authToken} path="/protected" component={Protected} />
              </Switch>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
