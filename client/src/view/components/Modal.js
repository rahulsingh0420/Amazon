import { useEffect } from "react"
import { Link } from "react-router-dom";

export default function Modal(params){
    const setModal  = params.setModal
    const data = params.data
    const user = localStorage.getItem("user")
    useEffect(()=>{
        document.body.style.overflowY="hidden"
        return ()=>{ 
            document.body.style.overflowY="scroll"
        }
    },[])
    switch (data) {
        case "zipCode":
        const zipCodes = params.zipCodes
        const ZipHandler = params.ZipHandler
        const ZipSubmitHandler = params.ZipSubmitHandler
        const setZipCode = params.setZipCode
        let x = 0
        const closeModal = ()=>{
            setModal(false)
            setZipCode(null)
        }
        function saveAddress(zipcode) {
            localStorage.setItem("address", JSON.stringify(zipcode))
            closeModal();
        }
          return(
        <>
        <div className="modal-wrapper"style={{ position:"absolute", zIndex:"998" }} onClick={closeModal}></div>
        <div className="modal-container" style={{ position:"absolute", zIndex:"999" }}>
        <div className="d-flex flex-column">
            <div style={{ borderRadius:"7px" }} className="header p-3 bg-light w-100">
                <h6 className="fw-bold">Choose your location</h6>
            </div>
                <hr className="m-0" />
            <div className="d-flex flex-column body pb-0 p-3">
                <span className="text-secondary" style={{ fontSize:"13px" }}>
                Select a delivery location to see product availability and delivery options
                </span>
                {
                    user === null &&
                <span className="py-2 mt-2">
                <Link to="/loginFirstPage" className="w-100 btn btn-warning py-1" style={{ fontSize:"13px", borderRadius:"10px" }}>Sign in to see your addresses</Link>
                </span>
                }
                <span className="text-center text-secondary mt-2" style={{ fontSize:"11px" }}>
                or enter an Indian pincode
                </span>
                <hr className="m-0 p-0" />
                <form className="d-flex p-3 justify-content-around" onSubmit={ ZipSubmitHandler }>
                    <input type="number" autoFocus onChange={ ZipHandler } className="w-75 mx-4 form-control" placeholder="Enter zip code" />
                    <button className="btn w-25 bg-light py-1 pt-0" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>Apply</button>
                </form>
            </div>
                { zipCodes !== null &&
            <div className="p-1 overflow-y-scroll" style={{ height:"150px" }}>
                <div style={{ fontSize:"11px" }} className="text-secondary">
                <span> 🟢 : Able to Delivery  </span>
                <span> 🔴 : Not Able to Delivery  </span>
                </div>
                    {zipCodes.map(zipcode=>{
                        console.log(zipcode)
                        return(
                            <div key={ x++ } className="p-1 border-y hoverWhiteBorder bg-light" style={{ fontSize:"11px" }}>
                                <span onClick={()=> saveAddress(zipcode)} className="ms-3">{zipcode.Name}, {zipcode.Block}, {zipcode.District}, {zipcode.State}, {zipcode.Pincode} {zipcode.DeliveryStatus ==="Delivery" ?<span style={{ fontSize:"6px" }}> 🟢</span> : <span style={{ fontSize:"6px" }}> 🔴</span> } </span>
                            </div>
                        )
                    })}
            </div>
                }
        </div>
        </div>
        </>

    )  


    default:
        break;
}

}