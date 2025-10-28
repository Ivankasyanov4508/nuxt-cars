import type { Car } from '~/types/car';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

export const createCarSlug = (car: { make: string; model: string; year: number }): string => {
  return `${car.make}-${car.model}-${car.year}`.toLowerCase();
};
