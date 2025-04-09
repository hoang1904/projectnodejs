import express from "express"
import { loginUser, registerUser, getAllUsers, deleteUser, updateUser } from "../controllers/userController.js"
import { resetPassword } from "../controllers/userController.js";
import { forgotPassword } from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)
userRouter.get('/users', getAllUsers); // Ví dụ: GET /api/user/users
userRouter.delete('/delete/:id', deleteUser); // Ví dụ: DELETE /api/user/delete
userRouter.put('/update/:id', updateUser); // Ví dụ: PUT /api/user/update/
userRouter.post("/reset-password", resetPassword);  
userRouter.post("/forgot-password", forgotPassword);
export default userRouter;