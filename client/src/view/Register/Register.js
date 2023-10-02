import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import WarningBanner from "../components/WarningBanner";
import Logo from "../../Logo";

export default function Register() {


    const Navigate = useNavigate()


    const userData = localStorage.getItem("user")
    useEffect(()=>{
        if (userData !== null) {
         Navigate('/')   
        }
    },[userData, Navigate])

    const [user, setUser] = useState({
        name: "",
        mobileNo: "",
        email: "",
        password: "",
    });

    const inputHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setUser({
                    ...user,
                    name: e.target.value
                })
                break;

            case "mobileNo":
                setUser({
                    ...user,
                    mobileNo: e.target.value
                })
                break;

            case "email":
                setUser({
                    ...user,
                    email: e.target.value
                })
                break;

            case "password":
                setUser({
                    ...user,
                    password: e.target.value
                })
                break;

            default:
                break;
        }
    }
    const [errors, setError] = useState([]);
    const [existErr, setExist] = useState([]);
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/register", user, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                if (typeof res.data.errors === "undefined" && typeof res.data.existErr === "undefined" ) {
                    Navigate('/loginFirstPage')
                } else {
                    if (typeof res.data.errors !== "undefined") {
                        let error = res.data.errors
                        setError(error)
                    }

                    if (typeof res.data.existErr !== "undefined") {
                        setExist(res.data.existErr)
                    }
                    
                    
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>





            <Logo/>
        {
            existErr.length > 0 &&

            <WarningBanner warning={existErr} linkto="login" />
        }
        


            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-12">
                        {/* card */}
                        <div className="card px-3">
                            <h3 className="p-3 ps-2 m-0">
                                Create Account
                            </h3>
                            {/* form starts from here */}
                            <form onSubmit={submitHandler}>
                                <div className="p-2">
                                    <label htmlFor="name" style={{ fontSize: "13px" }} className="fw-bold">Your name</label>
                                    <input type="text" style={{ fontSize: "13px" }} placeholder="First and last name" autoFocus name="name" className="p-1 form-control rounded border outline-none ps-2" onChange={inputHandler} />
                                    {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "name" && err.msg}</span>
                                        )
                                    })}

                                </div>
                                {/* name */}
                                <div className="p-2 d-flex flex-row justify-content-between align-items-center">
                                    <label htmlFor="mobileNo" style={{ fontSize: "13px" }} className="fw-bold">Mobile number </label>
                                    <div className="w-75 d-flex flex-row align-items-center">
                                        <span className="me-1 text-secondary fw-bold">+91</span>
                                        <div className="d-flex flex-column w-100">
                                            <input style={{ fontSize: "13px" }} placeholder="Mobile number" type="number" name="mobileNo" className="p-1 w-100 rounded form-control border outline-none ps-2" onChange={inputHandler} />
                                            {errors.map(err => {
                                                return (
                                                    <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "mobileNo" && err.msg}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* mobile no */}
                                <div className="p-2">
                                    <label htmlFor="email" style={{ fontSize: "13px" }} className="fw-bold">Email</label>
                                    <input style={{ fontSize: "13px" }} placeholder="Email Address" type="email" name="email" className="p-1 form-control rounded border outline-none ps-2" onChange={inputHandler} />
                                    {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "email" && err.msg}</span>
                                        )
                                    })}
                                </div>
                                {/* email */}
                                <div className="p-2" style={{ lineHeight: "1" }}>
                                    <label htmlFor="password" style={{ fontSize: "13px" }} className="fw-bold mb-2 ">Password</label>
                                    <input style={{ fontSize: "13px" }} type="password" placeholder="At least 6 charecters" name="password" className="p-1 ps-2 form-control rounded border outline-none mb-0" onChange={inputHandler} />
                                    {errors.map(err => {
                                        return (
                                            <span key={err.path} className="text-danger" style={{ fontSize: "12px" }}>{err.path === "password" && err.msg}</span>
                                        )
                                    })}
                                    <span style={{ fontSize: "12px" }}> <i><i className="fa-solid fa-info me-2 ms-1 text-primary"></i></i> Password must be at least 6 characters. </span>
                                </div>
                                {/* password */}
                                <div style={{ fontSize: "13px", textAlign: "left" }} className="p-2 pe-0">
                                    To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.
                                </div>
                                <div className="p-2">
                                    <button type="submit" className="btn w-100 btn-sm btn-warning" style={{ borderRadius: "10px" }}>Register</button>
                                </div>
                            </form>
                            {/* form ends here  */}
                            <div className="devider mt-3"></div>
                            <div style={{ fontSize: "15px" }}>
                                Already have an account? <Link to="/loginFirstPage" className="text-decoration-none" >Sign in</Link>
                            </div>

                            <div className="mt-3 mb-4" style={{ fontSize: "13px" }}>
                                By creating an account or logging in, you agree to Amazon’s <Link>Conditions of Use</Link> and <Link>Privacy Policy. </Link>
                            </div>

                        </div>
                        {/* card ends here */}
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
            {/* footer ends */}

        </>
    )


}