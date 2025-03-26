import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});


    // const addToCart = (itemId) => {
    //     if (!cartItems[itemId]){
    //         setCartItems((prev)=>({...prev,[itemId]:1}))
    //     }
    //     else {
    //         setCartItems((prev)=({...prev,[itemId]:prev[itemId]+ 1}))
    //     }
    // }

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const prevValue = prev[itemId] || 0; // Nếu prev[itemId] chưa tồn tại, đặt mặc định là 0
            return { ...prev, [itemId]: prevValue + 1 };
        });
    };
    


    // const removeFromCart = (itemId) =>{
    //     setCartItems((prev)=({...prev,[itemId]:prev[itemId]- 1}))
    // }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const prevValue = prev[itemId] || 0; // Nếu prev[itemId] chưa tồn tại, đặt mặc định là 0
            return { ...prev, [itemId]: prevValue - 1 };
        });
    };
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id == item); // 🔥 Dùng `==` để so sánh số và chuỗi
                totalAmount += itemInfo.price * cartItems[item];
  
            }
        }
        return totalAmount;
    };



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    }


    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}    
        
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;