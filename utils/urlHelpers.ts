export const parseRangeParam = (value: unknown): [number, number] | null => {
  if (!value) return null;
  const range = Array.isArray(value) ? value : [value];
  const parsed = range.map(v => parseInt(v as string)).filter(v => !isNaN(v));
  return parsed.length === 2 ? [parsed[0]!, parsed[1]!] : null;
};

export const parseArrayParam = (value: unknown): string[] => {
  if (!value) return [];
  return Array.isArray(value) ? value.map(v => v as string) : [value as string];
};

export const parseSearchParam = (value: unknown): string => {
  if (!value) return '';
  const searchParam = Array.isArray(value) ? value[0] : value;
  return searchParam as string;
};

export const shouldIncludeRangeInQuery = (
  current: [number, number],
  defaultValue: [number, number]
): boolean => {
  return current[0] !== defaultValue[0] || current[1] !== defaultValue[1];
};

export const shouldIncludeArrayInQuery = (current: string[]): boolean => {
  return current.length > 0;
};

export const buildCarProxyUrl = (make: string, model: string, year: string): string => {
  return `/api/proxy/cars?make=${make}&model=${model}&year=${year}`;
};
