import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { firestore } from "./database/firebase";
const Test = ({ match }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const postId = match.params.id;
  const postRef = useRef(firestore.doc(`posts/${postId}`)).current;
  const commentsRef = useRef(postRef.collection("comments")).current;
  useEffect(() => {
    const unsubscribePosts = postRef.onSnapshot((docSnapshot) => {
      if (docSnapshot.data()) {
        setPost((prePost) => docSnapshot.data());
      }
    });
    return () => {
      unsubscribePosts();
    };
  }, [postRef]);
  useEffect(() => {
    const unsubscribeComment = commentsRef.onSnapshot((querySnapshot) => {
      let tempArray = [];
      querySnapshot.forEach((item) => {
        tempArray.push({
          id: item.id,
          message: item.data().message,
        });
      });
      if (querySnapshot.docs.length > 0) {
        setComments((preComments) => tempArray);
      }
    });
    return () => {
      unsubscribeComment();
    };
  }, [commentsRef]);
  if (!!post) {
    console.log(comments);
    return (
      <div>
        title: {post.title}, content: {post.content}
        {comments.length > 0
          ? comments.map((item, index) => {
              return <div key={index}>{item.message}</div>;
            })
          : null}
      </div>
    );
  }
  return <div>Loading...</div>;
};
export default withRouter(Test);
