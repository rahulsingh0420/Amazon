import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import WarningBanner from "../components/WarningBanner";
import Logo from "../../Logo";


function Warning({warning}) {
    if (warning !== null) {
      return  <WarningBanner warning={warning} linkto="register" />
    }
}


function Form(params) {
    const Navigate = useNavigate();
    const [password, setPassword] = useState("")
    const submitHandler = params.submitHandler
    const inputHandler = params.inputHandler
    const changeEmail = params.changeEmail
    const email = params.Inputvalue
    const setFoundErr = params.setFoundErr
    const InputErr = params.InputErr
    const setInputErr = params.setInputErr
    if (params.isFound === false) {
        return (
            <form onSubmit={submitHandler}>
                <div className="p-2 pt-1">
                    <label htmlFor="name" style={{ fontSize: "13px" }} className="fw-bold">Enter mobile phone number or email </label>
                    <input type="text" style={{ fontSize: "13px" }} onChange={inputHandler} value={email} autoFocus name="name" className="p-1 form-control rounded border outline-none ps-2" />
                    <span className="text-danger" style={{ fontSize:"12px" }} >{InputErr}</span>
                </div>
                {/* name */}
                <div className="p-2">
                    <button type="submit" className="btn w-100 btn-sm btn-warning" style={{ borderRadius: "10px" }}>Continue</button>
                </div>
            </form>
        )
    } else {

        const loginUser = (user)=>{
            setFoundErr(null)
            localStorage.setItem("user", JSON.stringify(user))  
            Navigate('/')          
        }

        const passwordHandler = (e)=>{
            setPassword(e.target.value)
        }

        const loginHandler = (e)=>{
            e.preventDefault();
            axios.post("http://localhost:4000/login", { email, password }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(res =>{
                    if (typeof res.data.user === "undefined") {
                        setInputErr(res.data.errors[0].msg)
                        setFoundErr(null)
                    } else {
                        if(res.data.user === null ){ setFoundErr("Your password is incorrect "); setInputErr("") }else{ loginUser(res.data.user)}
                    }
                } )
                .catch(err => console.log(err))
        }

        return (
            <>
                <div className="p-2 fw-bold" style={{ fontSize: "14px" }}>
                    {params.email}  <button onClick={changeEmail} style={{ fontSize: "12px" }} className="ms-1 btn text-primary p-0 text-decoration-underline">change</button>
                </div>
                <form onSubmit={ loginHandler }>
                    <div className="p-2 pt-1">
                        <label htmlFor="password" style={{ fontSize: "13px" }} className="fw-bold">Enter your password</label>
                        <input type="text" onChange={passwordHandler} style={{ fontSize: "13px" }} autoFocus name="password" className="p-1 form-control rounded border outline-none ps-2" />
                        <span className="text-danger" style={{ fontSize:"12px" }}>{ InputErr }</span>
                    </div>
                    {/* name */}
                    <div className="p-2">
                        <button type="submit" className="btn w-100 btn-sm btn-warning" style={{ borderRadius: "10px" }}>Sign in</button>
                    </div>
                </form>
            </>
        )

    }


}



export default function LoginFirstPage() {
    const [foundErr,  setFoundErr] = useState(null);
    const[InputErr, setInputErr] = useState("");
    const [name, setName] = useState("");
    const [UserEmail, setUserEmail] = useState({
        email: null,
        isFound: false
    });

    const changeEmail = function changeEmail() {
        setUserEmail({
            email:null,
            isFound: !UserEmail.isFound
        })
        setName(UserEmail.email)
        setFoundErr(null)
    }
    const Navigate = useNavigate();


    const user = localStorage.getItem("user")
    useEffect(()=>{
        if (user !== null) {
         Navigate('/')   
        }
    },[user])
    


    const inputHandler = (e) => {
        setName(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/loginFirstPage", { name }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res =>{  
                if(typeof res.data.email !== "undefined"  ){
                    if(res.data.email === null ){ setFoundErr("Account not found "); setInputErr("") }else{ setUserEmail({email: res.data.email,isFound: true}); setFoundErr(null); setInputErr("")}
                }else{ setInputErr(res.data.errors[0].msg); setFoundErr(null)}  
            })
            .catch(err => console.log(err))
    }

    return (
        <>
        
            <Logo/>

            <Warning warning={foundErr} />

            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-12">
                        {/* card */}
                        <div className="card px-3">
                            <h3 className="p-3 pb-2 ps-2 m-0">
                                Sign in
                            </h3>

                            {/* form starts from here */}
                            <Form submitHandler={submitHandler} inputHandler={inputHandler} isFound={UserEmail.isFound} email={UserEmail.email} changeEmail={changeEmail} Inputvalue={name} setFoundErr={setFoundErr} InputErr={InputErr} setInputErr={setInputErr} />
                            {/* form ends here  */}


                            <div className="mt-3 mb-4" style={{ fontSize: "13px" }}>
                                By creating an account or logging in, you agree to Amazon’s <Link>Conditions of Use</Link> and <Link>Privacy Policy. </Link>
                            </div>

                            <ul className="ps-2 fw-bold" style={{ fontSize: "12px", listStyleType: "disclosure-closed" }}>
                                <li><Link className="text-decoration-none" >Need help?</Link></li>
                            </ul>
                        </div>
                        {/* card ends here */}

                        <div className="text-secondary text-center mt-3" style={{ fontSize: "12px" }} >New to Amazon?</div>
                        <hr className="mt-0" />


                        <div className="d-flex justify-content-center" >
                            <Link className="btn w-100 bg-light py-1 pt-0" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }} to='/register' >Create your Amazon account</Link>
                        </div>
                    </div>
                </div>
            </div>


            {/* footer */}
            <Footer />
            {/* footer ends */}

        </>
    )
}