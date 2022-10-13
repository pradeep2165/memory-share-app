import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  const classes = useStyles();
  console.log(posts);
  if (!posts.length && !isLoading) return "No posts";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.mainContainer} container alignContent="stretch" spacing={3}>
      {posts?.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
