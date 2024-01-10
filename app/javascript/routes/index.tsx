import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../pages/MainPage"
import PostThread from "../pages/PostThread"
import NewPost from "../pages/NewPost"
import EditPost from "../pages/EditPost"

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostThread />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/edit" element={<EditPost />} />
    </Routes>
  </Router>
);