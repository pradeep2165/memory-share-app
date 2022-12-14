import React, { useEffect, useState } from "react";
import { Container, Grid, Grow, AppBar, TextField, Button, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import { useLocation, useNavigate } from "react-router-dom";

import ChipInput from "material-ui-chip-input";
import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined" />

              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
