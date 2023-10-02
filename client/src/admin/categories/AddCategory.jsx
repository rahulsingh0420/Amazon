import { useState } from "react";
import AdminTemplate from "../template/AdminTemplate";
import axios from "axios";
import SuccessBanner from "../component/SuccessBanner";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import WarningBanner from "../../view/components/WarningBanner";

export default function AddCategory(){

    const [category, setCategory] = useState({
        name:"",
        discription:"",
        image:""
    })

    const [error, setError] = useState(null)

    const [msg, setMsg] = useState(null)

    const [existErr, setExistErr] = useState(null)

    const submitHandler = (e)=>{
        e.preventDefault()
        setError(null)
        setMsg(null)
        setExistErr(null)
        const form = new FormData();
        form.append("name", category.name)
        form.append("discription", category.discription)
        form.append("image", category.image)
        axios.post("http://localhost:4000/addcategory", form,{
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        } )
        .then(res=>{
            if (res.data.status) {
             setCategory({
                name:"",
                discription:"",
                image:""
                })
            setMsg("Category Added Successfully")
            } else {
                if (typeof res.data.existErr !== "undefined") {
                    setExistErr(res.data.existErr)
                }else{
                    setError(res.data.message)
                }
            }
        })
        .catch(err=>console.log(err))

    }

    const inputHandler = (e)=>{
        switch (e.target.name) {
            case "name":
                setCategory({
                    ...category,
                    name:e.target.value
                })
                break;

                case "discription":
                    setCategory({
                        ...category,
                        discription:e.target.value
                    })
                    break;
                    
                    
                    case "image":
                        setCategory({
                            ...category,
                            image:e.target.files[0]
                        })
                        break;        
        
                        default:
                            break;
        }
    }

    return(
        <AdminTemplate>
            
            <Logo/>

           { msg !==null && <SuccessBanner msg={msg} />}

            { existErr !==null
             && <WarningBanner warning={existErr} />}

        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="d-flex justify-content-center col-sm-12 col-md-10">
                    <div className="w-100 shadow p-3 card" style={{ backgroundColor:"#131921", color:"#e47911" }}>
                    
                    <div className=" mx-auto">
                    <h3 className="text-white mb-4 mt-3 text-decoration-underline" style={{ color:"#131921" }}>
                        Add new category
                    </h3>
                    </div>
                {/* add category heading is ends here */}
                        <form className="w-100 px-sm-0 px-md-5 mx-auto mb-3" onSubmit={ submitHandler }>
                            <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" required onChange={ inputHandler } value={category.name} placeholder="Enter category name" className="focus-border d-block w-100 py-2 px-1" />
                            </div>
                            {/* name ends here */}

                            <div className="mb-3">
                            <label htmlFor="discription" className="form-label">Discription</label> <span style={{ fontSize:"11px" }} className="text-secondary">*(optional)</span>
                            <input type="text" name="discription" onChange={ inputHandler } value={category.discription} placeholder="Enter category discription" className="focus-border d-block w-100 py-2 px-1" />
                            </div>
                            {/* discription */}

                            <div className="mb-3">
                            <label htmlFor="image" className="form-label">Category Image</label>
                            <input required className="form-control d-block w-100" onChange={ inputHandler } type="file" name="image" id="image" />
                                            <span className="text-danger" style={{ fontSize: "12px" }}>{error !== null && error}</span>
                            </div>
                            {/* category image ends here */}

                            <div className="mb-3 d-flex w-100 flex-row justify-content-center">
                                <Link to='/categories' className="btn btn-secondary mt-2 w-50 rounded">
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


        </AdminTemplate>
    )
}