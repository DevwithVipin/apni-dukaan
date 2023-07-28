import react from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct"
import { useStateValue } from "./StateProvider"
 
function Checkout () {
    const [ {basket} ,dispatch ] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout-left">
            <div className="checkout-ad" >
                    <img src="https://img.etimg.com/thumb/msid-94157539,width-650,height-488,imgsize-122768,,resizemode-75/amazon-kickstarter-deals.jpg"/>
</div>
                
                <div className="checkout-title">
                    <h1>This is my checkout page</h1>
                    
                    {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}

                    
                    

                </div>
            </div>
            <div className="checkout-right">
                <Subtotal/>

            </div>
        </div>
    )
}
export default Checkout;