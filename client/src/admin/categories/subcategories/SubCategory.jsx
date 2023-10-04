import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useLocation, useParams } from "react-router-dom";
import AdminTemplate from "../../template/AdminTemplate";


function Specs({specs, product_id}){

    const x =  JSON.parse(specs)
    const specKeys = Object.keys(x)
    
        return(
            <div className="specifications card w-100 h-100" style={{ overflow:"auto"}}>
            <div className="p-1 mb-5 fw-bold d-flex align-items-center justify-content-between" style={{ backgroundColor:"#c4bdbd75" }}>
                <h1>Specifications</h1>
                            <Link to={'/editProductSpecs'} state={product_id}><i className="me-2 fa-2xl p-1 mt-2 text-success fa-solid fa-pen-to-square"></i></Link>
            </div>
            
                {
                specKeys.map(k=>{
                    return(
                        <div key={k} className= "mx-2 d-flex flex-column">
                        <span className="fw-bold">{k}</span>
                        <span className="text-secondary mb-2">{x[k]}</span>
                        <hr className="m-0 mb-1" />
                        </div>
                    )
                })
                }
        </div>
        )
  

}

export default function SubCategory(){

    const location = useLocation();


    const params  = location.state

    const [search, setSearch] = useState('')

    useEffect(()=>{
        axios.post(`http://localhost:4000/getSubCategory/${params._id}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(res=>setSubcategory(res.data.subCategory))
        .catch(err=>console.log(err))

        axios.post(`http://localhost:4000/getProducts/${params._id}?search=${search}`,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    .then(res=>{  
        setAllProducts(res.data.products);
        const thisPage = 1
        let startIndex =( thisPage-1)*recordPerPage
        let endIndex = (thisPage)*recordPerPage
        let x = res.data.products.slice(startIndex, endIndex )
        setProducts(x)
        })
    .catch(err=>console.log(err));

    }, [search])

    const [subCategory, setSubcategory] = useState()

    const [products, setProducts] = useState([]);

    const [AllProducts, setAllProducts] = useState([])
    
    const recordPerPage = 1

    const [CurrentPage, setCurrentPage] = useState(1)

    const nbPages = Math.ceil(AllProducts.length/recordPerPage)
    
    const pagination = (thisPage)=>{
        let startIndex =( thisPage-1)*recordPerPage
        let endIndex = (thisPage)*recordPerPage
        let x = AllProducts.slice(startIndex, endIndex )
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

    const searchHandler = (e)=>{
        setSearch(e.target.value)
}

    return(
        <AdminTemplate>
<div className="container">
            <div className="row">
                <div className="p-3 text-center col-sm-12">
                    <h1 style={{color:"#e47911", fontFamily:"sans-serif",textShadow: " 2px 3px 5px rgba(0,0,0,0.6)"
        }} className="fw-bold"> <i className="fa-solid fa-user"></i> Total {AllProducts.length} Products Found</h1>
                </div>
            </div>
        </div>
{/* number of found products heading */}

        <div className="container-fluid">
            <div className="row">
                <div className="p-3 col-sm-12">
                        <h5 style={{ textDecoration:"underline" }}>All {subCategory?.name} products table</h5>
                        <div className="d-flex justify-content-center px-5 my-2 align-items-center"  >
                            <input style={{ height:"35px", outline:"none", border:"1px solid #D5D9D9", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px" }} className="text-center px-2 w-100 d-block" placeholder="Search User" value={search} type="search" name="search" id="search" onChange={ searchHandler } />
                        <Link style={{ height:"35px", width:"45px", border:"none", padding:"7px", borderTopRightRadius:"5px", borderBottomRightRadius:"5px", backgroundColor:"#febd69" }}>
                        <i className="fa-solid text-black fa-magnifying-glass"></i>
                        </Link>
                        </div>

                        <div className="d-flex justify-content-end col-sm-12">
                        <Link to='addproduct' state={{ categoryId:subCategory?.categoryId, subCategoryId:subCategory?._id }} className="px-5 text-decoration-none h5 fw-bold hoverUnderline" > Add New  <i className="fa-regular fa-square-plus fa-xl"></i> </Link>
                        </div>
                </div>
            </div>
        </div>


        {products.map(item=>{
            return(
           <div className="container mb-4" key={ item._id }>
            <div className="row">
                <div className="col-sm-12 d-flex flex-row">
                    <div className="d-flex w-100 flex-column p-2 card">
                        <div className="editLink d-flex justify-content-end w-100">
                            <Link to={'editProduct'} state={{ _id:item._id }} ><i className="me-2 fa-2xl p-1 mt-2 text-success fa-solid fa-pen-to-square"></i></Link>
                            </div>
                        {/* edit link is here */}
                        <div className="img">
                            <img className="w-100 drop-shadow" style={{ objectFit:"contain", height:"150px" }} src={`http://localhost:4000/categoryImages/${item.image}`} alt="" />
                            <div className="devider mt-4"></div>
                        </div>
                        {/* img */}
                        <div className="d-flex flex-column text-capital Productdetails">
                        <div className="h5 name text-black">
                            {item.name}
                        </div>
                        {/* name */}
                        <div className="brand">
                            Brand :- 
                        <span className="fw-bold text-success brand">
                        {item.brand}
                        </span>
                        </div>
                        {/* brand */}
                        <div className=" priceing d-flex flex-column">
                        <span>Price : - {item.price}</span> <span> SalePrice :- {item.salePrice}</span>
                        </div>
                        {/* pricing */}
                        <div className="qty">
                        <span>Qty :- {item.qty}</span>
                        </div>
                        {/* qty */}
                        <div className="discription" style={{ fontSize:"11px" }}>
                            <div className="h6 fw-bold text-secondary m-0 p-0 mt-2">Discription</div>
                            {item.discription}
                        </div>
                        <div className="devider mt-4"></div>
                        <div className="categoryId">
                        categoryId : - {item.categoryId}
                        </div>
                        {/* category id */}
                        <div className="subcategoryid">
                        subCategoryId : - {item.subCategoryId}
                        </div>
                        <div className="productId">
                        productId (its own id) : - {item._id}
                        </div>
                        <div className="devider mt-4"></div>
                        </div>
                            {/* details */}

                    </div>
                    {/* product card */}
                    <div className="specificationComponent">
                    <Specs specs={item?.specifications} product_id={item._id} />
                    </div>
                    {/* product specifications */}
                </div>
            </div>
        </div>
        ) 
        })
            }


        <div className="container">
            <div className="justify-content-center row">
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button onClick={ ()=> changePage("prev")  } style={{ borderRadius:"7px", outline:'none', border:"1px solid #D5D9D9", color:"rgb(131, 131, 131)" }} className="bg-white p-2 me-2" ><i className="me-2 fa-solid fa-backward"></i>Prev</button>
                    <span className="fw-bold"><span style={{ color:"#e47911" }}>{CurrentPage}</span> / <span style={{ color:"#febd69" }} >{nbPages}</span> </span>
                    <button onClick={ ()=> changePage("next") } style={{ borderRadius:"7px", outline:'none', border:"1px solid #D5D9D9", color:"rgb(131, 131, 131)" }} className="bg-white p-2 ms-2" >Next<i className="ms-2 fa-solid fa-forward"></i></button>
                </div>
            </div>
        </div>
{/* pagination */}

        </AdminTemplate>
    )
}