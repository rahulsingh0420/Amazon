
import { Link, useNavigate } from "react-router-dom";
import Template from "./view/template/Template";
import one from "./images/one.jpg";
import two from "./images/two.jpg";
import three from "./images/three.jpg";
import { useEffect, useState } from "react";
import axios from "axios";


function Products({categoryId, category}){

const [productFour, setProducts] = useState([])

useEffect(()=>{
  axios.post(`http://localhost:4000/getProductsLimit`, {categoryId:categoryId, limit:4},{
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
  })
  .then(res=>setProducts(res.data.products))
  .catch(err=>console.log(err))
},[categoryId])


return(
  productFour.map(item=>{
    const x = JSON.parse(item.specifications)
    return (
      <Link to={'product'} state={{ _id:item._id }} key={ item._id } className="text-decoration-none d-grid col-md-4 mb-2 col-lg-3 col-sm-12">
        <div className="flex-column product-card card p-2 ">
      <div className="img">
            <img src={`http://localhost:4000/categoryImages/${item.image}`} className="w-100 drop-shadow" alt={item.name} height={"150px"} style={{ objectFit:"contain" }} />
          <hr />
      </div>  
      {/* image */}
      <div className="text-capital fs-6 product-name name">
        {item.name}
      </div>
      {/* name */}
      <div className="my-1 category">
      <span className="tag text-capital">A {category} Product</span>
      </div>
      {/* category name */}
      <div className="pricing d-flex flex-column">
          <span>
            <span className="text-success fs-4">&#8377;{new Intl.NumberFormat('en-IN').format(item.salePrice)}</span>
            <span className="saleTag ms-2">{Math.round(100-(item.salePrice/item.price)*100)} %</span>
            </span>
          <span className="text-secondary">M.R.P. <del className="text-secondary">&#8377;{new Intl.NumberFormat('en-IN').format(item.price)}</del></span> 
      </div>
      {/* pricing */}
        </div>
      
  </Link>
    )
  })
)


}


function CrowselCard({categoryId, category}) {

  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.post(`http://localhost:4000/getProductsLimit`, {categoryId:categoryId, limit:4},{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(res=>setProducts(res.data.products))
    .catch(err=>console.log(err))

  },[categoryId])


return(
  <div className="col-sm-12 col-md-4 col-lg-3 mt-2 ">
  <div className="card d-flex flex-column p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", border:"0px"}}>
      <span className="fs-4 fw-bold mb-2 text-capital">{category}</span>
      {/* heading */}
      <div className="row text-center">
          {products.map(product=>{
            return(
            <Link to={'/product'} state={{ _id:product._id }} className="hoverUnderline text-decoration-none text-amazon col-sm-6 d-flex flex-column">
              <img src={ `http://localhost:4000/categoryImages/${product.image}` } className="p-2 hoverUp drop-shadow" width={"150px"} height={"150px"} style={{ objectFit:"contain" }} alt="" />
              <span> &#8377; {new Intl.NumberFormat('en-IN').format(product.salePrice)}</span>
            </Link>
            )
          })}
      </div>
  </div>
  </div>

)



}

export default function App(){
  
const Navigate = useNavigate();

const [categories, setCategories] = useState([])

  const categoriesFour = categories.slice(0,4)

function navigateToSearch(searchCategory){
  Navigate('/search', { state: { categoryId: searchCategory, search: '' }});
  console.log(searchCategory)
}

useEffect(()=>{
  axios.get("http://localhost:4000/getcategories?search=")
  .then(res=>setCategories(res.data.categories))
  .catch(err=>console.log(err))
},[])



  return(
    <>
    
    <Template>

<div style={{ maxHeight:"860px"}}>
<div style={{ maxHeight:"240px", zIndex:"0", position:"relative" }}>
<div>
<button className="carousel-control-prev focus-border" style={{ width:"6%"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
</div>
<div id="carouselExampleAutoplaying" className="carousel slide" style={{ zIndex:"0", objectFit:"contain"}} data-bs-ride="carousel">
  <ol className="carousel-inner crowsel-list">
    <li className="carousel-item active">
    <img src={one} className="d-block w-100" alt="..."/>
    </li>
    <li className="carousel-item">
    <img src={two} className="d-block w-100" alt="..."/>
    </li>
    <li className="carousel-item">
    <img src={three} className="d-block w-100" alt="..."/>
    </li>
  </ol>
</div>
<div>
<button className="carousel-control-next focus-border"  style={{ width:"6%"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
</div>
{/* crowsel and */}



<div className="offers container-fluid" style={{ zIndex:"1", position:"relative" }}>
  <div className="row justify-content-around">

      {categoriesFour.map(category=>{
        return(
          <CrowselCard category={category.name} categoryId={category._id}  />
        )
      })}



  </div>
</div>
{/* offer ends here */}






      <div className="container-fluid mt-4 ">
{
  categories.map(item=>{
    return(
    <div className="row mb-3 shadow" key={item._id}>
    <div className="col-sm-12">
        <div className="d-flex flex-column card m-2" style={{ border:"none"}}>
          <div className="header">
            <div className="fs-4 fw-bold text-capital">{item.name} <Link onClick={()=>navigateToSearch(item._id,'')} className="fs-7 fw-normal text-amazon hoverUnderline text-decoration-none">view all</Link> </div>
          </div>  
          {/* header */}
        </div>
    </div>
    
               <Products category={item.name} categoryId={item._id} />
          
              {/* products */}
  </div>
    )
  })
}
</div>








    </Template>

    </>
  )
}