import express from "express";
import { deleteUser, forgotpass, logOut, resetPass, updateUser } from "../controler/userControler.js";
import { verifyToken } from "../utils/verifyUser.js";

const route = express.Router();

route.post('/update/:id', verifyToken, updateUser);
route.post('/updatepass/:id', verifyToken, updateUser);
route.delete('/delete/:id', verifyToken, deleteUser);
route.post('/logout/:id', verifyToken, logOut);
route.post('/forgotpass', forgotpass);
route.post('/resetpassword/:token', resetPass);

export default route;