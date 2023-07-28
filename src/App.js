import React from "react";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import Checkout from "./Checkout";
import Login from "./Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
return (
  <BrowserRouter>  
    <div className="app">
    <Routes> <Route path="/" element={<React.Fragment><Header /><Home /></React.Fragment>} />
    <Route path="/checkout" element={<React.Fragment><Header /><Checkout/></React.Fragment>} />  
    <Route path="/Login" element={<React.Fragment><Header /><Login/></React.Fragment>} />
     </Routes>
    </div>
  </BrowserRouter>

    
        
          
      
 
);
}
export default App;