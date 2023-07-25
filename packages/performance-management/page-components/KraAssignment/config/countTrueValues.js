const ADDITION_BY = 1;

function countTrueValues(obj = {}) {
	let count = 0;

	Object.entries(obj).forEach(([key, value]) => {
		if (Object.prototype.hasOwnProperty.call(obj, key) && value === true) {
			count += ADDITION_BY;
		}
	});

	return count;
}

export default countTrueValues;
