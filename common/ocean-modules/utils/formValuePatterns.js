import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const formValuePatterns = (formValues) => ({
	PAN_NUMBER: getCountrySpecificData({
		country_id    : formValues?.country_id,
		accessorType  : 'pan_number',
		accessor      : 'pattern',
		isDefaultData : false,
	}),

	EMAIL: getCountrySpecificData({
		country_id    : formValues?.country_id,
		accessorType  : 'email',
		accessor      : 'pattern',
		isDefaultData : false,
	}),

	CONTAINER_NUMBER: /^[A-Z]{3}U[0-9]{6,7}$/,

	GST_NUMBER: getCountrySpecificData({
		country_id    : formValues?.country_id,
		accessorType  : 'registration_number',
		accessor      : 'pattern',
		isDefaultData : false,
	}),
});

export default formValuePatterns;
