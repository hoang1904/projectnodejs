import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import EditOrderPopup from './EditOrderPopup';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 📦 Lấy danh sách đơn hàng theo trang từ API
  const fetchOrders = async (currentPage = 1) => {
    try {
      const response = await axios.get(`${url}/api/order/list?page=${currentPage}&limit=10`, {
        headers: {
          token: localStorage.getItem("token") // ✅ GỬI TOKEN để xác thực
        }
      });

      const data = response.data?.data;

      if (response.data.success) {
        const fetchedOrders = Array.isArray(data) ? data : data?.orders || [];
        console.log("✅ Đơn hàng từ server:", fetchedOrders); // ✅ DEBUG LOG
        setOrders(fetchedOrders);
        setPage(data?.currentPage || 1);
        setTotalPages(data?.totalPages || 1);
      } else {
        toast.error("Không thể tải đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      toast.error("Lỗi server.");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchOrders(page);
      } else {
        toast.error("Không thể cập nhật trạng thái.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Lỗi cập nhật trạng thái.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/delete`, { orderId });
      if (response.data.success) {
        toast.success("Đã xoá đơn hàng.");
        fetchOrders(page);
      } else {
        toast.error("Không thể xoá đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi xoá đơn hàng:", error);
      toast.error("Lỗi xoá đơn hàng.");
    }
  };

  const editOrder = (orderId) => {
    const selectedOrder = orders.find(o => o._id === orderId);
    setEditingOrder(selectedOrder);
    setIsEditing(true);
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await axios.post(`${url}/api/order/delete-multiple`, {
        orderIds: selectedOrders
      });

      if (response.data.success) {
        toast.success(response.data.message || "Đã xoá nhiều đơn hàng.");
        setSelectedOrders([]);
        fetchOrders(page);
      } else {
        toast.error(response.data.message || "Không thể xoá đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi xoá nhiều đơn hàng:", error);
      toast.error("Lỗi khi xoá nhiều đơn hàng.");
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  return (
    <div className='order add'>
      <h3>Order Page</h3>

      <div className='order-table'>
        <div className='order-header'>
          <p>Order ID</p>
          <p>Customer Name</p>
          <p>Product</p>
          <p>Amount</p>
          <p>Location</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {orders.length === 0 ? (
          <p className='no-orders'>Không có đơn hàng nào.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className='order-row'>
              <p className='order-id-cell'>
                <input
                  type="checkbox"
                  className="order-checkbox"
                  checked={selectedOrders.includes(order._id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      setSelectedOrders([...selectedOrders, order._id]);
                    } else {
                      setSelectedOrders(selectedOrders.filter(id => id !== order._id));
                    }
                  }}
                />
                <span className='order-id-text'>#{order._id?.slice( -5)}</span>
              </p>

              <p>{order?.address?.firstName} {order?.address?.lastName}</p>

              <div className='order-product-list'>
                {order.items.map((item, i) => (
                  <div key={i} className='order-product-item'>
                    <img
                      src={item.image ? `${url}/images/${item.image}` : assets.parcel_icon}
                      alt={item.name}
                      className="product-img"
                    />
                    <span>{item.name} x {item.quantity}</span>
                  </div>
                ))}
              </div>

              <p>${order.amount}</p> 
              <p>{order?.address?.city}, {order?.address?.street}</p> 
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              <div className='order-actions'>
                <button className='action-btn edit' onClick={() => editOrder(order._id)}>✏️</button>
                <button className='action-btn delete' onClick={() => deleteOrder(order._id)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {orders.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </button>

          {[...Array(totalPages).keys()].map(num => {
            const pageNum = num + 1;
            return (
              <button
                key={pageNum}
                className={pageNum === page ? "active" : ""}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}

      {isEditing && editingOrder && (
        <EditOrderPopup
          order={editingOrder}
          onClose={() => setIsEditing(false)}
          onSave={async (updatedOrder) => {
            try {
              const res = await axios.put(`${url}/api/order/update`, updatedOrder);
              if (res.data.success) {
                toast.success("Cập nhật đơn hàng thành công!");
                setIsEditing(false);
                fetchOrders(page);
              } else {
                toast.error("Cập nhật thất bại.");
              }
            } catch (err) {
              console.error(err);
              toast.error("Lỗi server khi cập nhật.");
            }
          }}
        />
      )}

      {selectedOrders.length >= 2 && (
        <div className="bulk-action-bar">
          <span>{selectedOrders.length} selected</span>
          <button className="bulk-delete-btn" onClick={handleDeleteSelected}>
            🗑️ Delete
          </button>
          <button className="bulk-cancel-btn" onClick={() => setSelectedOrders([])}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
