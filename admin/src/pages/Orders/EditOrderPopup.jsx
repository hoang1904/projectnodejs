import React, { useState, useEffect } from 'react';
import './EditOrderPopup.css';
import { FaTrashAlt } from 'react-icons/fa';

const EditOrderPopup = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });
  const [fullName, setFullName] = useState(`${order.address.firstName} ${order.address.lastName}`.trim());

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');

  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const locationRegex = /^[a-zA-Z0-9À-ỹ\s,.'\-\/]+$/u;

  // 💡 Tự động tính lại amount khi số lượng thay đổi
  useEffect(() => {
    const total = editedOrder.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);  // giá * số lượng
    }, 0);
    setEditedOrder(prev => ({ ...prev, amount: total }));
  }, [editedOrder.items]);

  const handleQtyChange = (index, value) => {
    const quantity = Number(value.replace(/\D/g, ''));
    if (!isNaN(quantity) && quantity > 0) {
      const updatedItems = [...editedOrder.items];
      updatedItems[index].quantity = quantity;
      setEditedOrder({ ...editedOrder, items: updatedItems });
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedItems = editedOrder.items.filter((_, i) => i !== index);
    setEditedOrder({ ...editedOrder, items: updatedItems });
  };

  const validateFields = () => {
    let isValid = true;

    if (!nameRegex.test(fullName.trim())) {
      setFullNameError('Tên chỉ được chứa chữ cái và khoảng trắng.');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!emailRegex.test(editedOrder.address.email)) {
      setEmailError('Invalid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!/^0\d{9}$/.test(editedOrder.address.phone || '')) {
      setPhoneError('Phone number must start with 0 and be 10 digits long.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!locationRegex.test(editedOrder.address.street.trim())) {
      setStreetError('Invalid House Number / Street.');
      isValid = false;
    } else {
      setStreetError('');
    }

    if (!locationRegex.test(editedOrder.address.city.trim())) {
      setCityError('Invalid County / City.');
      isValid = false;
    } else {
      setCityError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ');

    const updatedOrder = {
      ...editedOrder,
      address: {
        ...editedOrder.address,
        firstName,
        lastName
      }
    };

    onSave(updatedOrder);
  };

  return (
    <div className="popup-overlay">
      <form className="edit-order-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Edit order #{order._id.slice(0, 6)}</h2>

        {/* Tên khách hàng & Email */}
        <div className="form-row">
          <div className={`form-group ${fullNameError ? 'error' : ''}`}>
            <label htmlFor="customerName">Customer name</label>
            <input
              id="customerName"
              type="text"
              value={fullName}
              onChange={(e) => {
                const value = e.target.value;
                setFullName(value);
                if (!nameRegex.test(value.trim())) {
                  setFullNameError('Name consists of letters, no special characters');
                } else {
                  setFullNameError('');
                }
              }}
            />
            {fullNameError && <p className="error-msg">{fullNameError}</p>}
          </div>

          <div className={`form-group ${emailError ? 'error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={editedOrder.address.email || ""}
              onChange={(e) => {
                const value = e.target.value.trim();
                setEditedOrder({
                  ...editedOrder,
                  address: { ...editedOrder.address, email: value }
                });
                if (!emailRegex.test(value)) {
                  setEmailError('Invalid email.');
                } else {
                  setEmailError('');
                }
              }}
            />
            {emailError && <p className="error-msg">{emailError}</p>}
          </div>
        </div>

        {/* Số điện thoại & Tổng tiền */}
        <div className="form-row">
          <div className={`form-group ${phoneError ? 'error' : ''}`}>
            <label htmlFor="phone">PhonePhone</label>
            <input
              id="phone"
              type="text"
              maxLength="10"
              value={editedOrder.address.phone || ""}
              onChange={(e) => {
                const clean = e.target.value.replace(/\D/g, '');
                setEditedOrder({
                  ...editedOrder,
                  address: { ...editedOrder.address, phone: clean }
                });
                if (!/^0\d{9}$/.test(clean)) {
                  setPhoneError('Phone number must start with 0 and be 10 digits long.');
                } else {
                  setPhoneError('');
                }
              }}
            />
            {phoneError && <p className="error-msg">{phoneError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Total amount</label>
            <input
              id="amount"
              type="number"
              min="1"
              value={editedOrder.amount}
              readOnly
            />
          </div>
        </div>

        {/* Địa chỉ: Tách Số nhà / Đường và Quận / TP */}
        <div className="form-row">
          <div className={`form-group ${streetError ? 'error' : ''}`}>
            <label htmlFor="street">House Number /Street</label>
            <input
              id="street"
              type="text"
              value={editedOrder.address.street}
              onChange={(e) => {
                const value = e.target.value;
                setEditedOrder({
                  ...editedOrder,
                  address: { ...editedOrder.address, street: value }
                });
                if (!locationRegex.test(value.trim())) {
                  setStreetError('Invalid House Number / Street.');
                } else {
                  setStreetError('');
                }
              }}
            />
            {streetError && <p className="error-msg">{streetError}</p>}
          </div>

          <div className={`form-group ${cityError ? 'error' : ''}`}>
            <label htmlFor="city">District / City</label>
            <input
              id="city"
              type="text"
              value={editedOrder.address.city}
              onChange={(e) => {
                const value = e.target.value;
                setEditedOrder({
                  ...editedOrder,
                  address: { ...editedOrder.address, city: value }
                });
                if (!locationRegex.test(value.trim())) {
                  setCityError('Invalid County / City');
                } else {
                  setCityError('');
                }
              }}
            />
            {cityError && <p className="error-msg">{cityError}</p>}
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <h3 className="section-title">Product List</h3>
        <div className="product-grid">
          {editedOrder.items.map((item, index) => (
            <div className="product-row" key={index}>
              <img
                src={item.image ? `http://localhost:4000/images/${item.image}` : '/placeholder.png'}
                alt={item.name}
                className="product-img"
              />
              <div className="product-details">
                <p>{item.name}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQtyChange(index, e.target.value)}
                />
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleRemoveProduct(index)}
                title="Xóa"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>

        {/* Nút hành động */}
        <div className="form-buttons">
          <button type="submit" className="submit-btn">SAVE</button>
          <button type="button" className="cancel-btn" onClick={onClose}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderPopup;