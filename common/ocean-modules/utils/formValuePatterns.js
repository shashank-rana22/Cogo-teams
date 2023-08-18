import { getCountryConstants } from '@cogoport/globalization/constants/geo';

const formValuePatterns = (country_id) => {
	const regEx = getCountryConstants({ country_id, isDefaultData: false })?.regex || {};

	return {
		PAN_NUMBER: regEx.TAX,

		EMAIL: regEx.EMAIL,

		CONTAINER_NUMBER: regEx.CONTAINER_NUMBER,

		GST_NUMBER: regEx.GST,
	};
};

export default formValuePatterns;
