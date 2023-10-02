const express = require("express");

const app = express();

PORT = 4000;

const cors = require("cors")
app.use(cors())

const shortid = require('shortid');

const razorpay = require("razorpay")

const bodyParser = require("body-parser")
const clientPromise = require("./connect")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const { body, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");


const isExist = async function isExist(req, res, next) {
    let existNo = null
    let existEmail = null
    const client = await clientPromise;
    const db = client.db("amazon")
    const body = req.body;
    const _id = req.params._id
    const UserToUpdate = await db.collection("users").findOne({ _id: new ObjectId(_id) })
    if (UserToUpdate.mobileNo !== body.mobileNo) {
        existNo = await db.collection("users").findOne({ mobileNo: body.mobileNo })
    }
    if (UserToUpdate.email !== body.email) {
        existEmail = await db.collection("users").findOne({ email: body.email })
    }
    if (existNo !== null) {
        var err = "Number is already exists"
    } else if (existEmail !== null) {
        var err = "Email is already exists"
    }
    if (typeof err === "undefined") {
        next();
    } else {
        res.json({ existErr: err })
    }
}

const exist = async function exist(req, res, next) {
    const client = await clientPromise;
    const db = client.db("amazon")
    const body = req.body;
    const existNo = await db.collection("users").findOne({ mobileNo: body.mobileNo })
    const existEmail = await db.collection("users").findOne({ email: body.email })


    if (existNo !== null) {
        var err = "Number is already exists"
    } else if (existEmail !== null) {
        var err = "Email is already exists"
    }

    if (typeof err === "undefined") {
        next();
    } else {
        res.json({ existErr: err })
    }

}

app.post('/register', exist,
    body("name").isLength({ min: 1 }).withMessage(" Enter your name "),
    body("mobileNo").isLength({ min: 1 }).withMessage(" Enter your Mobile number "),
    body("email").isLength({ min: 1 }).withMessage(" Enter your email "),
    body("password").isLength({ min: 6 }).withMessage(" Enter your password "),
    async (req, res) => {

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            const body = req.body
            const client = await clientPromise;
            const db = client.db("amazon")
            const name = body.name
            const mobileNo = body.mobileNo
            const email = body.email
            const password = body.password
            db.collection("users").insertOne({ name: name, mobileNo: mobileNo, email: email, password: password, userType: "user" })
            res.json('Registered')
        } else {
            res.json({ errors: errors.array() })
        }


    })

app.post('/deleteUser/:_id', async (req, res) => {
    const client = await clientPromise
    const db = client.db("amazon")
    db.collection("users").deleteOne({ _id: new ObjectId(req.params._id) })
    res.json("Deleted User Successfully")
})

app.get('/users', async (req, res) => {
    q = req.query.search

    const keys = ["name", "mobileNo", "email"]

    const client = await clientPromise
    const db = client.db("amazon")
    const x = await db.collection("users").find({}).toArray()

    let users = x.filter((item) => keys.some((k) => item[k].toLowerCase().includes(q)))

    if (typeof q === "undefined") {
        res.json({ users: x })
    } else {
        res.json({ users })
    }
})

app.post('/loginFirstPage',
    body("name").isLength({ min: 1 }).withMessage(" Enter mobile phone number or email "),
    async (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const body = req.body
            const client = await clientPromise
            const db = client.db("amazon")
            let user = await db.collection("users").findOne({ email: body.name })
            if (user === null) {
                user = await db.collection("users").findOne({ mobileNo: body.name })
                if (user !== null) {
                    res.json({ email: user.email })
                } else {
                    res.json({ email: null })
                }
            } else {
                res.json({ email: user.email })
            }
        } else {
            res.json(errors)
        }


    })

app.post('/login',
    body("password").isLength({ min: 1 }).withMessage(" Enter your password "),
    async (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const client = await clientPromise
            const db = client.db("amazon")
            const body = req.body
            const user = await db.collection("users").findOne({ email: body.email, password: body.password })
            res.json({ user: user })
        } else {
            res.json(errors)
        }
    })

