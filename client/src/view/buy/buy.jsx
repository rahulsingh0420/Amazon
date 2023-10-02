import axios from "axios";
import logo from "../../images/logo.jpg"

export default function displayRazorpay(totalAmount, products, navigate, address){
    

    let data = []

    const user = JSON.parse(localStorage.getItem('user'))

    axios.post("http://localhost:4000/razorpay",{amount:totalAmount*100}, {
        headers:{
            "content-type" : "application/x-www-form-urlencoded"
        }
    })
    .then(res =>{ data = res.data 
        x();
    })
    .catch(err => console.log(err))
    
    function x() {
        var options = {
            "key": "rzp_test_MWHQXuX6lMMon0", // Enter the Key ID generated from the Dashboard
            "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": data.currency,
            "name": "Amazon.in",
            "image": logo,
            "description": "Test Transaction",
            "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                const data = {paymentId:response.razorpay_payment_id, orderId:response.razorpay_order_id, razorpaySignature:response.razorpay_signature, userId:user._id, orderPrice:totalAmount, products:products, address:[address]}
                axios.post('http://localhost:4000/saveOrderDetails',data,{
                    headers:{
                        "content-type" : "application/x-www-form-urlencoded"
                    }
                })
                    navigate('/account/orders')
            },
            "prefill": {
                "name": user.name,
                "email": user.email,
                "contact": user.mobileNo
            },
            "notes": {
                "address": "Fake Amazon Office Almora"
            },
            "theme": {
                "color": "#f7ca00"
            }
        };
    
     const paymentObject = new window.Razorpay(options)
    
     paymentObject.open()    
    }


}