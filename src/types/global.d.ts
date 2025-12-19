export {};

declare global {
  type ID = string;

  interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
  }
}
