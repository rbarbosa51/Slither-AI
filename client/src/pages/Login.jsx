import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { LOGIN_MUTATION, ADD_USER_MUTATION } from "../utils/mutations";

export default function Login() {
    const [login, {error, data}] = useMutation(LOGIN_MUTATION);
    const [loginFormData, setLoginFormData] = useState({email: '', password: ''});
    const [addUser, {signuperror, signupdata}] = useMutation(ADD_USER_MUTATION);
    const [signupFormData, setSignupFormData] = useState({firstName: '', lastName: '', email: '', password: ''});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginFormData({
          ...loginFormData,
          [name]: value,
        });
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(loginFormData);
        try {
          const { data } = await login({
            variables: { ...loginFormData },
          });
    
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }
        // clear form values
        setLoginFormData({
          email: '',
          password: '',
        });
      };

      const handleSignupChange = (event) => {
        const { name, value } = event.target;
        setSignupFormData({
          ...signupFormData,
          [name]: value,
        });
      };
      const handleSignupSubmit = async (event) => {
        event.preventDefault();
        console.log(signupFormData);
        try {
          const { data } = await addUser({
            variables: { ...signupFormData },
          });
    
          Auth.login(data.token);
        } catch (e) {
          console.error(e);
        }
        // clear form values
        setSignupFormData({firstName: '', lastName: '', email: '', password: ''});
      };
    return (
        <>
            <div className="login">
                <h1>Login</h1>
                <form className="loginForm" onSubmit={handleFormSubmit}>
                    <label>email</label><input name="email" value={loginFormData.name} type="text" onChange={handleChange}></input>
                    <label>Password</label><input  name="password" type="text" value={loginFormData.password} onChange={handleChange}></input><br />
                    
                    <button type="submit">Log In</button>
                </form>
                <hr />
                <h1>Sign up</h1>
                <form className="signupForm" onSubmit={handleSignupSubmit}>
                    <label>FirstName: </label><input name="firstName" value={signupFormData.firstName} type="text" onChange={handleSignupChange}></input>
                    <label>LastName: </label><input name="lastName" value={signupFormData.lastName} type="text" onChange={handleSignupChange}></input>
                    <label>Email: </label><input name="email" value={signupFormData.email} type="text" onChange={handleSignupChange}></input>
                    <label>Password</label><input  name="password" type="text" value={signupFormData.password} onChange={handleSignupChange}></input><br />
                    <button type="submit">Sign Up</button>
                </form>
        
            </div>
        </>
    )
}