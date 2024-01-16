import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Posts from "../pages/MainPage"
import PostThread from "../pages/PostThread"
import NewPost from "../pages/NewPost"
import EditPost from "../pages/EditPost"
import HomePage from "../pages/HomePage"
import NewComment from "../pages/NewComment"
import EditComment from "../pages/EditComment"
export default (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostThread />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id/comments/new" element={<NewComment />} />
          <Route path="/posts/:id/comments/:id/edit" element={<EditComment />} />
        </Routes>
    </Router>
)

  