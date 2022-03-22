export const removeAllSpaces = (text: string): string =>
  text.replace(/\s/g, '').trim();

export const replaceallText = (
  text: string,
  searchValue: string | RegExp,
  replaceValue: string,
): string => (text ? text.replace(searchValue, replaceValue) : text);
