import Template from "../template/Template";
import Orders from "../../images/orders.png"
import { Link, useNavigate } from "react-router-dom";
import security from "../../images/security.png"
import prime from "../../images/Prime.png"
import address from "../../images/address.png"
import payment from "../../images/payment.png"
import contact from "../../images/contact.png"
import { useEffect, useState } from "react";





function PageLinks({linkName, img, discription, link}) {
    return(
        <div className="p-3 col-sm-12 col-md-6 col-lg-4">
        <Link to={link} className="hoverGray text-decoration-none  align-items-center d-flex flex-row py-2 card p-3">
        <div className="Linkimg">
                <img width={"80px"} height={"80px"} style={{ objectFit:"contain" }} src={img} alt={linkName} />
            </div>
            {/* image */}
            <div className="Linkdetails ms-2 h5 d-flex flex-column">
                <div className="link">
                    {linkName}
                </div>
                <div className="pt-1 fs-6 discription">
                    {discription}
                </div>
            </div>
            {/* details */}
        </Link>

        </div>
    )
}

export default function Account (){
    const Navigate = useNavigate()


    const userData = localStorage.getItem("user")
    useEffect(()=>{
        if (userData === null) {
         Navigate('/loginFirstPage')   
        }
    },[userData, Navigate])
    return(
        <Template>
            <>
            <div className="container"><h3 className="my-3 ms-2">Your Account</h3></div>
            <div className="container">
               <div className="row">
               <PageLinks linkName="Your Orders" link={'orders'} img={Orders} discription="Track, return, or buy things again" />
                <PageLinks linkName="Login & security" link={'security'} img={security} discription="Edit login, name, and mobile number" />
                <PageLinks linkName="Prime" link={''} img={prime} discription="View benefits and payment settings" />
                <PageLinks linkName="Your Addresses" link={'address'} img={address} discription="Edit addresses for orders and gifts" />
                <PageLinks linkName="Contact Us" link={'/contact'} img={contact} discription="" />
                {/* Page Links Ends Here */}
               </div>
            </div>
            </>
        </Template>
    )
}