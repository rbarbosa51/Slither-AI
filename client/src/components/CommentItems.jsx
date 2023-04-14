import React from "react";
import '../sass/CommentItems.scss'

export default function CommentItems({comments}) {
    if (!comments.length) {
        return (<h2>No Comments Loaded</h2>)
    }
    return (
        <>
            {comments && 
                comments.map((comment) => {
                    return (
                        <div key={comment.name} className="commentItems">
                            <p>{comment.name}</p>
                            <p>{comment.email}</p>
                            <p>{comment.comment}</p>
                        </div>
                    );
                })
            }
        </>  
    )
}