import axios from "axios";
import Template from "../template/Template";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import fullfilledLogo from "../../images/fulfilledLogo.png"


function Product({product, setChecked, checked, carts, setFormQty, deleteCart}) {
    const [specKeys, setSpecKeys] = useState([])

    const [specifications, setSpecifications] = useState([])

    const keysForBody = specKeys.slice(0, 4)
    
    const user = JSON.parse(localStorage.getItem("user"))

    const cart = carts.filter(index=>  index.productId === product._id )
    

    useEffect(()=>{
        const x = JSON.parse(product.specifications)
        setSpecifications(x)
        setSpecKeys(Object.keys(x));
        product.cartQty = cart[0]?.qty
    },[])


    const checkboxHandler=(e)=>{
            let updatedList = [...checked];
            const product = JSON.parse(e.target.value)
            product.cartQty = cart[0]?.qty
            if (e.target.checked) {
              updatedList = [...checked, product];
            } else {
               let x = updatedList.filter(item=> item._id !== product._id)
               updatedList = x;
            }
            setChecked(updatedList);
    }


    const qtyHandler=(e)=>{
        setFormQty(e.target.value)
        const bodyData = {userId:user?._id, productId:product._id, qty:e.target.value}
        axios.post("http://localhost:4000/UpdateCartQty", bodyData,{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }


    return(
        <>
        <div key={product._id} className="d-flex flex-row">
                                        { product.qty > 0
                                        ? <input type="checkbox" name="check" value={JSON.stringify(product)}  onChange={checkboxHandler}   />
                                        : <input type="checkbox"  disabled/>
                                        }
                                        {/* input */}
                                        <div className="img w-25 align-self-center p-1 drop-shadow">
                                            <img className="w-100" src={`http://localhost:4000/categoryImages/${product.image}`} alt="" />
                                        </div>
                                        {/* product image */}

                                        <div className="d-flex flex-column w-75 pe-5">
                                        <div className="name fs-4 text-capital">
                                            <Link className="text-decoration-none text-dark hoverUnderline " to={'/product'} state={{ _id:product._id }}>{product.name} {keysForBody.map(k => {
                                    return (
                                        <span className="fs-5" key={k}> ({specifications[k]}) </span>
                                    )
                                })}</Link> 
                                        </div>
                                        
                                            

                                            <div className="pricing d-flex flex-column mt-2">
                                <span>
                                <span className="saleTag me-2">- {Math.round(100-(product.salePrice/product.price)*100)} %</span>
                                    <span className="fw-bold fs-6">&#8377;{new Intl.NumberFormat('en-IN').format(product.salePrice)}</span>
                                </span>
                                <span className="text-secondary my-2">M.R.P. <del className="text-secondary">&#8377;{new Intl.NumberFormat('en-IN').format(product.price)}</del></span>
                                <span className="text-capital fs-7">
                                    Inclusive of all taxes
                                </span>
                            </div>
                            {/* pricing */}



                            <span className="my-2"><img width={"70px"} height={"20px"} style={{ objectFit: "contain" }} src={fullfilledLogo} alt="" /></span>
                            {  /* fullfied logo */}


                            <div className="text-secondary fw-bold fs-7">
                            Eligible for FREE Shipping
                            </div>
                            {/* eligble */}


                            <div className="fs-5 mt-1 text-capital text-success ">
                                        {product.qty > 0 
                                        ? <div className="d-flex flex-column">
                                            <span>in stock</span>                                        
                                          </div> 
                                        : <span className="text-danger">out of stock</span> }
                                    </div>
                                    {/* stock status*/}
                                    <div className="fs-7 mt-1 text-capital d-flex flex-row delete">
                                    <div className="d-flex align-items-center">
                            <select className="btn w-100 bg-light" value={product.qty} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }} onChange={qtyHandler}>
                                <option className="text-success" value={cart[0]?.qty} >Qty : {cart[0]?.qty} </option>
                                <option value="1">Qty : 1</option>
                                <option value="2">Qty : 2</option>
                                <option value="3">Qty : 3</option>
                                <option value="4">Qty : 4</option>
                                <option value="5">Qty : 5</option>
                                <option value="6">Qty : 6</option>
                                <option value="7">Qty : 7</option>
                                <option value="8">Qty : 8</option>
                                <option value="9">Qty : 9</option>
                                <option value="10">Qty : 10</option>
                                </select>
                        </div>
                                            <Link onClick={()=>deleteCart(product._id)} className="align-self-center ms-3 text-decoration-none text-amazon hoverUnderline">delete</Link>
                                        </div>

                            </div>
                            {/* details */}

                                        

        </div>
                            <hr />
                            </>
    )
}

