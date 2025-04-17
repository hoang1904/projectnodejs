import React, { useEffect, useState, useContext } from 'react';
import './MyOrders.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    // Lấy đơn hàng từ server
    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, {
                headers: { token }
            });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    // Sắp xếp theo ngày tạo mới nhất
    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = sortedData.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(sortedData.length / ordersPerPage);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>

            <div className="container">
                <div className="my-orders-header">
                    <p>Order ID</p>
                    <p>Products</p>
                    <p>Amount</p>
                    <p>Time</p>
                    <p>Status</p>
                    <p>Track</p>
                </div>

                {currentOrders.map((order, index) => {
                    let time = "Invalid Date";
                    let date = "Invalid Date";

                    if (order.createdAt) {
                        const createdAt = new Date(order.createdAt);
                        if (!isNaN(createdAt)) {
                            time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            date = createdAt.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' });
                        }
                    }

                    return (
                        <div key={index} className='my-orders-order'>
                            <p className="order-id">#{order._id?.slice(-5)}</p>

                            <div className="order-products">
                                {order.items.map((item, i) => (
                                    <div key={i} className="product-item">
                                        <img 
                                            src={item.image ? `${url}/images/${item.image}` : assets.parcel_icon} 
                                            alt={item.name} 
                                            className="product-img" 
                                        />
                                        <span>{item.name} x {item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <p>${order.amount}.00</p>

                            <p className="order-time">
                                <span>{time}</span><br />
                                <span>{date}</span>
                            </p>

                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>

                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
