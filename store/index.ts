import type { Car, ErrorInfo } from '~/types/car';
import { ERROR_AUTO_HIDE_TIMEOUT } from '~/constants/timeouts';

export const useCarsStore = defineStore(
  'cars',
  () => {
    const cars = ref<Car[]>([]);
    const loading = ref(false);
    const error = ref<ErrorInfo | null>(null);
    const errorTimer = ref<ReturnType<typeof setTimeout> | null>(null);

    const hasCars = computed(() => cars.value.length > 0);

    const setCars = (newCars: Car[]): void => {
      cars.value = newCars;
    };

    const setLoading = (isLoading: boolean): void => {
      loading.value = isLoading;
    };

    const setError = (errorMessage: ErrorInfo | null): void => {
      error.value = errorMessage;
    };

    const showError = (errorCode: string, errorDescription: string): void => {
      if (errorTimer.value) {
        clearTimeout(errorTimer.value);
        errorTimer.value = null;
      }

      error.value = {
        code: errorCode,
        description: errorDescription,
      };

      errorTimer.value = setTimeout(() => {
        clearError();
      }, ERROR_AUTO_HIDE_TIMEOUT);
    };

    const clearError = (): void => {
      error.value = null;
      if (errorTimer.value) {
        clearTimeout(errorTimer.value);
        errorTimer.value = null;
      }
    };

    return {
      cars,
      loading,
      error,
      hasCars,
      setCars,
      setLoading,
      setError,
      showError,
      clearError,
    };
  },
  {
    persist: import.meta.client
      ? {
          storage: sessionStorage,
          pick: ['cars'],
        }
      : false,
  }
);
