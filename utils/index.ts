import type { FilterState } from '~/types/car';
import { parseRangeParam, parseArrayParam } from './urlHelpers';

export const parseUrlParams = (
  route: { query: Record<string, unknown> },
  filter: Ref<FilterState>
): void => {
  const query = route.query;

  const priceRange = parseRangeParam(query.price);
  if (priceRange) {
    filter.value.price = priceRange;
  }

  const yearRange = parseRangeParam(query.year);
  if (yearRange) {
    filter.value.year = yearRange;
  }

  filter.value.make = parseArrayParam(query.make);
  filter.value.model = parseArrayParam(query.model);
};
