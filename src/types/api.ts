export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  details?: any;
}