import { useEffect, useState } from "react";
import AdminTemplate from "../template/AdminTemplate";
import { Link } from "react-router-dom"
import axios from "axios";

export default function Categories() {

    const [AllCategories, setAllCategories] = useState([])

    const [search, setSearch] = useState('')

    useEffect(()=>{
    axios.get(`http://localhost:4000/getcategories?search=${search}`)    
    .then(res=>setAllCategories(res.data.categories))
    .catch(err=>console.log(err))
    },[search])

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }


    return (
        <AdminTemplate>

            <div className="container">
                <div className="row">
                    <div className="p-3 text-center col-sm-12">
                        <h1 style={{
                            color: "#e47911", fontFamily: "sans-serif", textShadow: " 2px 3px 5px rgba(0,0,0,0.6)"
                        }} className="fw-bold"> <i className="fa-solid fa-user"></i> Total {AllCategories.length} Categories Found</h1>
                    </div>
                </div>
            </div>
            {/* number of found records heading */}

            <div className="container-fluid">
                <div className="row">
                    <div className="p-3 col-sm-12">
                        <h5 style={{ textDecoration: "underline" }}>All Categories</h5>
                        <div className="d-flex justify-content-center px-5 my-2 align-items-center"  >
                            <input style={{ height: "35px", outline: "none", border: "1px solid #D5D9D9", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }} className="text-center px-2 w-100 d-block" placeholder="Search Category" value={search} type="search" name="search" id="search" onChange={searchHandler} />
                            <Link style={{ height: "35px", width: "45px", border: "none", padding: "7px", borderTopRightRadius: "5px", borderBottomRightRadius: "5px", backgroundColor: "#febd69" }}>
                                <i className="fa-solid text-black fa-magnifying-glass"></i>
                            </Link>
                        </div>
                    </div>
                    {/* search form is here */}

                    <div className="d-flex justify-content-end col-sm-12">
                        <Link to='addcategory' className="px-5 text-decoration-none h5 fw-bold hoverUnderline" > Add New  <i className="fa-regular fa-square-plus fa-xl"></i> </Link>
                    </div>


                </div>
            </div>
            {/* search and add categories parent div ends */}


            <div className="container">
                <div className="row">
                        {
                            AllCategories.map(item=>{
                            return(
                                <div className="p-3 col-sm-3" key={item._id}>
                                    <div className="card hoverDetails" style={{ position:"relative", backgroundColor:"rgb(235, 235, 235)", borderRadius:"20px", border:"none",  backgroundSize:"cover",  height:"200px" }}>
                                        <img className="h-100 w-100" style={{ objectFit:"contain", filter: "drop-shadow(rgba(131,131,131,0.75) 9px 6px 6px)" }} src={`http://localhost:4000/categoryImages/${item.image}`} alt="" />
                                    <span className="text-black fs-5" style={{ position:"absolute", top:"5%", left:"5%", textTransform:"capitalize" }}>
                                        {item.name}
                                    </span>
                                    <div className="details flex-column">
                                        <div className="d-flex mb-5 w-100 justify-content-around">
                                        <div className="edit"><Link to={`editCategory`} state={{ _id:item._id }} className="text-success"><i className="fa-solid fa-pen-to-square fa-2xl"></i></Link></div>
                                        </div>
                                        <div className="d-flex justify-content-around w-100">
                                            <Link to={`category`} state={{ _id:item._id }} ><i className="fa-2xl fa-solid fa-eye text-warning"></i></Link>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )
                            })
                        }
                  
                </div>
            </div>


        </AdminTemplate>
    )
}