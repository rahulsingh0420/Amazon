import bg  from "../images/404Background.jpg";
import  frnt404  from "../images/2488756-removebg-preview.png";
import { Link } from "react-router-dom"

export default function Err404(){
    return(

       <div style={{ backgroundImage: `url(${bg})`, minHeight:"100vh" }} className="d-flex align-items-center justify-content-center">

        <div className="d-flex flex-column">
        <div className="h1 text-white text-center fw-bold" style={{ textShadow: "#FC0 1px 0 10px", letterSpacing:"5px", fontFamily:"sans-serif" }}>
            LOOK LIKE YOU LOST IN SPACE
        </div>
        <img src={frnt404} width={"100%"} alt="" />
        <Link className="fs-4 mt-3 fw-bold mx-auto btn btn-secondary" to={'/'} style={{ backgroundColor:"#39f6ff6b", border:"none" }} >Go Back</Link>
        </div>

       </div>

    )
}