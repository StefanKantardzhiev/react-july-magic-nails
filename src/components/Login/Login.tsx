import React from "react";
import './Login.css';

const Login = () =>{

  async function login() {
     let email = (document.getElementById('email') as HTMLInputElement).value;
     let password = (document.getElementById('password') as HTMLInputElement).value;
     const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           email,
           password,
        }),
     });
     await response.json().then((data) => {
        console.log(data)
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
     });
     window.location.href = '/admin';
  }


  return (
    <div className="Login">
       <section className="main-title">
          <h1>Login</h1>
       </section>
       <section className="login-form">
          <form>
             <input id="email" type="text" placeholder="Email"/>
             <input id="password" type="text" placeholder="Password"/>
             <button onClick={login}>Login</button>
          </form>
       </section>
    </div>
  )
}
export default Login;