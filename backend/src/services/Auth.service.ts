import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/User.repository";
import { generateToken } from "../utils/Jwt.util";
import { AppError } from "../utils/AppError.util";

export class AuthService {
  private userRepo = new UserRepository();

  async register(data: { name: string; email: string; password: string }) {
    if (await this.userRepo.isEmailTaken(data.email)) {
      throw new AppError("Email already in use", 400);
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.create({ ...data, password: hashed });
    return { user, token: generateToken({ id: user.id }) };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new AppError("Invalid credentials", 400);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError("Invalid credentials", 400);

    return { user, token: generateToken({ id: user.id }) };
  }
}
