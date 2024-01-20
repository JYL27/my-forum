import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom"
import Posts from "../pages/MainPage"
import PostThread from "../pages/PostThread"
import NewPost from "../pages/NewPost"
import EditPost from "../pages/EditPost"
import LoginPage from "../pages/LoginPage"
import NewComment from "../pages/NewComment"
import EditComment from "../pages/EditComment"
import isLoggedIn from "../components/helpers/isLoggedIn"

const ProtectedRoute = () => {
  if(!isLoggedIn()){
    return <Navigate to="/login" />
  }
  return <Outlet />
}

const BypassRoute = () => {
  if(isLoggedIn()) {
    return <Navigate to="/posts" />
  }
  return <Outlet />
}

export default (
  <Router>
      <Routes>
        <Route element={<BypassRoute />}>
          <Route path="/" element={<Navigate to="/login" />} /> {/* if user is not logged in, root page redirects to login page.
                                                                    Else, root page redirects to main page*/}
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/posts" element={<Posts />} /> 
        <Route path="/posts/:id" element={<PostThread />} /> {/* users may view posts if not logged in, 
                                                                but may not create posts or add comments */}
        <Route element={<ProtectedRoute />}>
          <Route path="/new" element={<NewPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id/comments/new" element={<NewComment />} />
          <Route path="/posts/:id/comments/:id/edit" element={<EditComment />} />
        </Route>
      </Routes>
  </Router>
)

  