app.get('/getUser/:_id', async (req, res) => {
    const client = await clientPromise
    const db = client.db("amazon")
    const _id = req.params._id
    const user = await db.collection("users").findOne({ _id: new ObjectId(_id) })
    if (user === null) {
        res.json({ status: false })
    } else {
        res.json({ user: user, status: true })
    }
})

app.post('/editUser/:_id', isExist,
    body("name").isLength({ min: 1 }).withMessage(" Enter user's name "),
    body("mobileNo").isLength({ min: 1 }).withMessage(" Enter user's Mobile number "),
    body("email").isLength({ min: 1 }).withMessage(" Enter user's email "),
    body("password").isLength({ min: 6 }).withMessage(" Enter user's password "),
    async (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const body = req.body
            const client = await clientPromise
            const db = client.db("amazon")
            db.collection("users").updateOne({ _id: new ObjectId(req.params._id) }, {
                $set: {
                    name: body.name,
                    mobileNo: body.mobileNo,
                    email: body.email,
                    password: body.password
                }
            })
            res.json("updated")
        } else {
            res.json(errors)
        }

    })


const multer = require("multer");
const Razorpay = require("razorpay");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/categoryImages')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});


let filter = function (req, file, cb) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/webp") {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type only jpeg, jpg, png, webp files are allowed.'));
    }
}


let upload = multer({
    storage: storage,
    fileFilter: filter,
    limits: { fileSize: 1024 * 1024 }
}).single('image')


app.post('/addcategory', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: false, message: err.message })
        }
        const client = await clientPromise
        const db = client.db("amazon")
        const category = await db.collection("categories").findOne({ name: req.body.name.toLowerCase() })
        if (category === null) {
            db.collection("categories").insertOne({
                name: req.body.name.toLowerCase(),
                discription: req.body.discription,
                image: req.file.filename
            })
            return res.json({ status: true })
        } else {
            res.json({ status: false, existErr: "Category Already Exists" })
        }

    })
})

app.get('/getcategories', async (req, res) => {
    const q = req.query.search.toLowerCase()
    const keys = ["name"]
    const client = await clientPromise
    const db = client.db("amazon")
    const x = await db.collection("categories").find({}).toArray()
    const categories = x.filter(item => keys.some((k) => item[k].toLowerCase().includes(q)))
    res.json({ categories })
})

app.get('/getCategory/:_id', async(req,res) => {
    const client = await clientPromise
    const db = client.db("amazon")
    const category = await db.collection("categories").findOne({_id: new ObjectId(req.params._id)})
    res.json({ category })
})

app.post('/editCategory/:_id', async (req, res) => {
        const _id = req.params._id
        const client = await clientPromise
        const db = client.db("amazon")
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: false, message: err.message })
        }else{
            const categoryToUpdate = await db.collection("categories").findOne({ _id: new ObjectId(_id) })
            if (categoryToUpdate.name.toLowerCase() !== req.body.name.toLowerCase()) {
            const exist = await db.collection("categories").findOne({ name: req.body.name.toLowerCase() })
                if (exist !== null) {
                  return  res.json({ status: false, existErr: "Category Already Exists"})
                }
            } 
                 if (typeof req.file === "undefined") {
                    db.collection("categories").updateOne({_id: new ObjectId(_id)},{
                        $set:{
                        name: req.body.name.toLowerCase(),
                        discription: req.body.discription,
                        }
                    })
                 } else {
                    db.collection("categories").updateOne({_id: new ObjectId(_id)},{
                        $set:{
                        name: req.body.name.toLowerCase(),
                        discription: req.body.discription,
                        image: req.file.filename
                        }
                    })
                 }
                    return res.json({ status: true })
        }
    })
})

app.post('/getcategory/:_id', async (req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const category = await db.collection("categories").findOne({_id: new ObjectId(req.params._id)})
    res.json({category})
})

