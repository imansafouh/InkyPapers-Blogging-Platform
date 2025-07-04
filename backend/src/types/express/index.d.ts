import type { IUser } from "../../interfaces/User.interface";
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
