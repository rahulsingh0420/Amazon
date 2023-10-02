import { useEffect } from "react";
import AdminFooter from "../component/AdminFooter";
import AdminNavbar from "../component/AdminNavbar";
import { useNavigate } from "react-router-dom";

export default function AdminTemplate({children}){

    const user = JSON.parse(localStorage.getItem("user"))

    const Navigate = useNavigate()
            useEffect(()=>{
                if (user === null | user?.userType !== "admin") {
                    Navigate('/loginFirstPage')
                }
            },[])
    
    return(

        <>
            <AdminNavbar/>
                {children}
            <AdminFooter/>
        </>
    )


}