import { Link, useLocation, useParams } from "react-router-dom"
import AdminTemplate from "../template/AdminTemplate"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import SuccessBanner from "../component/SuccessBanner"
import WarningBanner from "../../view/components/WarningBanner"

export default function Category() {

    const location = useLocation()

    const [params, setParams] = useState(location.state)

    const [category, setCategory] = useState([])

    const [SubCategories, setSubCategories] = useState([])

    const [subCategory, setSubCategory] = useState({
        name: "",
        image: ""
    })

    const showFormValue = useRef(false)

    const [error, setError] = useState(null)

    const [msg, setMsg] = useState(null)

    const [existErr, setExistErr] = useState(null)

    const changeForm = () => {
        showFormValue.current = !showFormValue.current; 
        setSubCategory({name:"", image:""})
        setMsg(null)
        setExistErr(null)
            }
    const inputHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setSubCategory({
                    ...subCategory,
                    name: e.target.value
                })
                break;
            case "image":
                setSubCategory({
                    ...subCategory,
                    image: e.target.files[0]
                })
                break;

            default:
                break;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setError(null)
        setMsg(null)
        setExistErr(null)
        const form = new FormData();
        form.append("name", subCategory.name)
        form.append("_id", params._id)
        form.append("image", subCategory.image)
        axios.post("http://localhost:4000/addSubCategory", form, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                if (res.data.status) {
                    setSubCategory({
                        name: "",
                        image: ""
                    })
                    setMsg("Category Added Successfully")
                getSubCategories();
                } else {
                    if (typeof res.data.existErr !== "undefined") {
                        setExistErr(res.data.existErr)
                    } else {
                        setError(res.data.message)
                    }
                }
            })
            .catch(err => console.log(err))
    }

    const getSubCategories = ()=>{
    axios.post(`http://localhost:4000/getSubCategories/${params._id}`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => setSubCategories(res.data.SubCategories))
        .catch(err => console.log(err))
    }

    
          
    useEffect(() => {

        axios.post(`http://localhost:4000/getcategory/${params._id}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => setCategory(res.data.category))
            .catch(err => console.log(err))
        getSubCategories();
       
    }, [])
    


    return (
        <AdminTemplate>

        { typeof category?.name !== "undefined" &&
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="d-flex justify-content-between col-sm-12 fw-bold text-warning py-2 fs-3 bg-dark text-capital" style={{ letterSpacing: "2px" }}>
                        {category?.name}
                        {showFormValue.current === false && <Link onClick={changeForm} className="btn btn-outline-danger">
                            Add subcategory
                        </Link>}
                    </div>
                </div>
            </div>}
            {/* category name ends here */}

            {showFormValue.current === true &&
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="d-flex justify-content-center col-sm-12 col-md-10">
                            <div className="w-100 shadow p-3 card" style={{ backgroundColor: "#131921", color: "#e47911" }}>
                            {msg !== null && <SuccessBanner msg={msg} />}
                                {existErr !== null
                                    && <WarningBanner warning={existErr} />}
                                <div className=" mx-auto">
                                    <h3 className="text-white text-capital mb-4 mt-3 text-decoration-underline" style={{ color: "#131921" }}>
                                        Add sub category to {category.name}
                                    </h3>
                                </div>
                                {/* add category heading is ends here */}
                                <form className="w-100 px-sm-0 px-md-5 mx-auto mb-3" onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" name="name" required onChange={inputHandler} value={subCategory.name} placeholder="Enter category name" className="focus-border d-block w-100 py-2 px-1" />
                                    </div>
                                    {/* name ends here */}

                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Sub Category Image</label>
                                        <input required className="form-control d-block w-100" onChange={inputHandler} type="file" name="image" id="image" />
                                        <span className="text-danger" style={{ fontSize: "12px" }}>{error !== null && error}</span>
                                    </div>
                                    {/* category image ends here */}

                                    <div className="mb-3 d-flex w-100 flex-row justify-content-center">
                                        <Link onClick={changeForm} className="btn btn-secondary mt-2 w-50 rounded">
                                            Cancel
                                        </Link>
                                        <button type="submit" className="ms-2 btn btn-danger mt-2 w-100 rounded">
                                            Add Category
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            }




            {SubCategories.length > 0
                ? <div className="container">
                    <div className="row">
                        {
                            SubCategories.map(item => {
                                return (
                                    <div className="p-3 col-sm-3" key={item._id}>
                                        <div className="card hoverDetails" style={{ position: "relative", backgroundColor: "rgb(235, 235, 235)", borderRadius: "20px", border: "none", backgroundSize: "cover", height: "200px" }}>
                                            <img className="h-100 w-100" style={{ objectFit: "contain", filter: "drop-shadow(rgba(131,131,131,0.75) 9px 6px 6px)" }} src={`http://localhost:4000/categoryImages/${item.image}`} alt="" />
                                            <span className="text-black fs-5" style={{ position: "absolute", textShadow: "rgb(255, 255, 255) 1px 0px 10px", top: "5%", left: "5%", textTransform: "capitalize" }}>
                                                {item.name}
                                            </span>
                                            <div className="details flex-column">
                                                <div className="d-flex mb-5 w-100 justify-content-around">
                                                    <div className="edit"><Link to={`editSubCategory`} state={{ _id:item._id }} className="text-success"><i className="fa-solid fa-pen-to-square fa-2xl"></i></Link></div>
                                                </div>
                                                <div className="d-flex justify-content-around w-100">
                                                    <Link to={`/categories/subCategory`} state={{ _id:item._id }}><i className="fa-2xl fa-solid fa-eye text-warning"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                : <h1 className="text-capital h3 my-5 text-center text-secondary">
                    no sub-categories found
                </h1>
            }

        </AdminTemplate>
    )
}