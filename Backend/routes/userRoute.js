import express from "express"
<<<<<<< HEAD
import { loginUser, registerUser, getAllUsers, deleteUser, updateUser } from "../controllers/userController.js"
import { resetPassword } from "../controllers/userController.js";
import { forgotPassword } from "../controllers/userController.js";
=======
import { loginUser, registerUser } from "../controllers/userController.js"
>>>>>>> ebb187b (admin-edit-order)

const userRouter = express.Router()

userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)
<<<<<<< HEAD
userRouter.get('/users', getAllUsers); // Ví dụ: GET /api/user/users
userRouter.delete('/delete/:id', deleteUser); // Ví dụ: DELETE /api/user/delete
userRouter.put('/update/:id', updateUser); // Ví dụ: PUT /api/user/update/
userRouter.post("/reset-password", resetPassword);  
userRouter.post("/forgot-password", forgotPassword);
=======

>>>>>>> ebb187b (admin-edit-order)
export default userRouter;