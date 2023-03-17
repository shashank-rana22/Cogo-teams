export const convertObjectMappingToArray = (obj) => Object.keys(obj).map((item) => ({
	label : obj[item],
	value : item,
}));
