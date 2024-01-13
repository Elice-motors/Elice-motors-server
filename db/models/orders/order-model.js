import mongoose from "mongoose";
const {Schema} = mongoose;

const orderSchema = new Schema({
  orderNumber: String,
  products: [
    {
      productInfo: {
        carId: String,
        carName: String,
        img: String,
        carPrice: Number,
        option: String,
        color: String,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "주문 완료",
  },
  userId: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
