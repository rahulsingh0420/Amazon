import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import { useEffect, useState } from "react";

export default function Navbar(){

    const Navigate = useNavigate();

    const[showModal, setModal] = useState(false)

    const [zipCodes, setZipCode ] = useState(null)

    const [searchInput, setSearchInput] = useState('')
    
    const [searchCategory, setSearchCategory] = useState('all')

    const[InputZip, setInputZip] = useState('')
    
    const ZipHandler = (e)=>{
        setInputZip(e.target.value)
    }

    const ZipSubmitHandler = (e)=>{
        e.preventDefault()
        axios.get(`https://api.postalpincode.in/pincode/${InputZip}`)
        .then(res=> res.data[0].Status === "Success" && setZipCode(res.data[0].PostOffice) )
        .catch(err=> console.log(err))
    }

    const [categories, setCategories] = useState([])
    
    const [cartProducts, setCartProducts] = useState([])

    const logout = ()=>{
        localStorage.removeItem("user")
        Navigate('/loginFirstPage')
    }
    
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
        axios.post("http://localhost:4000/getCartProducts",{_id:user?._id},{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res => setCartProducts(res.data.cartProducts))
        .catch(err => console.log(err))

        axios.get("http://localhost:4000/getcategories?search=")
        .then(res=> setCategories(res.data.categories))
        .catch(err=>console.log(err))
    },[])

    const searchSubmitHandler = (e)=>{
        e.preventDefault()
        Navigate('/search', { state: { categoryId: searchCategory, search: searchInput }});
    }

    const searchInputHandler = (e)=>{   
        setSearchInput(e.target.value)
    }

    return(
        <>
        {showModal === true && <Modal data="zipCode" setZipCode={setZipCode} zipCodes={zipCodes} ZipHandler={ZipHandler} ZipSubmitHandler={ZipSubmitHandler} setModal={setModal} />}

        <div style={{ backgroundColor:"#131921" }} className="py-1 container-fluid">
            <div className="row">
                <div className="col-sm-12 d-flex flex-column align-items-center" style={{ position:"relative" }}>

                <div className="d-flex flex-row justify-content-between w-100">

                <div className="d-flex flex-row justify-content-around w-50">
                <Link to='/'>
                    <span  className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="px-1 hoverWhiteBorder" width="8em" height="5em" viewBox="7.082 7.081 957.518 181.5" id="amazoncom"><path fill="#f90" d="M380.724 149.019c-34.999 25.798-85.729 39.562-129.406 39.562-61.243 0-116.377-22.652-158.088-60.325-3.277-2.962-.341-7 3.592-4.692 45.015 26.189 100.673 41.947 158.166 41.947 38.774 0 81.43-8.023 120.65-24.671 5.925-2.517 10.88 3.879 5.086 8.179"></path><path fill="#f90" d="M395.275 132.372c-4.457-5.715-29.573-2.701-40.847-1.363-3.434.42-3.958-2.569-.865-4.719 20.004-14.079 52.827-10.016 56.655-5.297 3.827 4.746-.996 37.648-19.794 53.352-2.884 2.412-5.637 1.127-4.352-2.07 4.222-10.54 13.686-34.162 9.203-39.903"></path><path fill="#ccc" d="M355.216 26.901V13.216c0-2.071 1.573-3.46 3.46-3.46h61.27c1.966 0 3.539 1.416 3.539 3.46v11.719c-.026 1.966-1.678 4.536-4.614 8.599l-31.749 45.329c11.798-.289 24.251 1.468 34.947 7.498 2.412 1.363 3.067 3.356 3.251 5.322v14.603c0 1.992-2.202 4.326-4.509 3.119-18.851-9.883-43.888-10.958-64.729.105-2.124 1.154-4.353-1.153-4.353-3.146V92.496c0-2.229.026-6.03 2.255-9.412l36.782-52.749h-32.011c-1.967 0-3.539-1.389-3.539-3.434M131.717 112.29h-18.641c-1.782-.131-3.198-1.469-3.329-3.172V13.452c0-1.914 1.6-3.434 3.592-3.434h17.382c1.809.078 3.251 1.468 3.382 3.198v12.505h.341c4.535-12.086 13.056-17.723 24.539-17.723 11.666 0 18.955 5.637 24.198 17.723 4.509-12.086 14.76-17.723 25.745-17.723 7.812 0 16.359 3.225 21.576 10.46 5.898 8.049 4.692 19.741 4.692 29.992l-.025 60.377c0 1.914-1.6 3.461-3.592 3.461h-18.614c-1.861-.131-3.355-1.626-3.355-3.461V58.125c0-4.037.366-14.104-.524-17.932-1.39-6.423-5.559-8.232-10.959-8.232-4.509 0-9.229 3.015-11.143 7.839-1.913 4.824-1.729 12.898-1.729 18.325v50.704c0 1.914-1.6 3.461-3.592 3.461h-18.614c-1.888-.131-3.355-1.626-3.355-3.461l-.026-50.704c0-10.67 1.757-26.374-11.483-26.374-13.396 0-12.872 15.311-12.872 26.374v50.704c-.003 1.914-1.602 3.461-3.594 3.461M476.232 7.999c27.659 0 42.629 23.752 42.629 53.955 0 29.179-16.543 52.329-42.629 52.329-27.16 0-41.947-23.752-41.947-53.351 0-29.784 14.971-52.933 41.947-52.933m.157 19.531c-13.737 0-14.603 18.719-14.603 30.385 0 11.693-.184 36.651 14.445 36.651 14.445 0 15.127-20.134 15.127-32.404 0-8.075-.341-17.723-2.778-25.378-2.097-6.659-6.266-9.254-12.191-9.254M554.725 112.29h-18.562c-1.861-.131-3.355-1.625-3.355-3.461l-.026-95.691c.157-1.756 1.704-3.12 3.592-3.12h17.277c1.625.078 2.962 1.18 3.329 2.674V27.32h.341c5.217-13.082 12.531-19.322 25.404-19.322 8.363 0 16.517 3.015 21.76 11.273 4.876 7.655 4.876 20.528 4.876 29.782v60.22c-.209 1.678-1.756 3.016-3.592 3.016h-18.692c-1.704-.131-3.119-1.39-3.303-3.016V57.312c0-10.46 1.205-25.771-11.667-25.771-4.535 0-8.704 3.041-10.775 7.655-2.621 5.846-2.962 11.667-2.962 18.116v51.516c-.026 1.915-1.652 3.462-3.645 3.462M621.028 104.686c0-4.824 4.116-8.704 9.176-8.704s9.176 3.879 9.176 8.704c0 4.798-4.116 8.73-9.176 8.73s-9.176-3.932-9.176-8.73M818.519 112.315c-1.94-.078-3.461-1.572-3.461-3.46V13.189c.105-1.704 1.547-3.041 3.33-3.146h6.843c1.888 0 3.408 1.363 3.565 3.146v13.947c4.876-11.063 13.947-19.715 25.404-19.715h1.389c12.165 0 21.053 8.966 24.355 21.996 5.165-12.873 14.865-21.996 27.659-21.996h1.416c9.045 0 17.748 5.82 22.258 14.682 4.352 8.468 4.194 19.741 4.194 29.206l-.026 57.546c.026 1.835-1.468 3.329-3.329 3.46h-8.18c-1.782-.078-3.225-1.336-3.461-2.988V51.309c0-6.843.341-14.105-2.438-20.344-2.832-6.371-8.259-10.356-14.079-10.645-6.501.315-12.479 5.06-16.359 11.457-5.033 8.258-4.85 15.704-4.85 25.352v52.25c-.236 1.572-1.625 2.805-3.33 2.936h-8.127c-1.939-.078-3.486-1.572-3.486-3.46l-.053-61.374c0-5.637-.341-12.27-2.937-17.33-3.015-5.768-8.415-9.543-14.078-9.832-5.872.341-11.798 4.824-15.311 10.042-4.535 6.659-5.4 14.891-5.4 23.359v55.134c0 1.835-1.495 3.329-3.356 3.46h-8.152M762.363 114.308c-26.453 0-38.303-26.977-38.303-53.955 0-28.366 13.921-52.932 40.558-52.932h1.415c25.902 0 38.802 26.165 38.802 53.142 0 28.576-14.289 53.745-41.082 53.745H762.363m1.94-13.083c8.703-.287 15.572-5.688 19.636-14.681 3.645-8.075 4.353-17.33 4.353-26.191 0-9.647-1.049-19.715-5.585-27.973-4.063-7.21-11.037-11.798-18.43-12.06-8.232.289-15.6 5.873-19.296 14.472-3.329 7.446-4.352 17.33-4.352 25.562 0 9.255 1.205 19.951 5.033 28 3.723 7.628 10.881 12.583 18.641 12.871M679.701 100.806c11.877-.366 18.116-9.883 20.686-22.206.524-1.547 1.704-2.727 3.435-2.727l7.839-.026c1.861.079 3.565 1.495 3.408 3.225-3.618 21-16.281 35.235-34.318 35.235h-1.416c-26.269 0-37.595-26.375-37.595-53.142 0-26.558 11.483-53.745 37.752-53.745h1.416c18.247 0 31.251 14.052 34.082 35.052 0 1.573-1.468 2.937-3.198 3.12l-8.206-.105c-1.73-.236-2.857-1.704-3.12-3.355-1.966-11.719-8.704-21.052-19.925-21.419-17.855.578-22.941 22.547-22.941 39.457 0 16.281 4.247 40.059 22.101 40.636M339.564 94.75c-3.408-4.719-7.026-8.547-7.026-17.277V48.425c0-12.296.865-23.595-8.206-32.063-7.157-6.869-19.007-9.281-28.078-9.281-17.723 0-37.543 6.606-41.685 28.524-.446 2.333 1.258 3.565 2.778 3.906l18.063 1.94c1.704-.079 2.937-1.73 3.251-3.408 1.547-7.55 7.865-11.194 14.97-11.194 3.854 0 8.206 1.416 10.461 4.85 2.622 3.828 2.281 9.071 2.281 13.501v2.412c-10.802 1.232-24.933 2.019-35.053 6.476-11.692 5.034-19.872 15.337-19.872 30.464 0 19.375 12.19 29.048 27.895 29.048 13.239 0 20.502-3.119 30.727-13.555 3.382 4.903 4.509 7.289 10.696 12.428 1.39.734 3.172.655 4.404-.445l.026.052c3.723-3.304 10.486-9.202 14.288-12.374 1.522-1.259 1.26-3.278.08-4.956zm-36.678-8.389c-2.963 5.244-7.682 8.468-12.898 8.468-7.157 0-11.353-5.453-11.353-13.502 0-15.887 14.236-18.771 27.738-18.771v4.037c.001 7.262.184 13.319-3.487 19.768zM95.196 94.75c-3.408-4.719-7.025-8.547-7.025-17.277V48.425c0-12.296.865-23.595-8.206-32.063-7.157-6.869-19.008-9.281-28.078-9.281-17.723 0-37.517 6.606-41.685 28.524-.42 2.333 1.258 3.565 2.778 3.906l18.09 1.94c1.678-.079 2.91-1.73 3.225-3.408 1.547-7.55 7.892-11.194 14.996-11.194 3.828 0 8.18 1.416 10.461 4.85 2.595 3.828 2.254 9.071 2.254 13.501v2.412c-10.801 1.232-24.932 2.019-35.052 6.476C15.288 59.122 7.082 69.425 7.082 84.552c0 19.375 12.217 29.048 27.895 29.048 13.266 0 20.502-3.119 30.727-13.555 3.408 4.903 4.509 7.289 10.696 12.428 1.39.734 3.172.655 4.404-.445l.053.052c3.723-3.304 10.486-9.202 14.288-12.374 1.52-1.259 1.257-3.278.051-4.956zm-36.677-8.389c-2.963 5.244-7.655 8.468-12.898 8.468-7.157 0-11.326-5.453-11.326-13.502 0-15.887 14.235-18.771 27.711-18.771v4.037c0 7.262.183 13.319-3.487 19.768zM954.821 11.066c4.482 0 8.206 3.618 8.206 8.18 0 4.457-3.671 8.206-8.206 8.206-4.51 0-8.18-3.67-8.18-8.206 0-4.615 3.723-8.18 8.18-8.18m.026-1.573c-5.244 0-9.779 4.247-9.779 9.779 0 5.427 4.457 9.752 9.779 9.752 5.348 0 9.752-4.378 9.752-9.752 0-5.532-4.482-9.779-9.752-9.779m-3.67 15.258h2.098v-4.404h1.939c.761 0 .971.315 1.128.944 0 .157.367 2.937.394 3.46h2.333c-.288-.524-.446-2.019-.551-2.91-.21-1.39-.314-2.36-1.809-2.464.76-.262 2.071-.682 2.071-2.701 0-2.884-2.544-2.884-3.854-2.884h-3.749v10.959m2.044-9.202h1.757c.576 0 1.625 0 1.625 1.494 0 .577-.262 1.547-1.678 1.547h-1.704v-3.041"></path></svg>                    
                    </span>
                    </Link>
                    {/* icon ends here */}

                    <Link className="text-decoration-none hoverWhiteBorder px-1 py-1" onClick={()=>setModal(true)} >
                    <div className="d-flex flex-row align-items-center">
                        <span><i className="fa-solid text-white fa-location-dot"></i></span>
                        <div className="d-flex flex-column ms-1">
                            <span style={{ textDecoration:"none", fontSize:".7em", }} className="text-white">Deliver to </span>
                            <span style={{ fontSize:".8em" }} className="fw-bold text-white m-0">
                                { localStorage.getItem("address")!==null ? <div>{JSON.parse(localStorage.getItem("address")).Name} <span>{JSON.parse(localStorage.getItem("address")).Pincode}</span> </div> : <div>Add Location</div> } 
                                
                            </span>
                        </div>
                    </div>
                    </Link>
                    {/* address ends here */}
                </div>

                    <div className="search align-items-center d-none d-lg-flex flex-row w-100 px-1" style={{ height:"50px" }}>
                        <div className="d-flex w-100 flex-row" style={{ height:"35px" }}>
                            <select name="category" value={searchCategory} onChange={(e)=>setSearchCategory(e.target.value)} className="text-center" style={{ width:"45px",backgroundColor:"#e6e6e6", border:"none", padding:"7px", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px", fontSize:"12px" }}>
                                <option value="all">All</option>
                                {categories.map(category=>{
                                    return(
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )
                                })}
                            </select>
                        <form className="searchInput d-flex w-100" onSubmit={ searchSubmitHandler }>
                            <input onChange={searchInputHandler} style={{ height:"35px", outline:"none", border:"none" }} className="px-2 w-100 d-block" placeholder="Search Amazon.in" type="search" name="" id="" />
                        <button type="submit" style={{ height:"35px", width:"45px", border:"none", padding:"7px", borderTopRightRadius:"5px", borderBottomRightRadius:"5px", backgroundColor:"#febd69" }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        </form>
                        </div>
                    </div>
                    {/* {search form ends here} */}

                                
                    <div className="d-flex flex-row w-75  justify-content-around">
                    <div className="d-lg-flex d-none flex-column dropdown-parent hoverWhiteBorder  justify-content-center text-white px-1">
                        <span className="hello" style={{ fontSize:".7em" }}>Hello, {user!== null ? user.name : "sign in" }</span>
                        <div className="account fw-bold" style={{ fontSize:".8em" }}>
                            <span>Account & Lists<i className="ms-1 fa-solid fa-caret-down"></i></span>
                        </div>
                    </div> 
                            <div className="dropdown-child flex-column"  style={{zIndex:"999"}}>
                                    <div className="card" style={{ backgroundColor: "#ffffffe0",border: "none",borderRadius: "13px" }}>
                                        { user === null &&
                                        <div className="p-3 d-flex flex-column justify-content-center">
                                            <div className="w-100 d-flex justify-content-center">
                                            <Link className="btn text-center btn-warning py-1 w-50 " style={{ fontSize:"14px" }} to='/loginFirstPage' >Sign in</Link>
                                            </div>
                                            <div className="text-center text-secondary" style={{ fontSize:"12px" }}>
                                               New customer? <Link to='/register'>start here</Link>
                                            </div>
                                        <hr />
                                        </div>}
                                        {/* register and login links ends here */}
                                        <div className="flex-row d-flex p-2">
                                            <div className="d-flex flex-column w-50 ps-3 ">
                                                <div className="heqading h5 fw-bold">Your Lists</div>
                                                <ul className="m-0 p-0" style={{ listStyleType:"none" }}>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Create a Wish List</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Wish from Any Website</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Baby Wishlist</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Discover Your Style</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Explore Showroom</Link></li>
                                                </ul>
                                            </div>
                                            {/* lists */}
                                            <div className="w-50 ps-3 " style={{ borderLeft:"1px solid #d1d1d1" }}>
                                                <div className="heqading h5 fw-bold">Your Account</div>
                                                <ul className="m-0 p-0" style={{ listStyleType:"none" }}>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary hoverUnderline" to={'/account'}>Your Account</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary hoverUnderline">Your Orders</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary hoverUnderline">Your Wish List</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Keep Shopping for</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Your Prime Membership</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Your Prime Video</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Your Subscribe & Save Items</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Memberships & Subscriptions</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Your Seller Account</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Manage Your Content and Devices</Link></li>
                                                    <li><Link style={{ fontSize:"14px" }} className="text-decoration-none text-secondary ">Your Free Amazon Business Account</Link></li>
                                                </ul>
                                               { user !== null && <ul className="m-0 p-0" style={{ listStyleType:"none" }}>
                                                <li><Link to='/loginFirstPage' onClick={ logout } style={{ fontSize:"14px" }} className="hoverUnderline text-decoration-none text-secondary ">Sign out</Link></li>
                                                </ul>}
                                               </div>
                                            {/* accounts */}
                                        </div>
                                    </div>
                            </div>
                    {/* account and lists ends */}
                    

                    

                    <Link to={'/account/orders'} className="text-decoration-none orders d-lg-flex d-none flex-column px-1 text-white  justify-content-center hoverWhiteBorder">
                        <div style={{ fontSize:"12px" }}>Returns</div>
                        <div className="fw-bold">& Orders</div>
                    </Link>
                    {/* returns and orders */}


                    <Link to={'/cart'}  className="cart text-decoration-none d-lg-flex d-none flex-row align-items-center text-white px-1 hoverWhiteBorder ">
                        <div className="d-flex" style={{ position:"relative" }} >
                        <i className="fa-solid fa-cart-shopping fa-2xl"></i>
                        
                        {cartProducts.length > 0 &&
                        <span className="rounded-circle text-center" style={{ width:"20px", height:"20px", position:"absolute", backgroundColor:"#f08804", left:"50%", bottom:"13%", fontSize:"1em" }}>{cartProducts.length}</span>
                        }
                        </div>
                        <span className="ps-2 fw-bold h5 align-self-end">Cart</span> 
                    </Link>
                    {/* cart ends */}
                    </div>

                    </div>
 
                    
                    <div className="d-flex flex-row w-100">

                    <div className="search align-items-center d-lg-none d-sm-flex flex-row w-100 px-5" style={{ height:"50px" }}>
                        <div className="d-flex w-100 flex-row" style={{ height:"35px" }}>
                            <select name="category" value={searchCategory} onChange={(e)=>setSearchCategory(e.target.value)} className="text-center" style={{ width:"45px",backgroundColor:"#e6e6e6", border:"none", padding:"7px", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px", fontSize:"12px" }}>
                                <option value="all">All</option>
                                {categories.map(category=>{
                                    return(
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )
                                })}
                            </select>
                        <form className="searchInput d-flex w-100" onSubmit={ searchSubmitHandler }>
                            <input onChange={searchInputHandler} style={{ height:"35px", outline:"none", border:"none" }} className="px-2 w-100 d-block" placeholder="Search Amazon.in" type="search" name="" id="" />
                        <button type="submit" style={{ height:"35px", width:"45px", border:"none", padding:"7px", borderTopRightRadius:"5px", borderBottomRightRadius:"5px", backgroundColor:"#febd69" }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        </form>
                        </div>
                    </div>
                    {/* {search form ends here} */}
                    
                    <Link to={'/cart'}  className="cart text-decoration-none d-sm-flex d-lg-none flex-row align-items-center text-white px-1 hoverWhiteBorder ">
                        <div className="d-flex" style={{ position:"relative" }} >
                        <i className="fa-solid fa-cart-shopping fa-2xl"></i>
                        
                        {cartProducts.length > 0 &&
                        <span className="rounded-circle text-center" style={{ width:"20px", height:"20px", position:"absolute", backgroundColor:"#f08804", left:"50%", bottom:"13%", fontSize:"1em" }}>{cartProducts.length}</span>
                        }
                        </div>
                        <span className="ps-2 fw-bold h5 align-self-end">Cart</span> 
                    </Link>
                    {/* cart ends */}

                    <Link className="d-flex d-lg-none text-white ms-4 h5 text-decoration-none align-items-center" to={'/account'}>
                    Account
                    </Link>
                    </div>
                  </div>
            </div>
        </div>
        


        </>
    )
}