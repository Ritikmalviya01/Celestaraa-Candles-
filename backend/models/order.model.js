import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
userId : {
    type : mongoose.Schema.ObjectId ,
    ref : "User" ,
},
orderId : {
    type : String,
    required :[true , "Provide order Id"],
    unique : true ,
},
productId : {
    type: mongoose.Schema.ObjectId ,
    ref : "product" ,
},

items: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true,
      },
      name: String,
      image: [String],
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 }, // price at the time of purchase
    },
  ],
paymentId : {
    type : String ,
    default : "" ,
},
payment_status: {
  type: String,
  enum: ["pending", "paid", "failed", ""],
  default: "pending",
},
delivery_address:{
    type :  mongoose.Schema.Types.ObjectId ,
    ref : 'address'
},
subTotalAmnt :{
    type : Number ,
    default : 0 ,
},
totalAmt :{
    type : Number ,
    default : 0 ,
},
invoiceReciept :{
    type : String ,
    default : "" ,
},
delivery_Status: {
  type: String,
enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
 default: "Pending" // optional: default value
}

 }, {
    timestamps : true,
 })

const OrderModel = mongoose.model("order" , orderSchema);
export default OrderModel;