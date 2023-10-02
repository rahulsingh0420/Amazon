import { useParams,Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../../Logo";
import AdminTemplate from "../../template/AdminTemplate";
import SuccessBanner from "../../component/SuccessBanner";
import WarningBanner from "../../../view/components/WarningBanner";
import Err404 from "../../../error/Err404";


export default function EditSubCtaegory(){

        const location = useLocation()

        const params = location.state;

        const [error, setError] = useState(null)

        const [msg, setMsg] = useState(null)
    
        const [existErr, setExistErr] = useState(null)
    
        const [subCategory, setSubCategory] = useState({
            name:"",
            image:"",
            categoryId:""
        })

        const submitHandler = (e)=>{
            e.preventDefault()
            setError(null)
            setMsg(null)
            setExistErr(null)
            const form = new FormData();
            form.append("name", subCategory.name)
            form.append("image", subCategory.image)
            axios.post(`http://localhost:4000/editSubCategory/${params._id}`, form,{
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            } )
            .then(res=>{
                if (res.data.status) {
                    setMsg("Sub Category Updated Successfully")
                }else{
                    if (typeof res.data.message !== "undefined") {
                        setError(res.data.message)
                    }
    
                    if (typeof res.data.existErr !== "undefined") {
                        setExistErr(res.data.existErr)
                    }                
    
                }
            })
            .catch(err=>console.log(err))
        }
    
        useEffect(()=>{
            axios.post(`http://localhost:4000/getSubCategory/${params._id}`,{
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res=>setSubCategory({
                ...subCategory,
                name:res.data.subCategory.name,
                categoryId:res.data.subCategory.categoryId
            }))
            .catch(err=>console.log(err))
        }, [params._id])
    
        const inputHandler = (e)=>{
            switch (e.target.name) {
                case "name":
                    setSubCategory({
                        ...subCategory,
                        name:e.target.value
                    })
                    break;
    
                case "image":
                    setSubCategory({
                        ...subCategory,
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
    
    { existErr !==null && <WarningBanner warning={existErr} />}
    
                <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="d-flex justify-content-center col-sm-12 col-md-10">
                        <div className="w-100 shadow p-3 card" style={{ backgroundColor:"#131921", color:"#e47911" }}>
                        
                        <div className=" mx-auto">
                        <h3 className="text-white mb-4 mt-3 text-decoration-underline" style={{ color:"#131921" }}>
                            Edit Sub-Category
                        </h3>
                        </div>
                    {/* add category heading is ends here */}
                            <form className="w-100 px-sm-0 px-md-5 mx-auto mb-3" onSubmit={ submitHandler }>
                                <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" required onChange={ inputHandler } value={subCategory.name} placeholder="Enter sub category name" className="focus-border d-block w-100 py-2 px-1" />
                                </div>
                                {/* name ends here */}
    
                                <div className="mb-3">
                                <label htmlFor="image" className="form-label">Sub Category Image</label>
                                <input className="form-control d-block w-100" onChange={ inputHandler } type="file" name="image" id="image" />
                                                <span className="text-danger" style={{ fontSize: "12px" }}>{error !== null && error}</span>
                                </div>
                                {/* category image ends here */}
    
                                <div className="mb-3 d-flex w-100 flex-row justify-content-center">
                                    <Link to={`/categories/category`} state={{ _id:subCategory.categoryId }} className="btn btn-secondary mt-2 w-50 rounded">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="ms-2 btn btn-warning mt-2 w-100 rounded">
                                        Update
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