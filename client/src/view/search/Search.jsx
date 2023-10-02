import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation,Link, useNavigate } from "react-router-dom"
import Template from "../template/Template";

export default function Search(){

    const {state} = useLocation();
    
    const navigate = useNavigate();

    const { categoryId, search } = state;
    
    console.log("category_id",categoryId)

    const [AllproductsArray, setAllProducts] = useState([]) 
    
    const [products, setProducts] = useState([])

    const recordPerPage = 3
    
    const [CurrentPage, setCurrentPage] = useState(1)

    const nbPages = Math.ceil(AllproductsArray.length/recordPerPage)
    
    const[ filters, setFilters ] =  useState([])

    const pagination = (thisPage)=>{
        let startIndex =( thisPage-1)*recordPerPage
        let endIndex = (thisPage)*recordPerPage
        let x = AllproductsArray.slice(startIndex, endIndex )
        setProducts(x)
    }

    const changePage = (event)=>{
        switch (event) {
            case "prev":
                if (CurrentPage > 1) {
                setCurrentPage(CurrentPage - 1)
                const thisPage = CurrentPage-1
                pagination(thisPage);
                }
                break;
        
                case "next":
                    if (CurrentPage < nbPages) {
                    setCurrentPage(CurrentPage + 1)
                    const thisPage = CurrentPage+1
                    pagination(thisPage);
                    }
                    break;

            default:
                break;
        }
    }

    useEffect(()=>{

        if (typeof state === null) {
            navigate('/')
        }

        axios.post(`http://localhost:4000/search?search=${search}&categoryId=${categoryId}`,{ filters:filters},  {
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(res=>{
        setAllProducts(res.data.products)
        const thisPage = 1
        let startIndex =( thisPage-1)*recordPerPage
        let endIndex = (thisPage)*recordPerPage
        let x = res.data.products.slice(startIndex, endIndex )
        setProducts(x)
        })
        .catch(err=>console.log(err))    

    },[search,categoryId,filters])
    
const filterHandler=(e)=>{
    switch (e.target.name) {
        case "sort":
            setFilters({
                ...filters,
                sort:e.target.value
            })
            break;
    
            case "sortPrice":
                setFilters({
                    ...filters,
                    sortPrice:e.target.value
                })
            break;

        default:
            break;
    }   
}






    return(


        <Template>

<>
        <div className="container">
            <div className="row">

            <div className="col-sm-12">

                <div className="d-flex flex-row w-100 fs-7 justify-content-end">
                <div className="filters mt-4 d-flex">
                <div className="sortby ">
                    <label htmlFor="sort" className="form-label me-2 fw-bold">Sort By</label>
                    <select  name="sort" onChange={filterHandler} id="sort" className="focus-border form-select" style={{ boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", border:"0px" }}>
                        <option value="default">Default</option>
                        <option value="lth">low to high</option>
                        <option value="htl">high to low</option>
                    </select>
                </div>
                {/* sort_by */}

                <div className="price">
                    <label htmlFor="sortPrice" className="form-label ms-2 fw-bold">Price</label>
                <select name="sortPrice" onChange={filterHandler} id="sortPrice" className="focus-border form-select" style={{ boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", border:"0px" }}>
                        <option value="under1000">under 1000</option>
                        <option value="1000to5000">1000 to 5000</option>
                        <option value="5000to10000">5000 to 10000</option>
                        <option value="10000to20000">10000 to 20000</option>
                        <option value="over20000">over 20000</option>
                    </select>
                </div>
                {/* price */}

                </div>
                </div>
            {/* filters side */}


            {products.map(product=>{
        return(
            <>
                <div className=" p-3 d-flex flex-column ">
                    <div className="card d-flex flex-row">
                    <div className="img w-25">
                        <img src={`http://localhost:4000/categoryImages/${product.image}`} className="w-100 drop-shadow" style={{ objectFit:"contain" }} height={"200px"}  alt="" />
                    </div>
                    {/* image ends here */}
                    <div className="Otherdetails w-75 align-self-center">
                    <div className="name fs-5 text-capital">
                                            <Link className="text-decoration-none text-dark hoverUnderline " to={'/product'} state={{ _id:product._id }}>{product.name}</Link> 
                    </div>
                    {/* name */}

                    <div className="pricing d-flex flex-column mt-2">
                                <span>
                                    <span className="fs-3">&#8377;{new Intl.NumberFormat('en-IN').format(product.salePrice)}</span>
                                <span className="saleTag ms-2">- {Math.round(100-(product.salePrice/product.price)*100)} %</span>
                                </span>
                                <span className="text-secondary my-2">M.R.P. <del className="text-secondary">&#8377;{new Intl.NumberFormat('en-IN').format(product.price)}</del></span>
                                <span className="text-capital fs-7">
                                    Inclusive of all taxes
                                </span>
                            </div>
                            {/* pricing */}

                    <div className="delivery text-secondary mt-2">
                    FREE Delivery by Amazon
                    </div>
                    {/* delivery */}

                    </div>
                        {/* details */}
                    </div>
            </div>
            {/* // product card ends here */}
            </>
        )
    })}
        </div>
            </div>
        </div>



    
        

             
<div className="container-fluid">
            <div className="justify-content-end row">
                <div className="col-sm-6 d-flex align-items-center justify-content-end">
                    <button onClick={ ()=> changePage("prev")  } style={{ borderRadius:"7px", outline:'none', border:"1px solid #D5D9D9", color:"rgb(131, 131, 131)" }} className="bg-white p-2 me-2" ><i className="me-2 fa-solid fa-backward"></i>Prev</button>
                    <span className="fw-bold"><span style={{ color:"#e47911" }}>{CurrentPage}</span> / <span style={{ color:"#febd69" }} >{nbPages}</span> </span>
                    <button onClick={ ()=> changePage("next") } style={{ borderRadius:"7px", outline:'none', border:"1px solid #D5D9D9", color:"rgb(131, 131, 131)" }} className="bg-white p-2 ms-2" >Next<i className="ms-2 fa-solid fa-forward"></i></button>
                </div>
            </div>
</div>
{/* pagination */}
</>
</Template>
    )
}