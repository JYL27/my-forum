import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../pages/MainPage"
import PostThread from "../pages/PostThread"
import NewPost from "../pages/NewPost"

export default (
  <Router>
    <Routes>
    <Route path="/" element={<Posts />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostThread />}></Route>
      <Route path="/post" element={<NewPost />} />
    </Routes>
  </Router>
);