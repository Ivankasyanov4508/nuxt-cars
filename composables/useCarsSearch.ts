import type { Car } from '~/types/car';

export const useCarsSearch = () => {
  const filterBySearch = (car: Car, searchTerm: string): boolean => {
    const term = searchTerm.toLowerCase();
    return car.make.toLowerCase().includes(term) || car.model.toLowerCase().includes(term);
  };

  return {
    filterBySearch,
  };
};
