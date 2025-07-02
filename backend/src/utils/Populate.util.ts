import { PopulateOptions } from "mongoose";

export function normalizePopulate(
  populate: string | string[] | PopulateOptions | PopulateOptions[]
): PopulateOptions | (string | PopulateOptions)[] {
  return typeof populate === "string" || Array.isArray(populate)
    ? [populate].flat()
    : populate;
}
