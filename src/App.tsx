import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Main from './components/Main/Main'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Gallery from './components/Gallery/Gallery'
import Admin from './components/Admin/Admin'
import Login from "./components/Login/Login";
import {Services} from "./components/Services/Services";
import Facebook from "./components/Facebook/Facebook";

function App() {
  return (
    <div className="App">
      <Header/>
       <Facebook/>
       <Router>
         <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<h1 id='not-found'>Not Found</h1>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/services" element={<Services/>}/>
         </Routes>
      </Router>
      <Footer/>
    </div>
  );
}
export default App;