import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder,userOrders,listOrders,updateStatus,deleteOrder,deleteMultipleOrders,updateOrder}  from "../controllers/orderController.js"
const router = express.Router();
const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)

orderRouter.get('/list',listOrders);           // Display orders in admin panel
orderRouter.post("/status",updateStatus);      // api for updating order status
orderRouter.post("/delete", deleteOrder);
orderRouter.post('/delete-multiple', deleteMultipleOrders); // xóa nhiều đơn hàng
orderRouter.put('/update', updateOrder);  // edit order

export default orderRouter;
