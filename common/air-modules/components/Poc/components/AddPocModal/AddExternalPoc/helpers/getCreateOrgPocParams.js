const EXCLUDE_KEYS = ['mobile_number', 'alternate_mobile_number'];

const getCreateOrgPocParams = ({ formValues, trade_type }) => {
	const params = { trade_type, trade_party_type: 'external_poc' };
	Object.keys(formValues).forEach((k) => {
		if (!EXCLUDE_KEYS.includes(k)) params[k] = formValues[k];
	});

	params.mobile_number = formValues?.mobile_number?.number;
	params.mobile_country_code = formValues?.mobile_number?.country_code;
	if (formValues.alternate_mobile_number) {
		params.alternate_mobile_number = formValues.alternate_mobile_number?.number;
		params.alternate_mobile_country_code = formValues.alternate_mobile_number?.country_code;
	}
	return params;
};
export default getCreateOrgPocParams;
