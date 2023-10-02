import { useState } from "react";
import AdminTemplate from "../template/AdminTemplate";
import { Link } from "react-router-dom"

export default function Products(){

    const [search, setSearch] = useState('')

    const searchHandler = (e)=>{
        setSearch(e.target.value)
    }

    const products = []

    

    return (
        <AdminTemplate>

<div className="container">
            <div className="row">
                <div className="p-3 text-center col-sm-12">
                    <h1 style={{color:"#e47911", fontFamily:"sans-serif",textShadow: " 2px 3px 5px rgba(0,0,0,0.6)"
        }} className="fw-bold"> <i className="fa-solid fa-user"></i> Total 0 Products Found</h1>
                </div>
            </div>
        </div>
{/* number of found records heading */}


            <div className="container-fluid">
            <div className="row">
                <div className="p-3 col-sm-12">
                        <h5 style={{ textDecoration:"underline" }}>All Products table</h5>
                        <div className="d-flex justify-content-center px-5 my-2 align-items-center"  >
                            <input style={{ height:"35px", outline:"none", border:"1px solid #D5D9D9", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px" }} className="text-center px-2 w-100 d-block" placeholder="Search User" value={search} type="search" name="search" id="search" onChange={ searchHandler } />
                        <Link style={{ height:"35px", width:"45px", border:"none", padding:"7px", borderTopRightRadius:"5px", borderBottomRightRadius:"5px", backgroundColor:"#febd69" }}>
                        <i className="fa-solid text-black fa-magnifying-glass"></i>
                        </Link>
                        </div>
                    <div className="table shadow-lg card">
                        <table className="table w-100 table-hover"  style={{ background:"#131921" }}>
                            <thead className="shadow">
                                <tr>
                                    <th>_id</th>
                                    <th>Name</th>
                                    <th>Mobile No</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>UserType</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product=>{
                                        return(
                                            <tr key={product._id}>
                                                <td className="py-3">{product._id}</td>
                                                <td className="py-3">{product.name}</td>
                                                <td className="py-3">{product.mobileNo}</td>
                                                <td className="py-3">{product.email}</td>
                                                <td className="py-3">{product.password}</td>
                                                <td className="py-3">{product.userType}</td>
                                                <td className="py-3">
                                                    <Link to={`/users/editProduct/${product._id}`}><i className="text-success fa-solid fa-pen-to-square fa-lg"></i></Link>
                                                    <Link onClick={ alert('deleted') }><i className="text-danger ms-4 fa-solid fa-trash fa-lg"></i></Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
            {/* table and search form of products */}

        </AdminTemplate>
    )
}