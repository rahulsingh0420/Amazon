import { createContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";





export default function Template({children}){
    
    return(
        <>
        <Navbar/>

        {children}

        <Footer/>

        </>
    )
}