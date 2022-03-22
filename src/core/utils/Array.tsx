export const orderBy = <T,>(array: T[], field: string): T[] => {
  if (!array || !array.length) {
    return [] as T[];
  }

  return array.sort((current: T, next: T) =>
    (current[field] || '').localeCompare(next[field] || ''),
  );
};
