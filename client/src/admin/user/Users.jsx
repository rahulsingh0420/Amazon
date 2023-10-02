import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import AdminTemplate from "../template/AdminTemplate";
export default function Users(){
    
    const [search, setSearch] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:4000/users?search=${search}`)
    .then(res=>{  
        setAllUsers(res.data.users);
        const thisPage = 1
        let startIndex =( thisPage-1)*recordPerPage
        let endIndex = (thisPage)*recordPerPage
        let x = res.data.users.slice(startIndex, endIndex )
        setUsers(x)
        })
    .catch(err=>console.log(err));
    }, [search])

    const [users, setUsers] = useState([]);

    const [AllUsers, setAllUsers] = useState([])
    
    const recordPerPage = 10

    const [CurrentPage, setCurrentPage] = useState(1)

    const deleteUser = (_id)=>{
        if (window.confirm(`Do You Want To Delete _id ${_id}`)) {
            axios.post(`http://localhost:4000/deleteUser/${_id}`,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .catch(err=> console.log(err)) 
            let x = search  
            setSearch(`${x} `) 
        }
    }

    const searchHandler = (e)=>{
            setSearch(e.target.value)
    }
    
    const nbPages = Math.ceil(AllUsers.length/recordPerPage)
    
    const pagination = (thisPage)=>{
        let startIndex =( thisPage-1)*recordPerPage
        let endIndex = (thisPage)*recordPerPage
        let x = AllUsers.slice(startIndex, endIndex )
        setUsers(x)
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
        <>
            <AdminTemplate>

        <div className="container">
            <div className="row">
                <div className="p-3 text-center col-sm-12">
                    <h1 style={{color:"#e47911", fontFamily:"sans-serif",textShadow: " 2px 3px 5px rgba(0,0,0,0.6)"
        }} className="fw-bold"> <i className="fa-solid fa-user"></i> Total {AllUsers.length} Users Found</h1>
                </div>
            </div>
        </div>
{/* number of found users heading */}

        <div className="container-fluid">
            <div className="row">
                <div className="p-3 col-sm-12">
                        <h5 style={{ textDecoration:"underline" }}>All users table</h5>
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
                                    users.map(user=>{
                                        return(
                                            <tr key={user._id}>
                                                <td className="py-3">{user._id}</td>
                                                <td className="py-3">{user.name}</td>
                                                <td className="py-3">{user.mobileNo}</td>
                                                <td className="py-3">{user.email}</td>
                                                <td className="py-3">{user.password}</td>
                                                <td className="py-3">{user.userType}</td>
                                                <td className="py-3">
                                                    <Link to={`edit`} state={{ _id:user._id }}><i className="text-success fa-solid fa-pen-to-square fa-lg"></i></Link>
                                                    <Link onClick={()=> deleteUser(user._id)}><i className="text-danger ms-4 fa-solid fa-trash fa-lg"></i></Link>
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
{/* table or search */}

        
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
            </>
    )
}