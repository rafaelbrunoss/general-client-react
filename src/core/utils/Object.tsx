export const isObject = (object: any): boolean =>
  object != null && typeof object === 'object';

export const isDeepEqual = (object1: any, object2: any): boolean => {
  if (object1 === undefined || object2 === undefined) {
    return false;
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects) {
      return isDeepEqual(val1, val2);
    } else if (!areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
};
