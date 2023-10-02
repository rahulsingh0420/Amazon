import { useState } from "react";
import Template from "../template/Template";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddAddress(){

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) 

    const [address, setAddress] = useState({
        region:"India",
        userId:user._id,
        name:"",
        mobileNo:"",
        flat:"",
        landmark:""
    })

    const inputHandler = (e)=>{
        setErrors([])
        switch (e.target.name) {
            case "name":
                setAddress({
                    ...address,
                    name:e.target.value
                })
                break;
                case "mobileNo":
                    setAddress({
                        ...address,
                        mobileNo:e.target.value
                    })
                    break;
                    case "flat":
                        setAddress({
                            ...address,
                            flat:e.target.value
                        })
                        break;
                        case "landmark":
                        setAddress({
                            ...address,
                            landmark:e.target.value
                        })
                        break;
            default:
                break;
        }
    }

    const [zipCodes, setZipCode ] = useState([])

    const [zipError, setZipError] = useState(null)

    const ZipHandler = (e)=>{
        axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then(res=>{ 
            if(res.data[0].Status === "Success" ){
            setZipCode(res.data[0].PostOffice)
            setAddress({
                ...address,
                district:res.data[0].PostOffice[0].District,
                state:res.data[0].PostOffice[0].State,
                pincode:res.data[0].PostOffice[0].Pincode
            })
            setZipError(null) 
        }else{
        setZipError(("Enter Valid ZipCode") )
        }
    })
        .catch(err=> console.log(err))
    }

    const [errors,setErrors] = useState([])

    const submitHandler = (e)=>{
        e.preventDefault()
        setErrors([])
        axios.post('http://localhost:4000/addAddress', address,{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=>{
        if (res.data.status) {
            setErrors([])
            navigate('/account/address')
        } else {
            setErrors(res.data.errors)
        } 
        })
        .catch(err=> console.log(err))
    }


    return(
        <Template>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                    <h4 className=" my-3 fw-bold ">
                        Add a new address
                    </h4>
                    <div className="form">
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label htmlFor="Country/Region" className="form-label">Country/Region</label>
                                <input type="text" name="Country/Region" id="Country/Region" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control disabled" disabled value={"India"}/>
                            </div>
                            {/* contory */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Full name (First and Last name)</label>
                                <input type="text" name="name" id="name" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control" onChange={inputHandler} value={address.name}/>
                            {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "name" && err.msg}</span>
                                        )
                                    })}
                            </div>
                            {/* name */}
                            <div className="mb-3">
                                <label htmlFor="mobileNo" className="form-label">Mobile number</label>
                                <input type="number" name="mobileNo" id="mobileNo" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control" onChange={inputHandler} value={address.mobileNo}/>
                            {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "mobileNo" && err.msg}</span>
                                        )
                                    })}
                            </div>
                            {/* mobile No */}
                            <div className="mb-3">
                                <label htmlFor="pincode" className="form-label">PinCode</label>
                                <input type="number" name="pincode" id="pincode" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control" onChange={ZipHandler} value={address.pincode}/>
                                {zipError !== null && <span className="ds-7 text-danger">{zipError}</span> }
                            {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "pincode" && err.msg}</span>
                                        )
                                    })}
                            </div>
                            {/* pincode */}
                            <div className="mb-3">
                                <label htmlFor="flat" className="form-label">Flat, House no., Building, Company, Apartment</label>
                                <input type="text" name="flat" id="flat" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control" onChange={inputHandler} value={address.flat}/>
                            {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "flat" && err.msg}</span>
                                        )
                                    })}
                            </div>
                            {/* Flat, House no., Building, Company, Apartment */}
                            <div className="mb-3">
                                <label htmlFor="landmark" className="form-label">Landmark</label>
                                <input type="text" name="landmark" id="landmark" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control" onChange={inputHandler} value={address.landmark}/>
                            {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "landmark" && err.msg}</span>
                                        )
                                    })}
                            </div>
                            {/* landmark */}
                            <div className="d-flex flex-row mb-3">
                                <div className="discrict w-50">
                                <label htmlFor="district" className="form-label">District</label>
                                <input type="text" name="district" id="district" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control" disabled value={zipCodes !==null &&zipCodes[0]?.District}/>
                                </div>
                                {/* district */}
                                <div className="state w-50 ms-4">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" name="state" id="state" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="form-control" disabled value={zipCodes !==null && zipCodes[0]?.State}/>
                                </div>
                                {/* state */}
                            </div>
                            {/* district state */}
                            {typeof zipCodes[0]?.DeliveryStatus !== "undefined" && <div className="text-success mb-3">Able To {zipCodes[0]?.DeliveryStatus}</div>}
                            <div className="mb-3">
                                <button className="py-1 btn-sm btn btn-warning" style={{ borderRadius:"9px", border:"0px" }}>
                                    Add address
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}