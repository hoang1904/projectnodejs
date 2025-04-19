import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./ProductDetail.css";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { url, addToCart, removeFromCart, cartItems, setCartItems } = useContext(StoreContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [userInfo, setUserInfo] = useState({ userId: "", userName: "" });
  const [hasReviewed, setHasReviewed] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (userId && userName) {
      setUserInfo({ userId, userName });
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [userInfo, id]);

  const fetchRelatedProducts = async (category) => {
    try {
      const res = await axios.get(`${url}/api/food/category/${category}/${id}`);
      setRelatedProducts(res.data.data);
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  const fetchProduct = async () => {
    const res = await axios.get(`${url}/api/food/${id}`);
    setProduct(res.data);
    fetchRelatedProducts(res.data.category);
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${url}/api/review/${id}`);
      setReviews(res.data);
      if (userInfo.userId) {
        const already = res.data.find(r => r.userId === userInfo.userId);
        setHasReviewed(!!already);
      } else {
        setHasReviewed(false);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      alert("Please enter review content.");
      return;
    }

    const reviewData = {
      productId: id,
      userId: userInfo.userId,
      userName: userInfo.userName,
      content: newReview,
      rating: newRating
    };

    try {
      const res = await axios.post(`${url}/api/review/add`, reviewData);
      if (res.data.success) {
        setNewReview("");
        setNewRating(5);
        fetchReviews();
      } else {
        alert(res.data.message || "Unable to submit review. Please try again.");
      }
    } catch (err) {
      toast.error("Error submitting review:", err);
      alert("An error occurred while submitting the review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${url}/api/review/${reviewId}`, {
        data: { userId: userInfo.userId }
      });
      fetchReviews();
      setHasReviewed(false);
    } catch (err) {
      toast.error("Error deleting review:", err);
    }
  };

  const handleEditReview = async (reviewId, currentContent, currentRating) => {
    const updatedContent = prompt("Edit review content:", currentContent);
    if (!updatedContent) return;

    let updatedRating = prompt("Edit rating (1-5):", currentRating);
    updatedRating = parseInt(updatedRating);
    if (isNaN(updatedRating) || updatedRating < 1 || updatedRating > 5) {
      alert("Invalid rating!");
      return;
    }

    try {
      await axios.patch(`${url}/api/review/${reviewId}`, {
        userId: userInfo.userId,
        content: updatedContent,
        rating: updatedRating
      });
      fetchReviews();
    } catch (err) {
      toast.error("Error editing review:", err);
    }
  };

  const handleReviewChange = (e) => setNewReview(e.target.value);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const newQuantity = (cartItems[product._id] || 0) + quantity;
    setCartItems(prev => ({
      ...prev,
      [product._id]: newQuantity
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, {
          itemId: product._id,
          quantity
        }, {
          headers: { token }
        });
      } catch (err) {
        toast.error("Error adding to cart:", err);
      }
    }

    toast.success(`Added ${quantity} products to the cart!`);
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <>
      <div className="product-detail-container">
        <div className="product-detail-left">
          <img src={`${url}/images/${product.image}`} alt={product.name} />
          <div className="product-description-box">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="product-detail-right">
          <h2>{product.name}</h2>
          <p className="price">Price: ${product.price}</p>

          <div className="quantity-select">
            <p><b>Quantity</b></p>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="add-to-cart-actions">
            <button onClick={handleAddToCart} className="add-cart-btn">
              🛒 Add to Cart
            </button>
          </div>

          <div className="review-section">
            <h3>Product Reviews</h3>
            {userInfo.userId ? (
              !hasReviewed ? (
                <>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: newRating >= star ? "#f1c40f" : "#ccc",
                          marginRight: "5px"
                        }}
                        onClick={() => setNewRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    placeholder="Write a review..."
                    value={newReview}
                    onChange={handleReviewChange}
                  />
                  <button onClick={handleAddReview}>Submit Review</button>
                </>
              ) : (
                <p style={{ color: "#555", marginBottom: "10px" }}>
                  ✅ You have reviewed this product. You can edit or delete it below.
                </p>
              )
            ) : (
              <p style={{ color: "#999", fontStyle: "italic", marginTop: "10px" }}>
                Please log in to submit a review.
              </p>
            )}

            <div className="review-list">
              {reviews.length === 0 && <p>No reviews yet.</p>}
              {(() => {
                const userReview = reviews.find(r => r.userId === userInfo.userId);
                const otherReviews = reviews.filter(r => r.userId !== userInfo.userId);
                const combined = userReview ? [userReview, ...otherReviews] : reviews;
                const displayedReviews = showAllReviews ? combined : combined.slice(0, 3);

                return displayedReviews.map((review) => (
                  <div key={review._id} className="review-item">
                    <div className="review-top">
                      <p><b>{review.userName}</b>: {review.content}</p>
                      <p>{"★".repeat(review.rating)} <span style={{ color: "#999" }}>({review.rating}/5)</span></p>
                      {review.userId === userInfo.userId && (
                        <div className="review-actions-inline">
                          <button
                            title="Edit"
                            onClick={() => handleEditReview(review._id, review.content, review.rating)}
                          >
                            ✏️
                          </button>
                          <button title="Delete" onClick={() => handleDeleteReview(review._id)}>
                            🗑️
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ));
              })()}

              {reviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  style={{
                    marginTop: "10px",
                    background: "#eee",
                    border: "none",
                    cursor: "pointer",
                    color: "#555"
                  }}
                >
                  {showAllReviews ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="related-products">
        <h3>Related Products</h3>
        <div className="related-products-list">
          {relatedProducts.map((item) => (
        <div className="related-product-item" onClick={() => navigate(`/product/${item._id}`)}>
       <div className="product-image-wrapper">
  <img src={`${url}/images/${item.image}`} alt={item.name} width="200" />
  <p className="food-item-pricess">${item.price}</p>
</div>

        <p>{item.name}</p>
      </div>
      
        
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
