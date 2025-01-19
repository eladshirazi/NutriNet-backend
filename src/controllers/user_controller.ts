import user, { IUser } from "../models/user_model";
import BaseController from "./base_controller";

class UserController extends BaseController<IUser> {
  constructor() {
    super(user);
  }
}
export default new UserController();
