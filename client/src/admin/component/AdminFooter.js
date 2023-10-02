import { Link } from "react-router-dom";
export default function AdminFooter(){
    return(
        <>
        <div className="devider mt-4"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-12">
                            <div className="d-flex justify-content-center flex-column p-3 lh-2">
                                <ul className="p-0 m-0 d-flex flex-row justify-content-between" style={{ listStyleType:"none", fontSize:"12px" }}>
                                        <li> <Link to='/users'> users</Link> </li>
                                        <li> <Link> Privacy Notice</Link> </li>
                                        <li> <Link> Help</Link> </li>
                                </ul>
                                <span style={{ fontSize:'12px' }} className="mt-2 text-secondary text-center">
                                © 1996-2023, Amazon.com, Inc. or its affiliates 
                                </span>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}