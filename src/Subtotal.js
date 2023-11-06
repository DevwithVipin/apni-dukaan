
import { useStateValue } from './StateProvider';
import { getBasketTotal } from "./reducer";
import { useNavigate } from 'react-router-dom';


import "./Subtotal.css";
function Subtotal() {
    const navigate = useNavigate();
    const [{ basket },dispatch] = useStateValue();

    return (
        <div className="subtotal">
           
                 <div className='subtotal__amount'>Subtotal ({basket.length} items): <strong>INR {getBasketTotal(basket)*100}</strong></div>
                    <div className='subtotal__checkbox'>
                        <input type='checkbox' />This order contains a gift
                    </div>
             <button className="checkout-button" onClick={e => navigate('/payment')}>Proceed to checkout</button>

            

        </div>
    )

}
export default Subtotal;