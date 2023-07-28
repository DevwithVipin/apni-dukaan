import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from "./reducer";

import "./Subtotal.css";
function Subtotal() {
    const [{ basket },dispatch] = useStateValue();

    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value)=>(
                <>
                <p>
                    Subtotal ( {basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal-gift">
                    <input type="checkbox" />
                    Contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"$"}
             />
             <button className="checkout-button">Proceed to checkout</button>

            

        </div>
    )

}
export default Subtotal;