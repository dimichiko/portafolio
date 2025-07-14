export interface Visit {
  id: number;
  ip: string;
  country?: string;
  page: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 