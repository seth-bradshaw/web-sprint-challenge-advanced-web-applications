import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const initialState = {
  username: '',
  password: ''
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialState)

  const changeHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/colors')
      })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitHandler}>
        <input name='username' type='text' value={credentials.username} onChange={changeHandler} placeholder='Username'/>
        <input name='password' type='password' value={credentials.password} onChange={changeHandler} placeholder='Password'/>
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
