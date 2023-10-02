import axios from "axios"
import { useEffect, useState } from "react"
import Logo from "../../Logo"
import displayRazorpay from "./buy"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function StepToBuy(){

    const [address, setAddress] = useState([])

    const location = useLocation()

    const navigate = useNavigate()

    const [products, setProducts] =  useState([])

    const [totalPrice, setTotalPrice] = useState()

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        axios.post("http://localhost:4000/getDefaultaddress",{_id:user._id}, {
            headers:{
                "content-type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=> setAddress(res.data.address))
        .catch(err=> console.log(err))

     
        switch (location.state.case) {
            case "directBuy":
                setProducts([location.state.products])
                setTotalPrice(location.state.products.salePrice)
                console.log("this2")
                break;
            
            case "cartBuy":
                setProducts(location.state.products);
                let x = 0
                location.state.products.map(product=>{
                    x = x + (product.salePrice * product.cartQty )
                    setTotalPrice(x)
                })
            break;
        
            default:
                break;
        }

    },[])

    return(
        <>
        <Logo/>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 mb-3 bg-light">
                    <div>
                       <div className="fw-bold fs-5">Delivery address</div>
                    {address === null
                    ? <Link to={'/account/address'} className="hoverUnderline">Add Address First</Link> 
                    :<div className="address fs-7 my-3 text-secondary flex-column fs-6 px-4 d-flex" style={{ rowGap:".1em"}}>
                    <span>{address.name}</span>
                    <span>{address.flat}</span>
                    <span>{address.landmark}</span>
                    <span>{address.district}, {address.state}, {address.pincode}</span>
                    <span>{address.region}</span>
                    <span>Phone number : {address.mobileNo}</span>
                </div>
                }
                    </div>
                    <div className="px-5"><hr /></div>
                </div>
                {/* delivery address is going to shoe here */}

                <div className="mb-3 bg-light col-sm-12">
                <div className="fw-bold fs-5">Payment</div>
                    {products.map(product=>{
                        return(
                                <>
                            <div className="d-flex flex-column">
                            
                            <div>
                                <span className="text-capital fs-5 text-secondary">{product.name}</span> <span className="ms-2">&#8377;{new Intl.NumberFormat('en-IN').format(product.salePrice)}</span> <span className="fw-bold">{typeof product.cartQty !== "undefined" && <>&times; {product.cartQty}</>}</span>
                            </div>


                            </div>
                                </>
                            )
                    })}
                            <div className="fw-bold mt-3 fs-4 text-success">
                                &#8377;{new Intl.NumberFormat('en-IN').format(totalPrice)}
                            </div>
                            <div>
                            {address===null
                            ? <button className="btn btn-warning my-3" disabled>Pay Now</button>
                            :<button className="btn btn-warning my-3" onClick={()=> displayRazorpay(totalPrice, products, navigate, address)}>Pay Now</button>
                            }
                            </div>
                </div>

            </div>
        </div>
        </>
    )
}