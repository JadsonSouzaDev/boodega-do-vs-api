export const createSlug = (source: string): string => {
  return `${source
    .toLowerCase()
    .trim()
    .split(' ')
    .join('-')
    .replaceAll(',', '')
    .toString()}`;
};
