import { BaseRepository } from "./Base.repository";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/User.interface";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).select("+password").exec();
  }

  async isEmailTaken(email: string): Promise<boolean> {
    return this.exists({ email });
  }

  async getFollowers(userId: string) {
    return this.model
      .findById(userId)
      .populate("followers", "name avatar")
      .select("followers")
      .exec();
  }

  async getFollowing(userId: string) {
    return this.model
      .findById(userId)
      .populate("following", "name avatar")
      .select("following")
      .exec();
  }

  async findActiveUsers(page = 1, limit = 10) {
    return this.findAll(
      { isDeleted: false, isSuspended: false },
      {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: ["followers", "following"],
        projection: { password: 0 }, // hide password
      }
    );
  }
}
