export const convertObjectMappingToArray = (obj) => Object.keys(obj).map((item) => ({
	label : item,
	value : obj[item],
}));
