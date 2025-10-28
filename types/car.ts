export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
}

export interface FilterState {
  price: [number, number];
  year: [number, number];
  make: string[];
  model: string[];
}

export interface CarApi {
  cylinders: number;
  displacement: number;
  fuel_type: string;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export type CarResponse = CarApi[];

export interface ErrorInfo {
  code: string;
  description: string;
}

export interface FetchError extends Error {
  status?: number;
  statusText?: string;
  data?: {
    message?: string;
    code?: string;
  };
}
