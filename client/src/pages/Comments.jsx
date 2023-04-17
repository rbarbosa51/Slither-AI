import React, { useEffect, useState } from "react";
import "../sass/Comments.scss";
import { useMutation, useQuery } from "@apollo/client";
//import Auth from '../utils/auth';
import { COMMENT_MUTATION } from "../utils/mutations";
import { COMMENTS_QUERY } from "../utils/queries";
import CommentItems from "../components/CommentItems";

export default function Comment() {
  const [postComment, {error, returnedData}] = useMutation(COMMENT_MUTATION);
  const {loading, data} = useQuery(COMMENTS_QUERY);
  const commentData = data?.getComments || [];
  const [formData, setFormData] = useState({name: '', email: '', comment: ''});

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
      //console.log(error);
    }
    setFormData({
      name: '',
      email: '',
      comment: ''
    });
  }

  // Added classNames to the labels and form
  return (
    <div className="comment">
      <h1>Submit Comments</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><input className="name-input" name="name" value={formData.name} type="text" onChange={handleChange}></input>
        <label>Email</label><input className="email-input" name="email" type="text" value={formData.email} onChange={handleChange}></input><br />
        <label>Comment</label><input className="comment-input" name="comment" type="text" value={formData.comment} onChange={handleChange} size={100}></input>
        <button className="submit-btn" type="submit">Post</button>
      </form>
      
      <h2>Comments Section</h2>
      {loading ? (
        <div>Loading Comments</div>
      ) : (
        
         <CommentItems comments={commentData} />
      )

      }
        
    </div>
  );
}