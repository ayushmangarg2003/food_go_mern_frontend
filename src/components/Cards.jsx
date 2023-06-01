import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Cards = (props) => {

    let dispatch = useDispatchCart();
    const priceRef = useRef();
    let options = props.options;
    let price = Object.keys(options)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    
    const handleAddToCart =async () => {
        await dispatch({type:"ADD" , id:props.foodItem._id, price:finalPrice, name:props.foodItem.name, qty: qty, size: size})
    }

    let finalPrice = qty * parseInt(options[size])
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." 
                style={{"height":"120px" , 'objectFit':"cover"}}/>
                <div className="card-body">
                    <h5 className="card-title text-center">{props.foodItem.name}</h5>
                    <div className='container w-100 text-center'>
                        <select className='text-black m-2 h-100 bg-info rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select ref={priceRef} className='m-2 h-100 text-black bg-info rounded' onChange={(e)=>setSize(e.target.value)}>
                            {price.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                    </div>
                    <hr/>
                    <div className='d-flex justify-content-around align-items-center'>
                        <div>₹{finalPrice}/-</div>
                        <button className="btn btn-info text-black justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Cards
