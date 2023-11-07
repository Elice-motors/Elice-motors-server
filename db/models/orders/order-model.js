import mongoose from "mongoose";
const {Schema} = mongoose;

const orderSchema = new Schema({
  products: [
    {
      productInfo: {
        name: String,
        color: String,
        option: String,
        price: Number,
      },
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
