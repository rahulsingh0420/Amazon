import { Link } from "react-router-dom";

function LinkTo(p) {
    if (p.linkto === "login") {
        return(
            <>
    Try to <Link to='/loginFirstPage' >Sign in</Link>
            </>

)
    } else if (p.linkto === "register") {
        return(
            <>
            <Link to='/register' >Create your Amazon account</Link>
        </>
        )
    }


}


export default function WarningBanner(params){

if (params.warning !== null) {
    return(
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-5">
                    <div className="alert alert-danger d-flex flex-row">
                        <div className="w-25  justify-content-center align-items-center d-flex " style={{ flex:"1" }}>
                            <i className="fa-solid fa-triangle-exclamation me-2 fa-2xl"></i>
                        </div>
                        <div className="w-75 d-flex flex-column">
                            <h4 className="fw-bold">There was a problem</h4>
                            <span>{params.warning} 
                        <LinkTo linkto={params.linkto} />
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


}