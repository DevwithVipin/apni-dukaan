import React from 'react'
import "./Product.css";
import { useStateValue } from './StateProvider';
import Button from '@mui/material/Button';

function Product({id,title,image,price,rating}) {
    const [{ basket },dispatch] = useStateValue();
    // console.log('this is the basket',basket);
    const addToBasket  = () => {
        dispatch({
            type:'ADD_TO_BASKET',
            item: {
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating,

            },
        });
    };
  return (
    <div className="product">
        <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>Rs.</small>
          <strong>{price*100}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      
      {/* <Button  onClick={addToBasket}>Add to Cart</Button> */}
      <button  onClick={addToBasket}>Add to Cart</button>
        

      
    </div>
  )
}

export default Product;