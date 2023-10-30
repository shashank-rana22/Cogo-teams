import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryOptions from '@cogoport/globalization/utils/getCountryOptions';

const geo = getGeoConstants();
const countryOptions = getCountryOptions();

const createLeadControls = ({ formValues }) => [
	{
		label       : 'Country',
		name        : 'country_id',
		placeholder : 'Select Country',
		controlType : 'select',
		options     : countryOptions,
		isClearable : true,
		rules       : { required: 'This is Required' },
	},
	{
		label       : 'Company Name',
		name        : 'company_name',
		placeholder : 'Enter company name',
		controlType : 'input',
		rules       : { required: 'This is Required' },
	},
	{
		label       : 'Name',
		name        : 'name',
		placeholder : 'Enter customer name',
		controlType : 'input',
		rules       : { required: 'This is Required' },
	},
	{
		label       : 'Phone Number',
		name        : 'mobile_number',
		placeholder : 'Enter Mobile Number',
		controlType : 'mobile_number',
		rules       : {
			validate: (val) => {
				if (!val?.number && formValues?.email_id) {
					return true;
				}

				if (!val?.number || !val?.country_code) {
					return 'Either Phone Number or Email is Required.';
				}

				return geo.regex.MOBILE_NUMBER_WITHOUT_COUNTRY_CODE.test(val?.number) || 'Invalid Phone Number';
			},
		},
	},
	{
		label       : 'Email',
		name        : 'email_id',
		placeholder : 'Enter email address',
		controlType : 'input',
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Enter valid email',
			},
			validate: (val) => {
				if (!val && (
					!formValues?.mobile_number?.number
					|| !formValues?.mobile_number?.country_code
				)) {
					return 'Either Phone Number or Email is Required.';
				}

				return true;
			},
		},
	},
];

export default createLeadControls;
