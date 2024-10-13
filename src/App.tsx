import { useEffect, useState } from "react";

import "./App.css";

import Home from "./pages/Home";
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Projects from "./pages/Projects";
import NavBar from "./components/NavBar";
import { MoveCameraProvider } from "./Hooks/useMoveCamera";


function App() {
  

  

  return (
    <div className="app-background" >
    <Router>
      <div className="Navbar"></div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<MoveCameraProvider ><Projects/></MoveCameraProvider>} />
      </Routes>
    </Router>
        
      
    </div>
  );
}

export default App;