app.post('/getSubCategories/:_id', async (req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const SubCategories = await db.collection("subcategories").find({categoryId: req.params._id}).toArray()
    res.json({SubCategories})
})

app.post('/addSubCategory', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: false, message: err.message })
        }
        const client = await clientPromise
        const db = client.db("amazon")
        const category = await db.collection("subcategories").findOne({ name: req.body.name.toLowerCase() })
        if (category === null) {
            db.collection("subcategories").insertOne({
                name: req.body.name.toLowerCase(),
                image: req.file.filename,
                categoryId: req.body._id
            })
            return res.json({ status: true })
        } else {
            res.json({ status: false, existErr: "Sub-Category Already Exists"})
        }

    })
})

app.post('/getSubCategory/:_id', async (req,res) =>{
    const client = await clientPromise
    const db = client.db("amazon")
    const subCategory = await db.collection("subcategories").findOne({_id: new ObjectId(req.params._id)})
    res.json({subCategory})
})

app.post('/editSubCategory/:_id', async (req, res) => {
    const _id = req.params._id
    if(_id.length === 24){
    const client = await clientPromise
    const db = client.db("amazon")
    upload(req, res, async (err) => {
    if (err) {
        return res.json({ status: false, message: err.message })
    }else{
        const subcategoryToUpdate = await db.collection("subcategories").findOne({ _id: new ObjectId(_id) })
        if (subcategoryToUpdate.name.toLowerCase() !== req.body.name.toLowerCase()) {
        const exist = await db.collection("subcategories").findOne({ name: req.body.name.toLowerCase() })
            if (exist !== null) {
              return  res.json({ status: false, existErr: "Category Already Exists"})
            }
        } 
        if (typeof req.file === "undefined") {
            db.collection("subcategories").updateOne({_id: new ObjectId(_id)},{
                $set:{
                name: req.body.name.toLowerCase(),
                }
            })
         } else {
            db.collection("subcategories").updateOne({_id: new ObjectId(_id)},{
                $set:{
                name: req.body.name.toLowerCase(),
                image: req.file.filename
                }
            })
         }
                return res.json({ status: true })
    }
})
}
})

app.post('/getProducts/:_id',  async (req, res) => {
    
    q = req.query.search
    const subCategoryId = req.params._id

    const keys = ["name", "subCategoryId", "categoryId", "price", "salePrice", "qty", "brand"]

    const client = await clientPromise
    const db = client.db("amazon")
    const x = await db.collection("products").find({subCategoryId:subCategoryId}).toArray()

    let products = x.filter((item) => keys.some((k) => item[k].toLowerCase().includes(q)))

    if (typeof q === "undefined") {
        res.json({ products: x })
    } else {
        res.json({ products })
    }
})

app.post('/addproduct', async(req,res)=>{
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: false, message: err.message })
        }
        const client = await clientPromise
        const db = client.db("amazon")
            db.collection("products").insertOne({
                name: req.body?.name?.toLowerCase(),
                price:parseInt(req.body?.price),
                salePrice:parseInt(req.body?.salePrice),
                qty:parseInt(req.body?.qty),
                discription:req.body?.discription?.toLowerCase(),
                brand:req.body?.brand?.toLowerCase(),
                image: req.file?.filename,
                categoryId: req.body?.categoryId,
                subCategoryId: req.body?.subCategoryId,
                specifications: req.body.specifications
            })
            return res.json({ status: true })
        })
    })

app.post('/getproduct', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const _id = req.body._id 
    const product = await db.collection("products").findOne({ _id: new ObjectId(_id) })
    res.json({product})
})

