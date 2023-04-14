import React, { useState } from "react";
import "../sass/Comments.scss";
import { useMutation } from "@apollo/client";
//import Auth from '../utils/auth';
import { COMMENT_MUTATION } from "../utils/mutations";
import { COMMENTS_QUERY } from "../utils/queries";

export default function About() {
  const [postComment, {error, data}] = useMutation(COMMENT_MUTATION);
  const [formData, setFormData] = useState({name: '', email: '', comment: ''})
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const {data} = await postComment({
        variables: {...formData}
      });
    } catch (error) {
      console.log(error);
    }
    setFormData({
      name: '',
      email: '',
      comment: ''
    });

  }
  return (
    <div className="about">
      <h1>Submit Comments</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><input name="name" value={formData.name} type="text" onChange={handleChange}></input>
        <label>Email</label><input  name="email" type="text" value={formData.email} onChange={handleChange}></input><br />
        <label>Comment</label><input name="comment" type="text" value={formData.comment} onChange={handleChange} size={100}></input>
        <button type="submit">Submit</button>
      </form>
        
    </div>
  );
}