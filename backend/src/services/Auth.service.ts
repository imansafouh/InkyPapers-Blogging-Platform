import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/User.repository";
import { generateToken } from "../utils/Jwt.util";

export class AuthService {
  private userRepo = new UserRepository();

  async register(data: { name: string; email: string; password: string }) {
    if (await this.userRepo.isEmailTaken(data.email)) {
      throw new Error("Email already in use");
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.create({ ...data, password: hashed });
    return { user, token: generateToken({ id: user.id }) };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return { user, token: generateToken({ id: user.id }) };
  }
}