app.post('/editproduct', async(req,res)=>{
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: false, message: err.message })
        }
        const client = await clientPromise
        const db = client.db("amazon")
        const _id = req.body._id

        if (typeof req.file === "undefined") {
                db.collection("products").updateOne({_id: new ObjectId(_id)},{
                    $set:{
                        name: req.body?.name?.toLowerCase(),
                        price:parseInt(req.body?.price),
                        salePrice:parseInt(req.body?.salePrice),
                        qty:parseInt(req.body?.qty),
                        discription:req.body?.discription?.toLowerCase(),
                        brand:req.body?.brand?.toLowerCase(),
                    }
                })
             } else {
                db.collection("products").updateOne({_id: new ObjectId(_id)},{
                    $set:{
                        name: req.body?.name?.toLowerCase(),
                        price:req.body?.price,
                        salePrice:req.body?.salePrice,
                        qty:req.body?.qty,
                        discription:req.body?.discription?.toLowerCase(),
                        brand:req.body?.brand?.toLowerCase(),
                        image: req?.file?.filename,
                    }
                })
             }

            return res.json({ status: true })
        })
    })

app.post('/getProducts', async(req,res)=>{
    const categoryId = req.body.categoryId
    const client = await clientPromise
    const db = client.db("amazon")
    const products = await db.collection("products").find({categoryId:categoryId}).toArray()
    res.json({products})
})

app.post('/getProductsLimit', async(req,res)=>{
    const categoryId = req.body.categoryId
    const client = await clientPromise
    const db = client.db("amazon")
    const products = await db.collection("products").find({categoryId:categoryId}).limit(parseInt(req.body.limit)).toArray()
    res.json({products})
})

app.post('/cartProduct', async(req, res)=>{
    const userId = req.body.userId
    const productId = req.body.productId
    const client = await clientPromise
    const db = client.db("amazon")
    const exist = await db.collection("carts").findOne({userId:userId,productId:productId})
    if (exist === null) {
        db.collection("carts").insertOne({userId:userId,productId:productId,qty:"1",selected:true})
    } else {
        if (exist.qty < 11) {
            db.collection("carts").updateOne({userId:userId,productId:productId}, {
                $set:{
                    qty:parseInt(exist.qty)+1
                }
            })
        }
    }
    return res.json({status:true})
})

app.post('/getCarts', async(req,res)=>{
    const userId = req.body.userId
    const client = await clientPromise
    const db = client.db("amazon")
    const carts = await db.collection("carts").find({userId:userId}).toArray()
    res.json({carts}) 
})

app.post('/UpdateCartQty', async(req, res)=>{
    const userId = req.body.userId
    const productId = req.body.productId
    const client = await clientPromise
    const db = client.db("amazon")
    const qty = req.body.qty
        if (qty < 11) {
            db.collection("carts").updateOne({userId:userId,productId:productId}, {
                $set:{
                    qty:parseInt(qty)
                }
            })
        }
    return res.json({status:true})
})

app.post('/getCartProducts', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const cartProducts = await db.collection("carts").find({userId: req.body._id  }).toArray()
    res.json({ cartProducts })
})

app.post('/getCartProductsArray', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    var carts = await db.collection("carts").find({userId: req.body._id  }).sort({"name": 1}).toArray()
    
    let cartProducts = carts.map(async( cart) => { 
        let product = await db.collection("products").findOne({_id: new ObjectId(cart.productId)})
        cartProducts.push(product);
        return cartProducts;
    });
    await Promise.all(cartProducts);
    cartProducts = cartProducts.slice(cartProducts.length/2, cartProducts.length)
    res.json({ cartProducts })
})

app.post('/deleteCart', async(req, res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const productId = req.body.productId;
    const userId = req.body.userId;
    await db.collection("carts").deleteOne({userId:userId, productId:productId})
    res.json({status:true})
})

app.post('/recommends', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const cart = await db.collection("carts").findOne({userId: req.body.userId})
    const product = await db.collection("products").findOne({_id: new ObjectId(cart.productId)})
    const recommends = await db.collection("products").find({categoryId:product.categoryId}).limit(4).skip(req.body.status).toArray()

})

app.post('/getAddress',async(req,res)=>{
    const userId = req.body.userId
    const client = await clientPromise
    const db = client.db("amazon")
    const addresses = await db.collection("address").find({userId:userId}).toArray()
    res.json({addresses})
})

