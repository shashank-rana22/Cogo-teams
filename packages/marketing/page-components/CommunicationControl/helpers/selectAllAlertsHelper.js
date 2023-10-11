const TOTAL_FIELDS = 6;
const PLUS_ONE_INDEX = 1;
const selectAllAlertsHelper = (formValues) => {
	let trueCount = 0;
	Object.keys(formValues).forEach((key) => {
		if (formValues[key] === true) {
			trueCount += PLUS_ONE_INDEX;
		}
	});

	return (trueCount === TOTAL_FIELDS);
};
export default selectAllAlertsHelper;
