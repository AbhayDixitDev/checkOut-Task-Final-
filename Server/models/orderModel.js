const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
       items : [
           {
               id: {type: Number, required: true},
               name: {type: String, required: true},
               image: {type: String, required: true},
               type: {type: String, required: true},
               category: {type: String, required: true},
               publish_year: {type: Number, required: true},
               model_number: {type: String, required: true},
               technology: {type: String, required: true},
               version: {type: String, required: true},
               price: {type: Number, required: true},
               quantity: {type: Number, required: true}
           }
       ],
       userEmail : {type: String, required: true},
       userName : {type: String, required: true},
       numberOfItems : {type: Number, required: true},
       totalPrice :{type: Number, required: true},
       dateOfOrder : {type: Date, default: Date.now()},
       paymentType : {type: String, required: true, default: "Online Using Stripe"},
       paymentStatus : {type: String, required: true},
       transactionId : {type: String, required: true}
       
    }
)


module.exports =new  mongoose.model("order", orderSchema);