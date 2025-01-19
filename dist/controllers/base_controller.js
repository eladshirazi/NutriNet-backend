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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model) {
        this.model = model;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id != null) {
                    const user = yield this.model.findById(req.params.id);
                    return res.status(200).send(user);
                }
                else {
                    if (req.query.name != null) {
                        const users = yield this.model.find({ name: req.query.name });
                        return res.status(200).send(users);
                    }
                    else {
                        const users = yield this.model.find();
                        return res.status(200).send(users);
                    }
                }
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const newUser = yield this.model.create(user);
                res.status(201).json(newUser);
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const updatedUser = yield this.model.findByIdAndUpdate(user._id, user, {
                    new: true,
                });
                res.status(200).json(updatedUser);
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.findByIdAndDelete(req.params.id); // Assuming you want to delete by ID
                res.status(200).send();
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map