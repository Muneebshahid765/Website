// import React,{useState,useEffect} from 'react'
import Header from "./components/view/Header"
// import Sign from "./components/view/Sign"
import HeroSection from "./components/view/HeroSection"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/view/Footer";
// import MobileFooter from "./components/view/MobileFooter";
// import AdminPanel from "./components/AdminPanel/AdminPanel";

function App() {
    return (
        <BrowserRouter>
            <div id='header'>
                <Header />
            </div>
            
                <Routes>
                    <Route exact path="/" element={<HeroSection/>} />
                     {/* <Route exact path="/Mobile" element={<MobileFooter/>} />
                      <Route exact path="/admin" element={<AdminPanel/>} /> */}
                     
                     
                </Routes>
           <Footer/>
        </BrowserRouter>
    )
}

export default App;