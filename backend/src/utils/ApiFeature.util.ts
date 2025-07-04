import { FilterQuery, ProjectionType } from "mongoose";
import { PaginationOptions } from "../repositories/Base.repository";

export class APIFeatures<T> {
  private queryObj: any;
  public filter: FilterQuery<T> = {};
  public options: PaginationOptions = {};

  constructor(queryString: Record<string, any>) {
    this.queryObj = { ...queryString };
  }

  parse(): this {
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete this.queryObj[el]);

    // Advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(this.queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in|nin|ne)\b/g,
      (match) => `$${match}`
    );

    this.filter = JSON.parse(queryStr);

    return this;
  }

  paginate(): this {
    const page = parseInt(this.queryObj.page) || 1;
    const limit = parseInt(this.queryObj.limit) || 10;

    this.options.page = page;
    this.options.limit = limit;

    return this;
  }

  sort(): this {
    if (this.queryObj.sort) {
      const sort = this.queryObj.sort.split(",").join(" ");
      const sortObj: Record<string, 1 | -1> = {};
      sort.split(" ").forEach((field: string) => {
        if (field.startsWith("-")) {
          sortObj[field.substring(1)] = -1;
        } else {
          sortObj[field] = 1;
        }
      });
      this.options.sort = sortObj;
    }

    return this;
  }

  limitFields(): this {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(",").join(" ");
      this.options.projection = fields as unknown as ProjectionType<T>;
    }

    return this;
  }

  build(): { filter: FilterQuery<T>; options: PaginationOptions } {
    return { filter: this.filter, options: this.options };
  }
}
