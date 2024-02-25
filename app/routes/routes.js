import express from "express";
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";
import authenticateToken from "../middleware/authenticate.js";

const router = express.Router();

router.post("/login", authController.loginController);
router.post("/register", authController.registerController);

//This will ensure that all routes above thise line require authentication via the authenticateToken middleware.
router.use(authenticateToken);

//logout
router.get("/logout", authController.logoutController);

//user CRUD
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

export default router;