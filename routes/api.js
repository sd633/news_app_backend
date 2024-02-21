import {Router} from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import NewsController from "../controllers/newscontroller.js";
import redisCache from "../DB/redis.config.js";
import sendTestEmail from "../controllers/testEmailController.js";


const router = Router();

//auth routes
router.post("/auth/register", registerController)
router.post("/auth/login", loginController)
router.get("/profile", authMiddleware, getProfile)
router.put("/profile/:id", authMiddleware, updateProfile);
router.get("/send-email", sendTestEmail)

//news routes
router.get("/news", redisCache.route(), NewsController.index);
router.post("/news",authMiddleware, NewsController.store);
router.get("/news/:id", NewsController.show);
router.put("/news/:id",authMiddleware,NewsController.update)
router.delete("/news/:id",authMiddleware, NewsController.destroy)

export default router;