export default function Cart() {

    const [formQty, setFormQty] = useState('')

    const [cartProducts, setCartProducts] = useState([])
        
    const user = JSON.parse(localStorage.getItem("user"))
    
    let initial = 0;

    const Navigate = useNavigate()
    
    const cartPrice = useRef(0)
    
    const [carts, setCarts] = useState([])

    useEffect(()=>{
        if (user === null) {
            Navigate('/loginFirstPage')   
           }else{
        axios.post("http://localhost:4000/getCartProductsArray",{_id:user?._id},{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res => setCartProducts(res.data.cartProducts))
        .catch(err => console.log(err))

        axios.post("http://localhost:4000/getCarts",{userId:user?._id},{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        } )
        .then(res => setCarts(res.data.carts))
        .catch(err => console.log(err))
    }
    },[formQty])

    const [checked, setChecked] = useState([])

    const deleteCart = (productId)=>{
        const bodyData = {userId:user?._id, productId:productId}
        axios.post("http://localhost:4000/deleteCart",bodyData,{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=>{ if (res.data.status) {
            setFormQty(formQty+1)
        }})
        .catch(err=> console.log(err))
    }

    return (
        <Template>
            <div style={{ backgroundColor:"#eaeded" }}>
            <div className="container-fluid">
                <div className="row p-4 px-2">
                    <div className="col-sm-9 bg-white p-2">
                        <div className="header">
                            <div className="fs-3">Shopping Cart</div>
                            <Link className="text-capital text-amazon text-decoration-none hoverUnderline">{cartProducts.length} {cartProducts.length > 1 ? `Products` : `Product`} In Your Cart</Link>
                        </div>
                        {/* header ends */}
                        <hr/>
                        <div className="cartProducts">
                            {cartProducts.map(product=>{
                                return(
                                    <Product key={product._id} deleteCart={deleteCart} cartProducts={cartProducts} product={product} setChecked={setChecked} checked={checked} carts={carts} setFormQty={setFormQty} />
                                )
                            })}
                        </div>
                    </div>
                    {/* left side ends here */}

                    <div className="col-sm-3 ">
                            {checked.length > 0  
                            ?<>{checked.map(product=>{
                                    const cart = carts.filter(index=>  index.productId === product._id )
                                    const qty = cart[0]?.qty
                                    initial = parseInt(initial) + parseInt(product.salePrice*qty)
                                    cartPrice.current = initial
                                })}
                                    <div className="bg-white p-3 d-flex flex-column StickyTop">
                                    <div className="fs-5">Subtotal ({checked.length} {checked.length === 1 ? `item` : `items`} ): &#8377;{new Intl.NumberFormat('en-IN').format((cartPrice.current))}</div>
                                    <Link to={'/steptobuy'} state={{ products:checked, case:"cartBuy"}} className="text-capital btn-warning py-1 fs-7 my-2 text-center btn rounded focus-outline">proceed to buy</Link>
                                    </div>
                                    </>
                            : <div className="h3 bg-white p-3 d-flex flex-column StickyTop">
                                <div>No items selected</div>
                                <Link onClick={()=> alert('Please select at least one item to Checkout')} className="text-capital btn-warning py-1 fs-7 my-2 text-center btn rounded focus-outline">proceed to buy</Link>

                                </div>
                        }
                    </div>
                    {/* right side ends here */}
                </div>
                {/* row ends here */}
            </div>
            {/* conatiner-fluid ends here */}
            </div>
        </Template>
    )
}