app.post('/addAddress',
    body("name").isLength({ min: 1 }).withMessage(" Enter your name "),
    body("mobileNo").isLength({ min: 1 }).withMessage(" Enter your Mobile number "),
    body("flat").isLength({ min: 1 }).withMessage(" Enter your flat "),
    body("landmark").isLength({ min: 1 }).withMessage(" Enter a landmark "),
    body("pincode").isLength({ min: 1 }).withMessage(" Enter valid pincode "),   
    async(req,res)=>{
       const errors =  validationResult(req)
        if (errors.isEmpty()) {
            const client = await clientPromise
            const db = client.db("amazon")
    const userId = req.body.userId
    const addresses = await db.collection("address").find({userId:userId}).toArray()
    if (addresses.length > 0) {
        const defaultAddress = false
        const address = req.body
        db.collection("address").insertOne({
        region:address.region,
        name:address.name,
        mobileNo:address.mobileNo,
        flat:address.flat,
        landmark:address.landmark,
        pincode:address.pincode,
        state:address.state,
        district:address.district,
        userId:address.userId,
        default:defaultAddress
    })
    } else {
        const defaultAddress = true
        const address = req.body
        db.collection("address").insertOne({
        region:address.region,
        name:address.name,
        mobileNo:address.mobileNo,
        flat:address.flat,
        landmark:address.landmark,
        pincode:address.pincode,
        state:address.state,
        district:address.district,
        userId:address.userId,
        default:defaultAddress
    })
    }
    
    res.json({status:true})
    }else{
        res.json({errors: errors.array(), status:false})
    }
})

app.post('/deleteAddress', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const _id = req.body._id;
    await db.collection("address").deleteOne({_id:new ObjectId(_id)})
    res.json({status:true})
})

app.post('/getAddressToEdit', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const address = await db.collection("address").findOne({_id:new ObjectId(req.body._id)})
    res.json({address})
})

app.post('/editAddress',body("name").isLength({ min: 1 }).withMessage(" Enter your name "),
body("mobileNo").isLength({ min: 1 }).withMessage(" Enter your Mobile number "),
body("flat").isLength({ min: 1 }).withMessage(" Enter your flat "),
body("landmark").isLength({ min: 1 }).withMessage(" Enter a landmark "),
body("pincode").isLength({ min: 1 }).withMessage(" Enter valid pincode "),  
 async(req,res)=>{
    const address = req.body
    const client = await clientPromise
    const db = client.db("amazon")
    db.collection("address").updateOne({_id: new ObjectId(address._id)}, {
        $set:{
        region:address.region,
        name:address.name,
        mobileNo:address.mobileNo,
        flat:address.flat,
        landmark:address.landmark,
        pincode:address.pincode,
        state:address.state,
        district:address.district,
        userId:address.userId,
        }
    })
    res.json({status:true})
})

app.post('/setDefaultAddress', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
   await db.collection("address").updateMany({userId: req.body.userId}, {
        $set:{
            default:false
        }
    })
    db.collection("address").updateOne({_id: new ObjectId(req.body._id)}, {
        $set:{
            default:true
        }
    })
    res.json({status:true})
})

