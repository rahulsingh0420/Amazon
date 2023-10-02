import axios from "axios"
import { useEffect, useState } from "react"
import { Link,useLocation, useNavigate } from "react-router-dom"
import Template from "../template/Template"
import fullfilledLogo from "../../images/fulfilledLogo.png"
import freeDelivery from "../../images/free_delivery_logo.png"
import delivered from "../../images/icon-amazon-delivered.png"
import returns from "../../images/icon-returns.png"
import topBrand from "../../images/icon-top-brand.png"
import warranty from "../../images/icon-warranty.png"
import securePayment from "../../images/Secure-payment.png"
import React, { Component } from "react";
import Slider from "react-slick";
import SuccessBanner from "../../admin/component/SuccessBanner"

export default function Product() {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} slideBtn`}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} slideBtn`}
                style={{ ...style, display: "block", }}
                onClick={onClick}
            />
        );
    }

    const cartProduct = ()=>{
        const productId = product._id
        const userId = JSON.parse(localStorage.getItem("user"))._id
        const data = {productId:productId, userId:userId} 
        axios.post("http://localhost:4000/cartProduct", data,{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=>{ if (res.data.status) {
            setCarted(true)
        }})
        .catch(err=> console.log(err))
    }

    const navigate = useNavigate()

    const location = useLocation()

    const params = location.state

    const [carted, setCarted] = useState(false)

    const [product, setProduct] = useState([])

    const [specifications, setSpecifications] = useState([])

    const [specKeys, setSpecKeys] = useState([])

    const keysForHeader = specKeys.slice(0, 4)

    const settings = {
        accessibility: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    useEffect(() => {

        if (params === null) {
            navigate('/')
        }

        axios.post("http://localhost:4000/getproduct", { _id: params._id }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                setProduct(res.data.product)
                const x = JSON.parse(res.data.product.specifications)
                setSpecifications(x)
                setSpecKeys(Object.keys(x))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Template>
            
            <div className="container-fluid mt-4">
                <div className="row justify-content-around">
                    <div className="d-flex justify-content-center col-sm-12 col-md-4">
                        <div>
                            <img className="StickyTop w-100 drop-shadow" height={"400px"} style={{ objectFit: "contain" }} src={`http://localhost:4000/categoryImages/${product.image}`} alt={product.name} />
                        </div>
                    </div>
                    {/* left side div */}
                    <div className="col-sm-12 col-md-4">
                        <div className="d-flex pt-4 flex-column ">

                            <div className="name h3 text-capital">
                                {product.name} {keysForHeader.map(k => {
                                    return (
                                        <span className="fs-5"> ({specifications[k]}) </span>
                                    )
                                })}
                            </div>
                            {/* name */}
                            <hr />
                            <div className="pricing d-flex flex-column">
                                <span>
                                    <span style={{ color: "#CC0C39" }} className="ms-2 fs-5">-{Math.round(100 - (product.salePrice / product.price) * 100)}%  </span>
                                    <span className="text-success fs-4">&#8377;{new Intl.NumberFormat('en-IN').format(product.salePrice)}</span>
                                </span>
                                <span className="text-secondary">M.R.P. <del className="text-secondary">&#8377;{new Intl.NumberFormat('en-IN').format(product.price)}</del></span>
                                <span className="my-2"><img width={"70px"} height={"20px"} style={{ objectFit: "contain" }} src={fullfilledLogo} alt="" /></span>
                                <span className="text-capital fs-7">
                                    Inclusive of all taxes
                                </span>
                            </div>
                            {/* pricing */}

                            <hr />
                            <Slider {...settings}>

                                <div className="d-flex flex-column justify-content-center">
                                    <img className="align-self-center" src={freeDelivery} width={"35px"} height={"35px"} style={{ objectFit: "contain" }} />
                                    <div style={{ fontSize: "12px", color: "#007185 " }} className="text-center text-capital"> Free Delivery </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <img className="align-self-center" src={returns} width={"35px"} height={"35px"} style={{ objectFit: "contain" }} />
                                    <div style={{ fontSize: "12px", color: "#007185 " }} className="text-center text-capital"> 7 days Replacement </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <img className="align-self-center" src={warranty} width={"35px"} height={"35px"} style={{ objectFit: "contain" }} />
                                    <div style={{ fontSize: "12px", color: "#007185 " }} className="text-center text-capital"> Warranty Policy  </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <img className="align-self-center" src={topBrand} width={"35px"} height={"35px"} style={{ objectFit: "contain" }} />
                                    <div style={{ fontSize: "12px", color: "#007185 " }} className="text-center text-capital"> Top Brand  </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <img className="align-self-center" src={delivered} width={"35px"} height={"35px"} style={{ objectFit: "contain" }} />
                                    <div style={{ fontSize: "12px", color: "#007185 " }} className="text-center text-capital"> Amazon Delivered  </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <img className="align-self-center" src={securePayment} width={"35px"} height={"35px"} style={{ objectFit: "contain" }} />
                                    <div style={{ fontSize: "12px", color: "#007185 " }} className="text-center text-capital"> Secure transaction </div>
                                </div>
                            </Slider>
                            {/* slider */}
                            <hr />
                            <div className="flex-column w-100 d-flex" style={{ rowGap: "1.4em" }}>
                                {specKeys.map(k => {
                                    return (
                                        <div className="d-flex justify-content-between flex-row w-100">
                                            <span className="fs-7 fw-bold w-50">{k}</span>
                                            <span className="fs-7 ms-2 w-100">{specifications[k]}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* specifications */}
                            <hr />
                            { typeof product.discription !== "" &&
                                <div className="d-flex flex-column">
                                    <div className="header fs-6 text-decoration-underline">Product Discription</div>
                                    <div className="text-secondary fs-7" style={{ lineHeight:"1.5em" }}>
                                        {product.discription}
                                    </div>
                                </div>
                            }


                        </div>
                    </div>
                    {/* middle  div */}
                    <div className="col-md-4 col-sm-12 p-x-sm-0 p-md-5 pe-md-2 pt-md-0 mb-4">
                            <div className="StickyTop">
                    {carted=== true && <SuccessBanner msg={"Product Carted Successfully"} case={"cart"} />}
                            <div className="d-flex flex-column card" style={{ border:"none", outline:"none", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }} >
                                <div style={{ backgroundColor:"#f3f3f3",  border:"none", outline:"none" }} className="card fs-5 fw-bold p-3 header">
                                    Time to take it
                                </div>
                                {/* header */}
                                <div className="p-3">
                                    <span className="text-capital fw-bold">
                                        Special Price
                                    </span>
                                    <span className="d-flex fw-bold flex-row my-2">
                                        <span>
                                            <span style={{ color:"#B12704" }} className="fw-bold fs-6">&#8377;{new Intl.NumberFormat('en-IN').format(product.salePrice)}</span>
                                        </span>
                                        <span className="text-secondary ms-2"><del className="text-secondary">&#8377;{new Intl.NumberFormat('en-IN').format(product.price)}</del>
                                        </span>
                                    </span>
                                    {/* pricing */}

                                    <span className="my-2">
                                        <img width={"70px"} height={"20px"} style={{ objectFit: "contain" }} src={fullfilledLogo} alt="" />
                                    </span>
                                    {/* fullfilled logo */}

                                    <div style={{ color:"#007185", cursor:"pointer" }}  className="hoverUnderline">
                                        FREE delivery
                                    </div>
                                    {/* free delivery */}

                                    <div className="d-flex flex-column">
                                    <div className="py-2">
                                    Order within 6 mins. <span className="text-success">Details</span>
                                    </div>
                                    <span style={{ color:"#007185", cursor:"pointer" }} className="hoverUnderline">Details</span>
                                    </div>
                                    {/* order time */}

                                    <div className="my-3">
                                        <i className="fa-solid fa-location-dot"></i> {JSON.parse(localStorage.getItem("address")).Name} {JSON.parse(localStorage.getItem("address")).Pincode} {JSON.parse(localStorage.getItem("address")).DeliveryStatus !== "Delivery" && <span className="text-danger">Not deliverable</span> }  
                                    </div>
                                    {/* location */}


                                    <div className="fs-5 text-capital text-success ">
                                        {product.qty > 0 
                                        ? <div className="d-flex flex-column">
                                            <span>in stock</span>
                                            { localStorage.getItem("user") !== null    
                                            ?<div className="d-flex mt-3 flex-column" style={{ rowGap:"0.7em" }}>
                                                <Link onClick={cartProduct}  className="btn btn-warning rounded-pill py-1 fs-7 focus-outline"> Add To Cart </Link>
                                                <Link to={'/steptobuy'} state={{ products:product, case:"directBuy"}} className="btn btn-warning rounded-pill py-1 focus-outline btnBuy fs-7"> Buy Now </Link>
                                            </div>
                                            :<span className="py-2 mt-2">
                                            <Link to="/loginFirstPage" className="w-100 btn btn-warning py-1" style={{ fontSize:"13px", borderRadius:"10px" }}>Sign in to Buy</Link>
                                            </span>    
                                        }
                                        {/* add cart or buy now buttons */}

                                            <div className="transaction mt-1">
                                            <i className="fa-solid fa-lock text-secondary fs-6"></i> <span style={{ color:"rgb(0, 113, 133)" }} className="ms-1 fs-6">Secure transaction</span>
                                            </div>
                                        
                                          </div> 
                                        : <span className="text-danger">out of stock</span> }
                                    </div>
                                    {/* stock status*/}

                                </div>
                                {/* body of add cart or buy card  */}
                            </div>
                            {/* card ends here */}
                            </div>
                    </div>
                    {/* right side div */}
                </div>
            </div>

        </Template>
    )

}