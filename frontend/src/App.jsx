import React, { useEffect } from "react"
import "./App.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Jobs from "./pages/Jobs"
import Register from "./pages/Register"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import PostApplication from "./pages/PostApplication"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/post/application/:jobId" element={<PostApplication />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
        <ToastContainer theme="dark" position="top-center" />
      </Router>
  );
};

export default App;

