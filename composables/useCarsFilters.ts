import type { Car, FilterState } from '~/types/car';
import { useCarsSearch } from '~/composables/useCarsSearch';

export const useCarsFilters = () => {
  const { filterBySearch } = useCarsSearch();

  const filterByPrice = (car: Car, filter: FilterState): boolean => {
    return car.price >= filter.price[0] && car.price <= filter.price[1];
  };

  const filterByYear = (car: Car, filter: FilterState): boolean => {
    return car.year >= filter.year[0] && car.year <= filter.year[1];
  };

  const filterByMake = (car: Car, filter: FilterState): boolean => {
    return filter.make.length === 0 || filter.make.includes(car.make);
  };

  const filterByModel = (car: Car, filter: FilterState): boolean => {
    return filter.model.length === 0 || filter.model.includes(car.model);
  };

  const filterCars = (cars: Car[], filter: FilterState, searchTerm?: string): Car[] => {
    if (!cars.length) return cars;

    const term = searchTerm && searchTerm.trim() ? searchTerm.toLowerCase() : null;

    return cars.filter(car => {
      const matchesFilters =
        filterByPrice(car, filter) &&
        filterByYear(car, filter) &&
        filterByMake(car, filter) &&
        filterByModel(car, filter);

      if (!matchesFilters) return false;
      if (!term) return true;

      return filterBySearch(car, searchTerm!);
    });
  };

  return {
    filterCars,
  };
};