app.post('/search', async(req,res)=>{
    const search = req.query?.search
    const categoryId = req.query?.categoryId
    const client = await clientPromise
    const db = client.db("amazon")
    let x = []
    if (categoryId === "all") {

        if (req.body.filters?.sort === "htl") {
            x = await db.collection("products").find({}).sort({ salePrice: -1}).toArray()
            console.log("htl")
        } else if (req.body.filters?.sort === "lth") {
                x = await db.collection("products").find({}).sort({ salePrice: 1}).toArray()
        }
        else{
                x = await db.collection("products").find({}).toArray()
        }

        let products = x.filter(item=> item["name"].toLowerCase().includes(search))
        if (typeof req.body.filters?.sortPrice !== "undefined") { 
            if(typeof req.body.filters.sortPrice !== "undefined"){
                switch (req.body.filters.sortPrice) {
                    case "under1000":
                        products = products.filter(item=> parseInt(item["salePrice"]) < 1000 )
                        res.json({products})
                        break;
                        
                        case "1000to5000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 5000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 1000 )
                            console.log(products)
                            res.json({products})
                        break;
                        
                        case "5000to10000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 10000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 5000 )
                            console.log(products)
                            res.json({products})
                        break;

                        case "5000to10000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 10000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 5000 )
                            console.log(products)
                            res.json({products})
                        break;
                        
                        case "10000to20000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 20000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 10000 )
                            console.log(products)
                            res.json({products})
                        break;

                        case "over20000":
                            products = products.filter(item=> parseInt(item["salePrice"]) > 20000 )
                            console.log(products)
                            res.json({products})
                        break;

                    default:
                        break;
                }
            }
        }else{
            if (req.body.filters?.sort === "htl") {
                x = await db.collection("products").find({}).sort({ salePrice: -1}).toArray()
                console.log("htl")
            } else if (req.body.filters?.sort === "lth") {
                    x = await db.collection("products").find({}).sort({ salePrice: 1}).toArray()
            }
            else{
                    x = await db.collection("products").find({}).toArray()
            }
            let products = x.filter(item=> item["name"].toLowerCase().includes(search))
            res.json({products})
        }
} else {

    if (req.body.filters?.sort === "htl") {
        x = await db.collection("products").find({categoryId:categoryId}).sort({ salePrice: -1}).toArray()
        console.log("htl")
    } else if (req.body.filters?.sort === "lth") {
            x = await db.collection("products").find({categoryId:categoryId}).sort({ salePrice: 1}).toArray()
    }
    else{
            x = await db.collection("products").find({categoryId:categoryId}).toArray()
    }
        products = x.filter(item=> item["name"].toLowerCase().includes(search))
        if (typeof req.body.filters?.sortPrice !== "undefined") {
            if(typeof req.body.filters.sortPrice !== "undefined"){
                switch (req.body.filters.sortPrice) {
                    case "under1000":
                        products = products.filter(item=> parseInt(item["salePrice"]) < 1000 )
                        res.json({products})
                        break;
                        
                        case "1000to5000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 5000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 1000 )
                            console.log(products)
                            res.json({products})
                        break;
                        
                        case "5000to10000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 10000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 5000 )
                            console.log(products)
                            res.json({products})
                        break;

                        case "5000to10000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 10000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 5000 )
                            console.log(products)
                            res.json({products})
                        break;
                        
                        case "10000to20000":
                            products = products.filter(item=> parseInt(item["salePrice"]) < 20000 )
                            products = products.filter(item=> parseInt(item["salePrice"]) > 10000 )
                            console.log(products)
                            res.json({products})
                        break;

                        case "over20000":
                            products = products.filter(item=> parseInt(item["salePrice"]) > 20000 )
                            console.log(products)
                            res.json({products})
                        break;

                    default:
                        break;
                }
            }
        }else{
            if (req.body.filters?.sort === "htl") {
                x = await db.collection("products").find({categoryId:categoryId}).sort({ salePrice: -1}).toArray()
                console.log("htl")
            } else if (req.body.filters?.sort === "lth") {
                    x = await db.collection("products").find({categoryId:categoryId}).sort({ salePrice: 1}).toArray()
            }
            else{
                    x = await db.collection("products").find({categoryId:categoryId}).toArray()
            }
            products = x.filter(item=> item["name"].toLowerCase().includes(search))
            res.json({products})
    }
    }
})

const intance = new razorpay(
{
    key_id:"rzp_test_MWHQXuX6lMMon0",
    key_secret:"1LjeTVO3WKxGd8ddRx9AP9Pl"
}
);

app.post('/razorpay', async(req, res)=>{
var options = {
  amount: parseInt(req.body.amount),  // amount in the smallest currency unit
  currency: "INR",
  receipt: shortid.generate(),
};

try {
    const response = await intance.orders.create(options);
    
    res.json({
        id:response.id,
        currency:response.currency,
        amount:response.amount
    })
    
} catch (error) {
    console.log(error)
}


})

