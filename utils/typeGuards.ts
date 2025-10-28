import type { FetchError } from '~/types/car';

export const isFetchError = (error: unknown): error is FetchError => {
  return error instanceof Error && 'status' in error;
};

export const hasStatus = (error: unknown): error is { status: number } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  );
};

export const isApiError = (error: unknown): error is FetchError | { status: number } => {
  return isFetchError(error) || hasStatus(error);
};
