export const convertObjectMappingToArray = (obj) => Object.keys(obj).map((item) => ({
	value : item,
	label : obj[item],
}));
