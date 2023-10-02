export default function SuccessBanner(params){

    if (params.msg !== null) {
        switch (params.case) {
            case "cart":
                
        return(
            <div className="container-fluid mt-1">
                <div className="row justify-content-center">
                    <div className="col-sm-12">
                        <div className="alert alert-success d-flex flex-row">
                            <div className="w-25 justify-content-center align-items-center d-flex " style={{ flex:"1" }}>
                                <i className="fa-solid fa-triangle-exclamation me-2 fa-2xl"></i>
                            </div>
                            <div className="w-75 d-flex flex-column">
                                <span>{params.msg}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )                
                break;
        
            default:
                break;
        }
        return(
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-5">
                        <div className="alert alert-success d-flex flex-row">
                            <div className="w-25 justify-content-center align-items-center d-flex " style={{ flex:"1" }}>
                                <i className="fa-solid fa-triangle-exclamation me-2 fa-2xl"></i>
                            </div>
                            <div className="w-75 d-flex flex-column">
                                <h4 className="fw-bold">Congratulations </h4>
                                <span>{params.msg}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    
    }