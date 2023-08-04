import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
    let dispatch = useDispatchCart();
    let FoodItem = props.foodItem || {};
    let options = props.options || {};
    let opt = Object.keys(options);;
    const priceRef = useRef();
    let data = useCart();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");


    const handleAddToCart = async () => {

        if(!localStorage.getItem("authToken")){
             alert("Please Login to Add")
        }
        else{

        
        let food = []
        for (const item of data) {
            if (item.id === FoodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: FoodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: FoodItem._id, name: FoodItem.name, price: finalPrice, qty: qty, size: size })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: FoodItem._id, name: FoodItem.name, price: finalPrice, qty: qty, size: size })
    }
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "450px" , "borderRadius": "2em","boxShadow": "0 5px 10px rgba(0,0,0,.2)"  }}>
                <img src={FoodItem.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill", "borderRadius": "2em"  }} />
                <div className="card-body text-center">
                    <h5 className="card-title "> {FoodItem.name}</h5>
                    <p className="card-text"></p>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-light' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>  {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100  bg-light ' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {opt.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}


                        </select>
                        <hr></hr>
                        <div className='d-inline h-100 fs-5 d-flex justify-content-center'> ₹ {finalPrice}/- </div>
                    </div>
                    <hr></hr>
                   
                    <button className='btn btn-outline-success m5-2' onClick={handleAddToCart}> Add to Cart </button>
                </div>
            </div>
        </div>

    )
}
