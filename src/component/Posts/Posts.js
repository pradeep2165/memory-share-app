import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
// import useStyles from "./styles";

const Posts = () => {
  const postdata = useSelector((state) => state.posts);
  console.log(postdata);
  // const classes = useStyles();
  return (
    <div>
      <h1>Posts</h1>
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
