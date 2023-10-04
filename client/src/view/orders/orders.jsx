import axios from "axios"
import { useEffect, useState } from "react"
import Template from "../template/Template"
import { Link, useNavigate } from "react-router-dom"

export default function Orders(){

    const [orders, setOrders] = useState([])  
    const Navigate = useNavigate()

    useEffect(()=>{
        const userData = localStorage.getItem("user")

        if (userData === null) {
            Navigate('/loginFirstPage')   
           }else{


        axios.post("http://localhost:4000/getUserOrders", {userId: JSON.parse(localStorage.getItem('user'))._id},{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=> setOrders(res.data.orders))
        .catch(err=> console.log(err))
        }
    },[])

    return(
        <Template>
            <>
                            <div className="mx-5 mt-4 fs-3 headers">
                                    Your Orders
                            </div>

                {orders.length === 0 && <h1 className="text-secondary fw-light text-center">No Orders Yet</h1>  }


                <div className="container mt-3">
                    <div className="row">
                        <div className="col-sm-12">
                            {orders.map(order=>{
                                return(
                                    <>
                                    <div className="d-flex text-secondary flex-column ">
                                        <span className="d-flex text-capital">
                                            {order.products.map(product=>{
                                                return(<Link to={'/product'} state={{ _id: product._id }}><img className="drop-shadow" src={`http://localhost:4000/categoryImages/${product.image}`} width={"100px"} alt="" /></Link>)
                                            })}
                                        </span>
                                        <div className="d-flex flex-column mt-2">
                                        <span>Payment Id : <span className="text-dark">{order.paymentId}</span></span>
                                            <span>orderPrice : &#8377;<span className="fs-5 text-success fw-bold">{new Intl.NumberFormat('en-IN').format(order.orderPrice)}</span></span>
                                            <span className="fw-bold text-capital">Status : <span className="text-success" style={{ fontWeight: "normal" }}>{order.status    }</span></span>
                                            <span className="text-secondary">Date Placed : {order.day}/{order.month}/{order.year}</span>
                                            <span className="text-secondary">Time: {order.hours}<span className="fw-bold">:</span>{order.minute}<span className="fw-bold">:</span>{order.seconds} {order.hours > 11 ? <span className="fw-bold">PM</span> : <span className="fw-bold">AM</span>} </span> 
                                             
                                        </div>
                                    </div>
                                    <hr />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        </Template>
    )
}