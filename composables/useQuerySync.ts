import type { FilterState } from '~/types/car';
import { shouldIncludeRangeInQuery, shouldIncludeArrayInQuery } from '~/utils/urlHelpers';

export const useQuerySync = () => {
  const route = useRoute();
  const router = useRouter();

  const updateUrlParams = (
    filter: FilterState,
    priceRange: { min: number; max: number },
    yearRange: { min: number; max: number }
  ): void => {
    const query: Record<string, string | number | string[] | number[]> = {};

    if (shouldIncludeRangeInQuery(filter.price, [priceRange.min, priceRange.max])) {
      query.price = filter.price;
    }

    if (shouldIncludeRangeInQuery(filter.year, [yearRange.min, yearRange.max])) {
      query.year = filter.year;
    }

    if (shouldIncludeArrayInQuery(filter.make)) {
      query.make = filter.make;
    }

    if (shouldIncludeArrayInQuery(filter.model)) {
      query.model = filter.model;
    }

    router.replace({ query });
  };

  const updateSearchUrl = (searchValue: string): void => {
    const query = { ...route.query };

    if (searchValue && searchValue.trim()) {
      query.search = searchValue.trim();
    } else {
      delete query.search;
    }

    router.replace({ query });
  };

  return {
    updateUrlParams,
    updateSearchUrl,
  };
};
