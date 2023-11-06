import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import { Link } from "react-router-dom";

export function Orders() {
  const [{  user }] = useStateValue();
  const [orders, setOrders] = useState(null);
  // Reading data from a document
const getUserDataFromFirestore = (userId) => {
    db.collection("users").doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log("User data: ", userData);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting user data: ", error);
      });
  };
  

  useEffect(() => {
    console.log("useEffect is called")
    
    if (user) {
        db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );      
    } else {
      setOrders(null);
    }
  }, [user]);
  console.log("Order:", orders);
  return (
    (!user)?<div className="full-screen-div"><h2>You are not <Link to="/login">Sign IN</Link>, Please Sign In</h2></div>:
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
    orders?.map((order) => (
    <Order key={order.id} order={order} />
  ))

        ))}
      </div>
    </div>
  );
}

export default Orders;
