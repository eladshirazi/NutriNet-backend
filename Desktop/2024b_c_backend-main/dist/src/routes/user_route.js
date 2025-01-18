"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
// User profile routes
router.get("/me", authMiddleware_1.protect, userController_1.default.getMyProfile); // Get the logged-in user's profile
router.put("/me", authMiddleware_1.protect, userController_1.default.updateMyProfile); // Update the logged-in user's profile
router.get("/:id", authMiddleware_1.protect, userController_1.default.getUserById); // Get another user's profile by ID
exports.default = router;
//# sourceMappingURL=user_route.js.map