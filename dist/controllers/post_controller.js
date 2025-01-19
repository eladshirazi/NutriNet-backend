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
const post_model_1 = __importDefault(require("../models/post_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
class PostController extends base_controller_1.default {
    constructor() {
        super(post_model_1.default);
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Prepare post data with all necessary fields
            const postData = {
                user: req.user._id, // Set the user as the post owner
                text: req.body.text, // Assuming text is sent in the request body
                image: req.body.image || "", // Set the image as an empty string if not provided
                likes: [], // Initialize likes as an empty array
                comments: [], // Initialize comments as an empty array
            };
            try {
                const newPost = yield this.model.create(postData); // Create the post using the base model
                res.status(201).json(newPost); // Return the created post with a 201 status
            }
            catch (err) {
                res.status(500).send(err.message); // Handle errors
            }
        });
    }
}
exports.default = new PostController();
//# sourceMappingURL=post_controller.js.map