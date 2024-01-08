import React from 'react';
import './Order.css';
import moment from 'moment';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Order({ order }) {
  const [{ user }] = useStateValue();
  console.log(order)

  if (!order || !order.data) {
    // Handle the case where order or order.data is undefined
    return null;
  }

  return (
    <div className='order'>
      <p>{moment.unix(order?.data?.created).format('MMMM Do YYYY, h:mma')}</p>
      <p className='order__id'>{order.id}</p>
      {order?.data.basket?.map(item => (
        <CheckoutProduct
          key={item.id} // Add a unique key for each CheckoutProduct component
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      {/* You can display order total here if needed */}
      <h3 className='order__total'>
        Order Total: ₹{order?.data?.amount / 100}
      </h3>
    </div>
  );
}

export default Order;
