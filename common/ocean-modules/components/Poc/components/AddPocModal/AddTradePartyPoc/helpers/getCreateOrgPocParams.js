import { isEmpty } from '@cogoport/utils';

const EXISTING_POC_KEYS = ['email', 'name', 'mobile_number', 'mobile_country_code', 'work_scopes'];

const EXCLUDE_POC_KEYS = ['mobile_number', 'alternate_mobile_number'];

const CONTACT = { mobile_number: 'mobile', alternate_mobile_number: 'alternate_mobile' };

const getExistingPocData = (id, data) => {
	const poc = (data || []).find((p) => p.id === id);
	const PARAMS_DATA = {};

	Object.keys(poc || {})?.forEach((k) => {
		if (EXISTING_POC_KEYS.includes(k)) {
			PARAMS_DATA[k] = poc[k];
		}
	});

	return PARAMS_DATA;
};

const getCreateOrgPocParams = (values) => {
	const { formValues = {}, existingPocData = [], trade_party_type = '', trade_party_id } = values;
	const { existing_poc = '' } = formValues;
	let params = { trade_party_type, trade_party_id };

	if (existing_poc) {
		params = { ...params, ...getExistingPocData(existing_poc, existingPocData) };
		return params;
	}

	Object.keys(formValues).forEach((k) => {
		if (!EXCLUDE_POC_KEYS.includes(k)) { params[k] = formValues[k]; }
	});

	Object.keys(CONTACT).forEach((contact_key) => {
		if (!isEmpty(formValues[contact_key])) {
			Object.keys(formValues[contact_key]).forEach((form_key) => {
				if (formValues[contact_key]?.[form_key]) {
					params[`${CONTACT[contact_key]}_${form_key}`] = formValues[contact_key][form_key];
				}
			});
		}
	});

	return params;
};

export default getCreateOrgPocParams;
