import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dinhviethoang1904:hoang1904@cluster0.xppeknd.mongodb.net/food-del').then(() => console.log('MongoDB Connected'));
    
}