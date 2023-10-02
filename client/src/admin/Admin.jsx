import { useEffect } from "react";
import axios from "axios";
import { Link, NavLink, Navigate } from "react-router-dom";
import AdminTemplate from "./template/AdminTemplate";


function PageLinks({link,icon, name, discription }) {
    return(

            <NavLink to={link} className="shadow hoverGray card text-decoration-none p-5 d-flex flex-row justify-content-around align-items-center">
        <div className="icon w-25 text-center text-amazon h1 drop-shadow">
            <i className={icon}></i>
        </div>
        <div className="d-flex w-75 flex-column">
        <div className="name h1 text-capital fw-bold" style={{ color:"#ff9900", fontFamily:"cursive" }}>
            {name}
        </div>
        <div className="text-secondary text-capital">
            {discription}
        </div>
        </div>
        </NavLink>


    )
}



export default function Admin(){


    const user = JSON.parse(localStorage.getItem('user'))

    const logout = () => {
        localStorage.removeItem('user')
        Navigate('/loginFirstPage')
    }


    return(
        <AdminTemplate>
           
        <div className="h5 p-2 d-md-flex justify-content-between" style={{ backgroundColor:"rgb(75,76,77)" }}>
            <div>
                {user !== null && <Link to='/loginFirstPage' onClick={logout} className="fw-bold text-white hoverUnderline text-decoration-none">Sign out <i class="fa-solid text-white hoverUnderline fa-person-walking-luggage"></i></Link>
                                } 
            </div>
            <div className="text-white text-capital mt-1 h6">
               hello {user?.name} the amazon's admin  
            </div>
        </div>


            <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 p-3">
                               <PageLinks link={'/admin'} discription={'Home Page Of Amazon Admin Panel'} name={'admin page'} icon={'fa-solid fa-gears'} /> 
                            </div>
                            <div className="col-sm-12 col-md-6 p-3">
                               <PageLinks icon={'fa-solid fa-user'} discription={'manage users of amazon, edit, delete etc.'} name={'users'} link={'/users'} />
                            </div>
                            <div className="col-sm-12 col-md-6 p-3">
                               <PageLinks icon={'fa-solid fa-star'} discription={'manage categories at amazon edit, delete  or add new categories etc.'} name={'categories'} link={'/categories'} />
                            </div>
                            <div className="col-sm-12 col-md-6 p-3">
                               <PageLinks icon={'fa-solid fa-briefcase'} discription={'manage orders of amazon edit, their status or see orders list etc.'} name={'orders'} link={'/allorders'} />
                            </div>
                        </div>
                        </div>

                        <div className="ps-3">
                                
                            </div>
                            {/* sign out button */}

        </AdminTemplate>
    )
}