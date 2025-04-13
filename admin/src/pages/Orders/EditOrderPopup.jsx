import React, { useState } from 'react';
import './EditOrderPopup.css';

const EditOrderPopup = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  const handleQtyChange = (index, value) => {
    const updatedItems = [...editedOrder.items];
    updatedItems[index].quantity = Number(value);
    setEditedOrder({ ...editedOrder, items: updatedItems });
  };

  const handleRemoveProduct = (index) => {
    const updatedItems = editedOrder.items.filter((_, i) => i !== index);
    setEditedOrder({ ...editedOrder, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedOrder);
  };

  return (
    <div className="popup-overlay">
      <form className="edit-order-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Edit Detail - Order #{order._id.slice(0, 6)}</h2>

        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={`${editedOrder.address.firstName} ${editedOrder.address.lastName}`}
            onChange={(e) => {
              const [firstName, ...rest] = e.target.value.split(' ');
              const lastName = rest.join(' ');
              setEditedOrder({
                ...editedOrder,
                address: { ...editedOrder.address, firstName, lastName }
              });
            }}
          />
        </div>
        <div className="form-group">
  <label>Email</label>
  <input
    type="email"
    value={editedOrder.address.email || ""}
    onChange={(e) =>
      setEditedOrder({
        ...editedOrder,
        address: { ...editedOrder.address, email: e.target.value },
      })
    }
  />
</div>

<div className="form-group">
  <label>Phone</label>
  <input
    type="text"
    value={editedOrder.address.phone || ""}
    onChange={(e) =>
      setEditedOrder({
        ...editedOrder,
        address: { ...editedOrder.address, phone: e.target.value },
      })
    }
  />
</div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={editedOrder.amount}
            onChange={(e) => setEditedOrder({ ...editedOrder, amount: Number(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={`${editedOrder.address.street}, ${editedOrder.address.city}`}
            onChange={(e) => {
              const [street, ...cityParts] = e.target.value.split(',');
              const city = cityParts.join(',').trim();
              setEditedOrder({
                ...editedOrder,
                address: {
                  ...editedOrder.address,
                  street: street.trim(),
                  city
                }
              });
            }}
          />
        </div>

        <h3 className="section-title">Product</h3>
        <div className="product-grid">
          {editedOrder.items.map((item, index) => (
            <div className="product-row" key={index}>
                <img src={item.image ? `http://localhost:4000/images/${item.image}` : '/placeholder.png'} alt={item.name} className="product-img"/>
            <div className="product-details">
                <p>{item.name}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQtyChange(index, e.target.value)}
                />
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleRemoveProduct(index)}
                title="Remove"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">SUBMIT</button>
          <button type="button" className="cancel-btn" onClick={onClose}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderPopup;
