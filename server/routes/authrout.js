import express from "express";
import { signinRoute, signupRoute } from "../controler/authControler.js";

const router = express.Router();

router.post("/signup", signupRoute)

router.post("/signin", signinRoute)



export default router;