import { useCarsStore } from '~/store/index';
import type { Car } from '~/types/car';
import { useApi } from './useApi';

export const useCarsLoader = () => {
  const carsStore = useCarsStore();
  let isLoadingInProgress = false;

  const loadCars = async (): Promise<void> => {
    if (carsStore.hasCars) return;
    if (isLoadingInProgress) return;

    isLoadingInProgress = true;
    carsStore.setLoading(true);

    try {
      const { fetch } = useApi();
      const { data } = await fetch<Car[]>('/api/cars', {
        onError: ({ code, description }) => {
          carsStore.showError(code, description);
        },
      });
      carsStore.setCars(data.value as Car[]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки данных';
      carsStore.showError('LOAD_ERROR', errorMessage);
    } finally {
      carsStore.setLoading(false);
      isLoadingInProgress = false;
    }
  };

  return {
    loadCars,
  };
};
