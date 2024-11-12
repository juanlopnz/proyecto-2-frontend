export type OrderDirection = "ASC" | "DESC";

export type OrderOptions = "name" | "price" | "category";

export type BaseResponse<T> = {
  status: boolean;
  data: T
}