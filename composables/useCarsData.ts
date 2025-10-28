import type { Car } from '~/types/car';
import { useCarsStore } from '~/store/index';

export const useCarsData = () => {
  const carsStore = useCarsStore();

  const getRange = (getter: (car: Car) => number): { min: number; max: number } => {
    if (!carsStore.cars.length) return { min: 0, max: 0 };
    const values = carsStore.cars.map(getter);
    return { min: Math.min(...values), max: Math.max(...values) };
  };

  const getPriceRange = (): { min: number; max: number } => {
    return getRange(car => car.price);
  };

  const getYearRange = (): { min: number; max: number } => {
    return getRange(car => car.year);
  };

  const getAvailableMakes = (): string[] => {
    if (!carsStore.cars.length) return [];
    return [...new Set(carsStore.cars.map(car => car.make))].sort();
  };

  const getAvailableModels = (): string[] => {
    if (!carsStore.cars.length) return [];
    return [...new Set(carsStore.cars.map(car => car.model))].sort();
  };

  return {
    getPriceRange,
    getYearRange,
    getAvailableMakes,
    getAvailableModels,
  };
};
