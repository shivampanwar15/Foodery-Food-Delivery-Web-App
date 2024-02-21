import React from 'react'
import Delete from '@material-ui/icons/Delete'
import {loadStripe} from '@stripe/stripe-js';
import { useCart, useDispatchCart } from '../components/ContextReducer';


export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 '>The Cart is Empty!</div>
      </div>
    )
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  const paymentData = {
    "product":[
{
      price : totalPrice,
      qty : data.length,
      Pname : "Food Items"
}
    ]
  
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    
    const stripePromise = await loadStripe(process.env.REACT_APP_PUBLIC_KEY);
  
    try {
      let response = await fetch(`${REACT_APP_DOMAIN}/create-checkout-session`, {
        method: 'POST',
     
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          paymentData, {
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          }
        ])
      });
  
      if (response.status === 500) return;
  
      const SIdata = await response.json();
      console.log("JSON RESPONSE:::::", response.status);
      console.log(SIdata.sessionId);
      // Redirect to Stripe checkout
      const { error } = await stripePromise.redirectToCheckout({ sessionId: SIdata.sessionId });
      
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error during checkout process:', error);
    }
    
    // Note: Avoid dispatching here; handle success in the redirectToCheckout callback
  };
  

  
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md ' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row ' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}