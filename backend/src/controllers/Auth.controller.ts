import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/Auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result.token);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      res.status(200).json(result.token);
    } catch (err) {
      next(err);
    }
  }
}
