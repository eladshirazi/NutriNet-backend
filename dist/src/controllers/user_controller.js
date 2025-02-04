"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const user_controller = {
    getMyProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: "Not authenticated" });
                }
                const user = yield user_model_1.default.findById(req.body._id).select("-password");
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "Server error", error });
            }
        });
    },
    updateMyProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: "Not authenticated" });
                }
                const { username, profilePicture } = req.body;
                const user = yield user_model_1.default.findById(req.body._id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                if (username)
                    user.username = username;
                if (profilePicture)
                    user.profilePicture = profilePicture;
                const updatedUser = yield user.save();
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ message: "Server error", error });
            }
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(req.body._id).select("-password");
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "Server error", error });
            }
        });
    },
};
exports.default = user_controller;
//# sourceMappingURL=user_controller.js.map