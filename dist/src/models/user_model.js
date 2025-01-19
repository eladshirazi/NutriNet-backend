"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please use a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: {
        type: [String],
        default: [],
    },
    profilePicture: {
        type: String,
        default: "",
    },
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user_model.js.map