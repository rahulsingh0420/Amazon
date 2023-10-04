import { useLocation } from "react-router-dom";
import AdminTemplate from "../../template/AdminTemplate";
import { useEffect, useState } from "react";
import axios from "axios";
import SuccessBanner from "../../component/SuccessBanner";


function Input({specs, k, setSpecs}){
    const [input, setInput] = useState([]);
    
    const inputHandler = (e)=>{
       setInput(e.target.value)
    }

    const deleteSpecification = (k)=>{
        delete specs[k]
       setSpecs({
        ...specs
       })
    }

    const saveSpecification = (k)=>{
        document.getElementById(`save_${k}`).style.display = "none"
        document.getElementById(`edit_${k}`).style.display = "inline"
        document.getElementById(`input_${k}`).style.display = "none"
        document.getElementById(k).style.display = "block"
        specs[k] = input;
        setSpecs({
            ...specs
        })
    }

    const editSpecification = (k)=>{
        document.getElementById(k).style.display = "none"
        document.getElementById(`input_${k}`).style.display = "inline"
        document.getElementById(`save_${k}`).style.display = "inline"
        document.getElementById(`edit_${k}`).style.display = "none"
        setInput(specs[k])
    }

    return(
        <div key={k} className="d-flex felx-row justify-content-between">
                            <div key={k} className= "mx-2 d-flex flex-column mb-3">
                        <span className="fw-bold">{k}</span>
                        <span className="text-secondary mb-2 mt-1" id={k}>{specs[k]}</span>
                        <input type="text" id={`input_${k}`} onChange={inputHandler} value={input} style={{display:"none"}} className="m-1 form-control focus-border" />
                        <hr className="m-0 mb-1" />
                        </div>

                        <div>
                            <button onClick={()=>saveSpecification(k)} style={{display:"none"}}  id={`save_${k}`} className="btn"><i className="fa fa-check text-success fw-bold"></i></button>
                            <button onClick={()=>editSpecification(k)} id={`edit_${k}`} className="btn"><i className="fa fa-pen text-success fw-bold"></i></button>
                            <button onClick={()=>deleteSpecification(k)} className="btn"><i className="fa fa-trash text-danger fw-bold"></i></button>
                        </div>

                        </div>
    )

}


export default function EditProductSpecs() {
    
    const addNew = ()=>{
        specs[newSpec] = newSpecVal
        setNewSpec('')
        setNewSpecVal('')
        setSpecs({
            ...specs
        })
    }

    const [newSpec, setNewSpec] = useState('')

    const [newSpecVal, setNewSpecVal] = useState('')

    const newSpecInputHandler = (e)=>{
        setNewSpec(e.target.value)
    }
    
    const newSpecValHandler = (e)=>{
        setNewSpecVal(e.target.value)
    }

    const location = useLocation();
    
    const [successMsg, setSuccessMsg] = useState(null)

    const [specs, setSpecs] = useState([]);
    
    const specKeys = Object.keys(specs)
    
    const _id  = location.state

    useEffect(()=>{
        axios.post(`http://localhost:4000/getProduct`, {_id:_id},{
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
  })
  .then(res=>{
    const x = JSON.parse(res.data.product.specifications)
    setSpecs(x)
  })
  .catch(err=>console.log(err))
    },[])

    const saveChanges = ()=>{
        const x = JSON.stringify(specs)
        axios.post(`http://localhost:4000/changeSpecs`,{x:x, _id:_id},{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(res=>{
            if (res.status) {
                setSuccessMsg("Specification Updated Successfully")
            }
        })
        .catch(err=>console.log(err))
    }

    return(
        <AdminTemplate>
          <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <SuccessBanner msg={successMsg} />
                    <h1 className="text-amazon my-4">
                        Edit Specifications
                    </h1>
                    {
                specKeys.map(k=>{
                    return(
                        <Input key={k} specs={specs} k={k}  setSpecs={setSpecs}/>
                    )
                })
                }
                </div>
                <div className="d-flex flex-row">
                    <div className="me-2">
                    <input type="text" placeholder="Specification Key" className="form-control" name="spec" value={newSpec} onChange={newSpecInputHandler} />
                    </div>
                    <div className="me-2">
                    <input type="text" placeholder="Specification Value" className="form-control" name="value" value={newSpecVal} onChange={newSpecValHandler} />
                    </div>
                    <button onClick={addNew} className="btn btn-success">Add New</button>
                </div>
                <div className="col-sm-12 p-3"> 
                    <button onClick={saveChanges} className="btn btn-warning">Save Changes</button>
                </div>
            </div>
          </div>
        </AdminTemplate>
    )


}