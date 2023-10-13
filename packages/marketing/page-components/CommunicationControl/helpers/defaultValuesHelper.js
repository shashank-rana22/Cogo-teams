const defaultValuesHelper = (obj) => {
	const NEW_OBJ = {};
	Object.keys(obj).forEach((key) => {
		NEW_OBJ[key] = obj[key] === 'active';
	});
	return NEW_OBJ;
};
export default defaultValuesHelper;
