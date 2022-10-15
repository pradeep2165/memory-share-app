import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import ChipInput from "material-ui-chip-input";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initial = {
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  };
  const [postData, setPostData] = useState(initial);
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));

  const user = JSON.parse(localStorage.getItem("profile"));

  const clear = (e) => {
    e?.preventDefault();
    setCurrentId(0);
    setPostData(initial);
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
    // eslint-disable-next-line
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit} className={`${classes.root} ${classes.form}`}>
        <Typography variant="h6"> {currentId ? `Editing "${post.title}"` : "Creating a Memory"}</Typography>
        {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        {/* <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} /> */}
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        {/* <Button variant="contained" color="primary" size="large" type="submit" fullWidth className={classes.buttonSubmit}>
          Submit
        </Button> */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
