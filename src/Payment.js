import React, { useContext, useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { getBasketTotal } from './reducer';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { Link } from 'react-router-dom';
// require('dotenv').config();


function Payment() {
    const stripe = useStripe("pk_test_51Nxbg2SBfgUqTL1TciM0oOd6fHCV6OqqXvIE0YoRi4FUCiUeksxoV9iYKmIzunpx0yREUtulPaZr15LImHcD3BPQ00EsWfkVrR");
    const elements = useElements();
    const navigate = useNavigate();

    const [{ basket, user }, dispatch] = useStateValue();
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await fetch(`https://cheerful-plum-barnacle.cyclic.app/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: getBasketTotal(basket) * 100 }),
            });

            const data = await response.json();
            console.log(data)
            if (data.client_secret) {
                setClientSecret(data.client_secret);
            }
               console.log(data.client_secret)
        };

        getClientSecret();
    }, [basket]);
      


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(payload.paymentIntent.id)
                .set({
                    basket: basket,
                    amount: payload.paymentIntent.amount,
                    created: payload.paymentIntent.created,
                });

            dispatch({
                type: 'EMPTY_BASKET',
            });

            navigate('/orders');
        }
    };

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    return (
        <>
        {(!user)?
        <div className='Sign-Out'>
            <div className="full-screen-div"><h2>You are not <Link to="/login"> Sign In</Link></h2></div>
       </div>:
        <div className='payment'>
        <div className='payment__container'>
           <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
            </h1>


            {/* Payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>Boys Hostel-04</p>
                    <p>SLIET Longowal</p>
                </div>
            </div>

            {/* Payment section - Review Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
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
            <div className="payment__section">
                <div className="payment__title">
       <h3>
Payment Window
</h3> 
                </div>
                <div className="payment__details">
             
                    
                    <form >
                        <CardElement onChange={handleChange} />
                        <div className='payment__priceContainer'>
                            
                            <h3>Order Total: INR {getBasketTotal(basket)*100}</h3>
                            <button disabled={processing || disabled || succeeded || (basket.length === 0)} onClick={handleSubmit} className='buy__now'>{processing ? "Processing" : "Pay now"}</button>
                        </div>
                        <div>{error ? error.message : ""}</div>
                    </form>
                    {error && <div>{error}</div>}
                   

               </div>

            </div>
        

               
         
        </div>
    </div>
                    
                    }               
</>
    );
}

export default Payment;
