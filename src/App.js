import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import Auth from "./component/Auth/Auth";
import PostDetails from "./component/PostDetails/PostDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
