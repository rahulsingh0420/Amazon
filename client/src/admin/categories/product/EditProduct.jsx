import AdminTemplate from "../../template/AdminTemplate";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SuccessBanner from "../../component/SuccessBanner";


export default function EditProduct(){

    const location = useLocation()
    const params = location.state

 const[product, setProduct] = useState({
        name:"",
        price:"",
        salePrice:"",
        qty:"",
        discription:"",
        brand:"",
        image:""
    })

    useEffect(()=>{
        const _id ={ _id: params._id }
        axios.post("http://localhost:4000/getproduct", _id, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded" 
            }
        })
        .then(res=> setProduct(res.data.product))
        .catch(err=>console.log(err))
    },[])

   

    const [error, setError] = useState(null)

    const [msg, setMsg] = useState(null)

    const submitHandler = (e)=>{
        e.preventDefault()
        setError(null)
        setMsg(null)

        const form = new FormData()
        form.append("name", product.name)
        form.append("price", product.price)
        form.append("salePrice", product.salePrice)
        form.append("qty", product.qty)
        form.append("discription", product.discription)
        form.append("brand", product.brand)
        form.append("image", product.image)
        form.append("_id", params._id)

        axios.post("http://localhost:4000/editproduct", form, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded" 
            }
        })
        .then(res=> {
            if(res.data.status){
            setMsg("Category Updated Successfully")
            }else{
                setError(res.data.message)
            }
        } )
        .catch(err=>console.log(err))

    }

    const inputHandler = (e)=>{
        switch (e.target.name) {
            case "name":
                setProduct({
                    ...product,
                    name:e.target.value
                })
                break;

            case "price":
                setProduct({
                    ...product,
                    price:e.target.value
                })
                break;

            case "salePrice":
                setProduct({
                    ...product,
                    salePrice:e.target.value
                })
                break;

            case "qty":
                setProduct({
                    ...product,
                    qty:e.target.value
                })
                break;

            case "discription":
                setProduct({
                    ...product,
                    discription:e.target.value
                })
                break;

            case "brand":
                setProduct({
                    ...product,
                    brand:e.target.value
                })
                break;

            case "image":
                setProduct({
                    ...product,
                    image:e.target.files[0]
                })
                break;
        
            default:
                break;
        }
    }

    return(
        
        <AdminTemplate>
                    
{ msg !==null && <SuccessBanner msg={msg} />}



<div className="container mt-3">
<div className="row justify-content-center">
    <div className="d-flex justify-content-center col-sm-12 col-md-10">
        <div className="w-100 shadow p-3 card" style={{ backgroundColor:"#131921", color:"#e47911" }}>
        
        <div className=" mx-auto">
        <h3 className="text-white mb-4 mt-3 text-decoration-underline" style={{ color:"#131921" }}>
            Add new product
        </h3>
        </div>
    {/* add category heading is ends here */}
            <form className="w-100 px-sm-0 px-md-5 mx-auto mb-3" onSubmit={ submitHandler }>
               
               <div className="d-flex flex-row justify-content-between">
               <div className="mb-3 w-100 me-2">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" required onChange={ inputHandler } value={product.name} placeholder="Enter product name" className="focus-border d-block w-100 py-2 px-1" />
                </div>
                {/* name ends here */}

                <div className="mb-3 w-50">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="price" onChange={ inputHandler } value={product.price} placeholder="Enter product price" className="focus-border d-block w-100 py-2 px-1" />
                </div>
                {/* price */}
               </div>

                <div className="flex-row d-flex w-100 justify-content-between">
                <div className="mb-3 w-100 me-2">
                <label htmlFor="salePrice" className="form-label">Sale price</label>
                <input type="number" name="salePrice" onChange={ inputHandler } value={product.salePrice} placeholder="Enter product sale price" className="focus-border d-block w-100 py-2 px-1" />
                </div>
                {/* sale price */}


                <div className="mb-3 w-100">
                <label htmlFor="qty" className="form-label">QTY</label>
                <input type="number" name="qty" onChange={ inputHandler } value={product.qty} placeholder="Quantity" className="focus-border d-block w-100 py-2 px-1" />
                </div>
                {/* qty */}
                </div>


                
                <div className="mb-3">
                <label htmlFor="discription" className="form-label">Discription</label> 
                <input type="text" name="discription" onChange={ inputHandler } value={product.discription} placeholder="Enter product discription" className="focus-border d-block w-100 py-2 px-1" />
                </div>
                {/* discription */}

                <div className="d-flex flex-row justify-content-between">
                <div className="mb-3 w-100 me-2">
                <label htmlFor="brand" className="form-label">Brand</label>
                <input type="text" name="brand" onChange={ inputHandler } value={product.brand} placeholder="Brand" className="focus-border d-block w-100 py-2 px-1" />
                </div>
                {/* qty */}

                <div className="mb-3 w-100">
                <label htmlFor="image" className="form-label">Product Image</label>
                <input className="form-control d-block w-100 py-2 focus-border" style={{ borderRadius:"0px" }} onChange={ inputHandler } type="file" name="image" id="image" />
                                <span className="text-danger" style={{ fontSize: "12px" }}>{error !== null && error}</span>
                </div>
                {/* product image ends here */}
                </div>

                <div className="mb-3 d-flex w-100 flex-row justify-content-center">
                    <Link to='/categories/subCategory' state={{ _id:product.subCategoryId }} className="btn btn-secondary mt-2 w-50 rounded">
                        Cancel
                    </Link>
                    <button type="submit" className="ms-2 btn btn-danger mt-2 w-100 rounded">
                        Update Product
                    </button>
                </div>

            </form>
        </div>
    </div>

</div>
</div>



        </AdminTemplate>

    )
}