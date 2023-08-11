const MINIMUM_ARRAY_LENGTH = 0;

export const checkObjectValues = (obj) => Object.values(obj).every((value) => value === undefined
	|| value === '' || (Array.isArray(value) && value.length === MINIMUM_ARRAY_LENGTH));
