import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import Auth from "./component/Auth/Auth";
import PostDetails from "./component/PostDetails/PostDetails";

const App = () => {
  const Authorise = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      return <Navigate to="/posts" />;
    } else {
      return <Auth />;
    }
  };
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route exact path="/auth" element={<Authorise />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
