import Template from "../template/Template";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import WarningBanner from "../components/WarningBanner";
import Logo from "../../Logo";

function Form({setSecurityPageVisiable, setFoundErr, setUser}) {
    const user = JSON.parse(localStorage.getItem("user"))
    const Navigate = useNavigate();
    const [password, setPassword] = useState("")
    const email = user.email
    const[InputErr, setInputErr] = useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/login", { email, password }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res =>{
                if (typeof res.data.user === "undefined") {
                    setInputErr(res.data.errors[0].msg);
                } else {
                    if(res.data.user === null ){
                        setFoundErr("Your password is incorrect ");
                        setInputErr("");
                    }else{
                        setFoundErr(null);
                        setInputErr("");
                        setSecurityPageVisiable(true);
                        setUser(res.data.user)
                    }
                }
            } )
            .catch(err => console.log(err))
    }

    const passHandler=(e)=>{
        setPassword(e.target.value)
    }

        return (
            <>
                 <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-12">
                        {/* card */}
                        <div className="card px-3">
                            <h3 className="p-3 pb-2 ps-2 m-0">
                               Confirm Account
                            </h3>

                            {/* form starts from here */}
                            <div className="p-2 fw-bold" style={{ fontSize: "14px" }}>
                    {user.email}
                </div>
                <form onSubmit={submitHandler} >
                    <div className="p-2 pt-1">
                        <label htmlFor="password" style={{ fontSize: "13px" }} className="fw-bold">Enter your password</label>
                        <input type="text" style={{ fontSize: "13px" }} autoFocus onChange={passHandler} name="password" className="p-1 form-control rounded border outline-none ps-2" />
                        <span className="text-danger" style={{ fontSize:"12px" }}>{ InputErr }</span>
                    </div>
                    {/* name */}
                    <div className="p-2">
                        <button type="submit" className="btn w-100 btn-sm btn-warning" style={{ borderRadius: "10px" }}>Sign in</button>
                    </div>
                </form>
                            {/* form ends here  */}


                            <div className="mt-3 mb-4" style={{ fontSize: "13px" }}>
                                By creating an account or logging in, you agree to Amazon’s <Link>Conditions of Use</Link> and <Link>Privacy Policy. </Link>
                            </div>

                            <ul className="ps-2 fw-bold" style={{ fontSize: "12px", listStyleType: "disclosure-closed" }}>
                                <li><Link className="text-decoration-none" >Need help?</Link></li>
                            </ul>
                        </div>
                        {/* card ends here */}

                    </div>
                </div>
            </div>
            </>
        )

    }



function Input({type, InputVal, InputFor, _id, setUser}){

    const [err, setErr] = useState(null)

    const edit = ()=>{
        document.getElementById(InputFor).type = type;
        document.getElementById(`${InputFor}Heading`).style.display = "none"
        document.getElementById(`editbtn${InputFor}`).style.display = "none"
        document.getElementById(`savebtn${InputFor}`).style.display = "block"
    }

    const save = ()=>{

        axios.post("http://localhost:4000/edituser",{edit:InputFor,value:Input, _id:_id },{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(res =>{
            if (res.data.status === true) {
        setUser(res.data.user) 
        setErr(null)
        document.getElementById(InputFor).type = "hidden";
        document.getElementById(`${InputFor}Heading`).style.display = "block"
        document.getElementById(`editbtn${InputFor}`).style.display = "block"
        document.getElementById(`savebtn${InputFor}`).style.display = "none"
        }else{
            setErr(res.data.existErr)
        }})
        .catch(err => console.log(err))


        
    }

    const [Input, setInput] = useState(InputVal);

    const inputHandler = (e)=>{
        setInput(e.target.value)
    }


    return(
        <>
            <label htmlFor="name" className="fs-7 fw-bold text-capital">{InputFor} :</label>
            <span className="text-danger" style={{ fontSize:"12px" }}>{ err }</span>
            <div className="d-flex flex-row">

                <div className="p-1 w-75 text-capital" id={`${InputFor}Heading`}>{InputVal}</div>

            <input required type="hidden" name="name" id={InputFor} className="w-75 text-amazon form-control p-0 p-1" value={Input} onChange={inputHandler} />

            <button className="btn py-1 ms-3 w-25 bg-light" id={`editbtn${InputFor}`} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }} onClick={edit} >Edit</button>
            <button className="btn py-1 ms-3 w-25 btn-warning" id={`savebtn${InputFor}`} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" , display:"none"}} onClick={save} >Save</button>


            </div>
        </>
    )
}


export default function Security(){

    const [foundErr,  setFoundErr] = useState(null);
    
    const [user, setUser] = useState({})

    const [ShowSecurityPage, setSecurityPageVisiable] = useState(false)
 


    if (ShowSecurityPage === false) {
    return(
            <>
            <Logo/>
        <WarningBanner warning={foundErr} />
            <Form setSecurityPageVisiable={setSecurityPageVisiable} setUser={setUser} setFoundErr={setFoundErr} />    
            </>
        )

    }else{
        return(
            <Template>
                <div className="container mt-5 mb-3">
                    <div className="row flex-column align-content-center">
                        <div className="col-sm-6">
                        <h3>Login & Security </h3>
                        </div>
                        {/* heading */}
                        <div className="col-sm-12 col-md-6 p-1">
                            <div className="card p-3">
                                <Input  type={"text"} InputVal={user.name} _id={user._id} InputFor={"name"} setUser={setUser} />
                                <hr />
                                <Input  type={"email"} InputVal={user.email} _id={user._id} InputFor={"email"} setUser={setUser} />
                                <hr />
                                <Input  type={"text"} InputVal={user.password} _id={user._id} InputFor={"password"} setUser={setUser} />
                                <hr />
                                <Input  type={"number"} InputVal={user.mobileNo} _id={user._id} InputFor={"mobileNo"} setUser={setUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
            )
    }


}