app.post('/getDefaultaddress', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const address = await db.collection("address").findOne({$and:[{default:true},{userId:req.body._id}]})
    res.json({address})
})

app.post('/saveOrderDetails', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const d = new Date();
   await db.collection("orders").insertOne({
        paymentId:req.body.paymentId, 
        orderId:req.body.orderId,
        razorpaySignature:req.body.razorpaySignature,
        userId:req.body.userId, 
        orderPrice:req.body.orderPrice,
        products:req.body.products,
        address:req.body.address,
        status:"placed",
        day:d.getDay(),
        month:d.getMonth(),
        year:d.getFullYear(),
        hours:d.getHours(),
        minute:d.getMinutes(),
        seconds:d.getSeconds()
    })
})

app.post('/getUserOrders', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const orders = await db.collection("orders").find({userId:req.body.userId}).toArray()
    res.json({orders})
})

app.post('/getAllOrders', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    const orders = await db.collection("orders").find({}).toArray()
    res.json({orders})
})

app.post('/changeDeliveryStatus', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    await db.collection("orders").updateOne({_id: new ObjectId(req.body._id)}, {
        $set:{status: req.body.status}
    })
    res.json({status:true})
})

app.post('/edituser', async(req,res)=>{
    const client = await clientPromise
    const db = client.db("amazon")
    switch (req.body.edit) {
        case "name":
            if (req.body.value.length > 0) {
            await db.collection("users").updateOne({_id: new ObjectId(req.body._id)}, {
                $set:{name: req.body.value}
            })
            var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
            res.json({status:true, user:user})
        }else{
            var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
            res.json({status:false, user:user, existErr: "Name is required"})
        }
            break;

            case "email":
                if (req.body.value.length > 0) {
                    let existEmail = null
                const body = req.body
                const _id = req.body._id
                const UserToUpdate = await db.collection("users").findOne({ _id: new ObjectId(_id) })
                if (UserToUpdate.email !== body.value) {
                    existEmail = await db.collection("users").findOne({ email: body.value })
                }
                if (existEmail !== null) {
                    var err = "Email is already exists"
                }
                if (typeof err === "undefined") {
                    await db.collection("users").updateOne({_id: new ObjectId(req.body._id)}, {
                        $set:{email: req.body.value}
                    }) 
                    var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                    res.json({status:true, user:user})
                } else {
                    var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                    res.json({status:false, user:user, existErr: err})
                }
                }else{
                    var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                    res.json({status:false, user:user, existErr: "email is required"})
                }
                break;
    
            case "password":
                if (req.body.value.length > 5) {
                await db.collection("users").updateOne({_id: new ObjectId(req.body._id)}, {
                    $set:{password: req.body.value}
                })
                console.log(req.body)
                var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                res.json({status:true, user:user})
            }else{
                var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                res.json({status:false, user:user, existErr: "Password contains atleast six charecters "})
            }
            break;

            case "mobileNo":
                if (req.body.value.length === 10) {
                    let existNo = null
                const body = req.body
                const _id = req.body._id
                const UserToUpdate = await db.collection("users").findOne({ _id: new ObjectId(_id) })
                if (UserToUpdate.mobileNo !== body.value) {
                    existNo = await db.collection("users").findOne({ mobileNo: body.value })
                }
                if (existNo !== null) {
                    var err = "Mobile number is already exists"
                }
                if (typeof err === "undefined") {
                    await db.collection("users").updateOne({_id: new ObjectId(req.body._id)}, {
                        $set:{mobileNo: req.body.value}
                    }) 
                    var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                    res.json({status:true, user:user})
                } else {
                    var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                    res.json({status:false, user:user, existErr: err})
                }
                }else{
                    var user = await db.collection("users").findOne({_id: new ObjectId(req.body._id)})
                    res.json({status:false, user:user, existErr: "enter a valid mobile number"})
                }
                break;
    
        default:
            break;
    }

})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})
