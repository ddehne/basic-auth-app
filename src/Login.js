import React from 'react';

const Login = (props) => {
    return (
    <div className="App">
      <header>Welcome!</header>
      <br></br>
        <form >
            Username:<input name="username" value={props.username} onChange={props.handleChange} />
            Password:<input name="password" value={props.password} onChange={props.handleChange} />
            <input type="submit" onClick={props.handleLogin} />
        </form>
        { props.authToken ? 'You are Authorized!' : 'Please log in.'}
      </div>
    );
}


export default Login;