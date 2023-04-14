import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { LOGIN_MUTATION, ADD_USER_MUTATION } from "../utils/mutations";

export default function Login() {
    const [login, {error, data}] = useMutation(LOGIN_MUTATION);
    const [loginFormData, setLoginFormData] = useState({email: '', password: ''});

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

    return (
        <>
            <div className="about">
                <h1>Login</h1>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="email">email</label><input name="email" value={loginFormData.name} type="text" onChange={handleChange}></input>
                    <label>Password</label><input  name="password" type="text" value={loginFormData.password} onChange={handleChange}></input><br />
                    
                    <button type="submit">Submit</button>
                </form>
        
            </div>
        </>
    )
}