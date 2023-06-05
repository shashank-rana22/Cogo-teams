import { getCountryConstants } from '@cogoport/globalization/constants/geo';

const formValuePatterns = (formValues) => ({
	PAN_NUMBER: getCountryConstants({ country_id: formValues?.country_id })?.regex?.PAN,

	EMAIL: getCountryConstants({ country_id: formValues?.country_id })?.regex?.EMAIL,

	CONTAINER_NUMBER: /^[A-Z]{3}U[0-9]{6,7}$/,

	GST_NUMBER: getCountryConstants({ country_id: formValues?.country_id }),
});

export default formValuePatterns;
