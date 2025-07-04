import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  ProjectionType,
  PopulateOptions,
  Types,
  isValidObjectId,
} from "mongoose";
import { normalizePopulate } from "../utils/Populate.util";

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  projection?: ProjectionType<any>;
  populate?: string | string[] | PopulateOptions | PopulateOptions[];
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(
    filter: FilterQuery<T> = {},
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<T>> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const skip = (page - 1) * limit;

    let query = this.model.find(filter, options.projection);

    if (options.populate) {
      query = query.populate(normalizePopulate(options.populate));
    }

    query = query.sort(options.sort).skip(skip).limit(limit);

    const [data, total] = await Promise.all([
      query.exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(
    id: string | Types.ObjectId,
    populate?: PaginationOptions["populate"]
  ): Promise<T | null> {
    if (typeof id === "string" && !isValidObjectId(id)) return null;

    const objectId = typeof id === "string" ? new Types.ObjectId(id) : id;

    let query = this.model.findById(objectId);

    if (populate) {
      query = query.populate(normalizePopulate(populate));
    }

    return query.exec();
  }

  async findOne(
    filter: FilterQuery<T>,
    populate?: PaginationOptions["populate"]
  ): Promise<T | null> {
    let query = this.model.findOne(filter);
    if (populate) {
      query = query.populate(normalizePopulate(populate));
    }
    return query.exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    return this.model.exists(filter).then(Boolean);
  }
}
