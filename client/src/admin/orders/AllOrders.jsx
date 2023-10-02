import { useEffect, useState } from "react";
import AdminTemplate from "../template/AdminTemplate";
import axios from "axios";
import { Link } from "react-router-dom";


function Status({status, setStatus, order}){
 
    useEffect(()=>{
        setStatus(order.status)
    },[])

    const changeStatus=(e)=>{
        axios.post("http://localhost:4000/changeDeliveryStatus",{_id:order._id,status:e.target.value}, {
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=>{if (res.data.status) {
            setStatus(e.target.value)
        }})
        .catch(err=> console.log(err))
    }

    return(
        <select name="status" className="form-control" onChange={changeStatus} defaultValue={status} id="status">
            <option value="placed">Placed</option>
            <option value="dispatched">Dispatched</option>
            <option value="onway">On the way</option>
            <option value="delivered">Delivered</option>
        </select>
    )
}

export default function AllOrders(){

    const [AllOrders, setAllOrders] = useState([])

    const [orders, setOrders] = useState([])

    const [status, setStatus] = useState([])

    useEffect(()=>{
        axios.post("http://localhost:4000/getAllOrders",{
            headers:{
                "content-type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=>{
            setAllOrders(res.data.orders)
            const thisPage = 1
            let startIndex =( thisPage-1)*recordPerPage
            let endIndex = (thisPage)*recordPerPage
            let x = res.data.orders.slice(startIndex, endIndex )
            setOrders(x)
        } )
        .catch(err => console.log(err))
    },[])

    const recordPerPage = 4

    const [CurrentPage, setCurrentPage] = useState(1)

    const nbPages = Math.ceil(AllOrders.length/recordPerPage)
    
    const pagination = (thisPage)=>{
        let startIndex =( thisPage-1)*recordPerPage
        let endIndex = (thisPage)*recordPerPage
        let x = AllOrders.slice(startIndex, endIndex )
        setOrders(x)
    }

    const changePage = (event)=>{
        switch (event) {
            case "prev":
                if (CurrentPage > 1) {
                setCurrentPage(CurrentPage - 1)
                const thisPage = CurrentPage-1
                pagination(thisPage);
                }
                break;
        
                case "next":
                    if (CurrentPage < nbPages) {
                    setCurrentPage(CurrentPage + 1)
                    const thisPage = CurrentPage+1
                    pagination(thisPage);
                    }
                    break;

            default:
                break;
        }
    }

    return(
        <AdminTemplate>


<div className="container">
                <div className="row">
                    <div className="p-3 text-center col-sm-12">
                        <h1 style={{
                            color: "#e47911", fontFamily: "sans-serif", textShadow: " 2px 3px 5px rgba(0,0,0,0.6)"
                        }} className="fw-bold"> <i className="fa-solid fa-user"></i> Total {AllOrders.length} Orders In amazon.in</h1>
                    </div>
                </div>
            </div>
{/* number of found records heading */}


      <div className="container">
        <div className="row">
{orders.map(order=>{
    return(
            <div key={order._id} className="p-3 col-sm-12">
                <div className="d-flex flex-column card p-3">
                    <div className="img">
                        {order.products.map(product=>{
                            return(
                                <Link key={product._id} to={'/product'} state={{ _id:product._id }}>
                                    <img width={"70px"} height={"70px"} className="drop-shadow" style={{ objectFit:"contain" }} src={`http://localhost:4000/categoryImages/${product.image}`} alt="" />
                                </Link>
                            )
                        })}
                    </div>
                    {/* images */}

                    <div className="Orderdetails text-secondary">
                                        <div className="d-flex flex-column mt-2">
                                        <span>Payment Id : <span className="text-dark">{order.paymentId}</span></span>
                                            <span>orderPrice : &#8377;<span className="fs-5 text-success">{new Intl.NumberFormat('en-IN').format(order.orderPrice)}</span></span>
                                            <Status status={status} setStatus={setStatus} order={order} />

                                        <div className="userID">
                                            UserId : {order.userId}
                                        </div>

                                        <div className="userID">
                                            OrderId : {order.orderId}
                                        </div>

                                        <div className="userID">
                                            Database OrderId : {order._id}
                                        </div>

                                        </div>
                    </div>

                </div>
            </div>
    )
})}
</div>
</div> 



<div className="container">
            <div className="justify-content-center row">
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button onClick={ ()=> changePage("prev")  } style={{ borderRadius:"7px", outline:'none', border:"1px solid #D5D9D9", color:"rgb(131, 131, 131)" }} className="bg-white p-2 me-2" ><i className="me-2 fa-solid fa-backward"></i>Prev</button>
                    <span className="fw-bold"><span style={{ color:"#e47911" }}>{CurrentPage}</span> / <span style={{ color:"#febd69" }} >{nbPages}</span> </span>
                    <button onClick={ ()=> changePage("next") } style={{ borderRadius:"7px", outline:'none', border:"1px solid #D5D9D9", color:"rgb(131, 131, 131)" }} className="bg-white p-2 ms-2" >Next<i className="ms-2 fa-solid fa-forward"></i></button>
                </div>
            </div>
        </div>
{/* pagination */}


        </AdminTemplate>
    )
}