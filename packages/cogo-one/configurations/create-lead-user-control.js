import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryOptions from '@cogoport/globalization/utils/getCountryOptions';

const geo = getGeoConstants();
const countryOptions = getCountryOptions();

const CREATE_LEAD_CONTROLS = [
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
			validate: (v) => {
				if (!v?.number || !v?.country_code) {
					return 'Phone Number is required';
				}
				return geo.regex.MOBILE_NUMBER_WITHOUT_COUNTRY_CODE.test(v.number) || 'Invalid Phone Number';
			},
		},
	},
	{
		label       : 'Email',
		name        : 'email_id',
		placeholder : 'Enter email address',
		controlType : 'input',
		rules       : {
			required: {
				value   : true,
				message : 'Email is required',
			},
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Enter valid email',
			},
		},
	},
];

export default CREATE_LEAD_CONTROLS;
