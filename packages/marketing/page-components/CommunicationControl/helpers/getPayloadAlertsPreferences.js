const getPaloadAlertsPreferences = (formValues = {}) => {
	const PAYLOAD = {};
	Object.entries(formValues).forEach(([key, value]) => {
		if (value) {
			PAYLOAD[key] = 'active';
		} else {
			PAYLOAD[key] = 'inactive';
		}
	});
	return PAYLOAD;
};
export default getPaloadAlertsPreferences;
