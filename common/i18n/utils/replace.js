const replaceSingleString = (targetString, valueProp) => {
	const { key, value, checkCase = false } = valueProp;
	if (targetString && valueProp) {
		const secondParam = checkCase ? 'g' : 'gi';
		const regExp = new RegExp(key, secondParam);
		return targetString.replace(regExp, value);
	}
	return targetString;
};
const replace = (targetString, values) => {
	let stringToBeReplaced = targetString;
	if (Array.isArray(values)) {
		values.forEach((item) => {
			stringToBeReplaced = replaceSingleString(stringToBeReplaced, item);
		});
		return stringToBeReplaced;
	}
	if (typeof values === 'object') {
		return replaceSingleString(stringToBeReplaced, values);
	}
	return stringToBeReplaced;
};

export default replace;
