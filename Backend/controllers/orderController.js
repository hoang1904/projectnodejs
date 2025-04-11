import orderModel from "../models/orderModel.js";
import userModel  from '../models/userModel.js'
import Stripe     from "stripe"
import express from 'express';
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req,res) =>{

    const frontend_url  = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId:   req.body.userId,
            items:    req.body.items,
            amount:   req.body.amount,
            address:  req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
            
        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        
        res.json({success:true,session_url:session.url})
    
    } catch (error) {
        console.log(error); 
        res.json({success:false,message:"Error"})
    }
    
}


// edit order

const updateOrder = async (req, res) => {
    try {
      const { _id, address, amount, items } = req.body;
  
      const updated = await orderModel.findByIdAndUpdate(
        _id,
        { address, amount, items },
        { new: true }
      );
  
      if (!updated)
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng.' });
  
      res.json({ success: true, message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  };
  
  


  
//delete order
// Xoá đơn hàng theo orderId
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.json({ success: false, message: "Đơn hàng không tồn tại." });
        }

        res.json({ success: true, message: "Đơn hàng đã được xoá." });
    } catch (error) {
        console.error("Lỗi khi xoá đơn hàng:", error);
        res.status(500).json({ success: false, message: "Lỗi server." });
    }
};


//user orders for frontend
const userOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// listing orders for admin panel   
// Display orders in admin panel  
//phân trang đơn hàng.
// GET /api/order/list?page=1&limit=10
const listOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Đếm tổng đơn hàng có ít nhất 1 sản phẩm
        const totalOrders = await orderModel.countDocuments({ items: { $exists: true, $not: { $size: 0 } } });

        const orders = await orderModel
            .find({ items: { $exists: true, $not: { $size: 0 } } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'name'); // Lấy tên khách hàng

        const enrichedOrders = orders.map(order => ({
            _id: order._id,
            items: order.items,
            amount: order.amount,
            address: order.address,
            status: order.status,
            createdAt: order.createdAt,
            customerName: order.userId?.name || "N/A",
            location: order.address
        }));

        res.json({
            success: true,
            data: {
                orders: enrichedOrders,
                currentPage: page,
                totalPages: Math.ceil(totalOrders / limit)
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
}



// api for updating order status  
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status:req.body.status});
        res.json({success: true, message: "Status updated"});
    }   catch (error) {
            console.log(error);
            res.json({success: false, message: 'Error'});
    }
}
// update order
// PUT /api/order/update
router.put('/order/update', async (req, res) => {
    try {
      const { _id, address, amount } = req.body;
      const updated = await Order.findByIdAndUpdate(_id, { address, amount }, { new: true });
  
      if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng.' });
  
      res.json({ success: true, message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  });
  
// Xoá nhiều đơn hàng
const deleteMultipleOrders = async (req, res) => {
    try {
        const { orderIds } = req.body;

        if (!Array.isArray(orderIds) || orderIds.length === 0) {
            return res.json({ success: false, message: "Danh sách đơn hàng không hợp lệ." });
        }

        const result = await orderModel.deleteMany({ _id: { $in: orderIds } });

        res.json({ success: true, message: `Đã xoá ${result.deletedCount} đơn hàng.` });
    } catch (error) {
        console.error("Lỗi khi xoá nhiều đơn hàng:", error);
        res.status(500).json({ success: false, message: "Lỗi server." });
    }
};


const verifyOrder = async (req, res) => {
    // TODO: Viết logic xác minh đơn hàng ở đây nếu bạn cần
    res.json({ success: true, message: "Order verified!" });
  };
  
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,deleteOrder,deleteMultipleOrders,updateOrder}
