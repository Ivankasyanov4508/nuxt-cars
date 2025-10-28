import type { Car } from '~/types/car';
import cars from '~/server/data/cars.json';

export default defineEventHandler((): Car[] => {
  return cars as Car[];
});
