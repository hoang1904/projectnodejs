import express from "express"
import authMiddleware from "../middleware/auth.js"
<<<<<<< HEAD
import { placeOrder, verifyOrder,userOrders,listOrders,updateStatus,deleteOrder,deleteMultipleOrders,updateOrder}  from "../controllers/orderController.js"
const router = express.Router();
=======
import { placeOrder, verifyOrder,userOrders,listOrders,updateStatus}  from "../controllers/orderController.js"

>>>>>>> ebb187b (admin-edit-order)
const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)

orderRouter.get('/list',listOrders);           // Display orders in admin panel
orderRouter.post("/status",updateStatus);      // api for updating order status
<<<<<<< HEAD
orderRouter.post("/delete", deleteOrder);
orderRouter.post('/delete-multiple', deleteMultipleOrders); // xóa nhiều đơn hàng
orderRouter.put('/update', updateOrder);  // edit order
=======
>>>>>>> ebb187b (admin-edit-order)

export default orderRouter;
