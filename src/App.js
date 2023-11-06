import React,{useEffect} from "react";
import "./App.css";
import Home from "./Home";
import { auth } from "./firebase";
import Header from "./Header";
import Order from "./Order";
import {Orders} from "./Orders";
import Checkout from "./Checkout";
import { useStateValue } from "./StateProvider";
import Login from "./Login";
import Payment from "./Payment";
import StripeCheckout from "react-stripe-checkout"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter,Routes,Route } from "react-router-dom";
require('dotenv').config();
const promise = loadStripe(
  process.env.STRIPE_PUBLISHABLE_KEY
);


  function App() {
    const [{}, dispatch] = useStateValue();
  
    useEffect(() => {
      // will only run once when the app component loads...
  
      auth.onAuthStateChanged((authUser) => {
        console.log("THE USER IS >>> ", authUser);
  
        if (authUser) {
          // the user just logged in / the user was logged in
  
          dispatch({
            type: "SET_USER",
            user: authUser,
          });
        } else {
          // the user is logged out
          dispatch({
            type: "SET_USER",
            user: null,
          });
        }
      });
    }, []);
return (
  <BrowserRouter>  
    <div className="app">
    <Routes> 
    <Route path="/" element={<><Header /><Home /></>} />
    {/* <Route path="/orders" element={<><Header /><Orders /></>} /> */}
    <Route path="/orders" element={<><Header /><Orders /></>} />
    <Route path="/checkout" element={<><Header /><Checkout/></>} />  
    <Route path="/payment" element={<><Header /> <Elements stripe={promise}>
              <Payment />
            </Elements></>} />
    <Route path="/Login" element={<><Header /><Login/></>} />
     </Routes>
    </div>
  </BrowserRouter>

    
        
          
      
 
);
}
export default App;