import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

import FORM_VALUE_PATTERNS from '../../../../utils/formValuePatterns';

const { EMAIL, GST_NUMBER } = FORM_VALUE_PATTERNS;

export const addAddressControls = ({ setValue = () => {} }) => [
	{
		label       : 'Billing Party Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rules       : {
			required: { message: 'Billing Party Name is required' },
		},
		span: 6,
	},
	{
		label       : 'Address',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: { message: 'Address is required' },
		},
		span: 6,
	},
	{
		label       : 'Pincode',
		name        : 'pincode',
		type        : 'async_select',
		placeholder : 'Enter Pincode',
		asyncKey    : 'list_locations',
		valueKey    : 'postal_code',
		labelKey    : 'postal_code',
		rules       : {
			required: { message: 'Pincode is required' },
		},
		getSelectedOption: (option) => {
			setValue('country_id', option?.country?.name);
			setValue('state', option?.region?.name);
			setValue('city', option?.city?.name);
		},
		initialCall : false,
		params      : {
			filters: {
				type: ['pincode'],
			},
			includes: {
				country                 : true,
				region                  : true,
				city                    : true,
				default_params_required : true,
			},
		},
		show : true,
		span : 3,

	},
	{
		label       : 'Country',
		name        : 'country_id',
		type        : 'text',
		placeholder : 'Enter Country',
		rules       : {
			required: { value: true, message: 'Country is required' },
		},
		span     : 6,
		disabled : true,
	},
	{
		label       : 'State',
		name        : 'state',
		type        : 'text',
		placeholder : 'Enter State',
		span        : 6,
		disabled    : true,
	},
	{
		label       : 'City',
		name        : 'city',
		type        : 'text',
		placeholder : 'Enter City',
		span        : 6,
		disabled    : true,
	},
	{
		label       : 'Tax Number',
		name        : 'tax_number',
		type        : 'text',
		placeholder : 'Enter Tax Number',
		rules       : {
			pattern: {
				value   : GST_NUMBER,
				message : 'Invalid Tax number',
			},
		},
		span: 6,
	},

	{
		label       : 'POC Name',
		name        : 'poc_name',
		type        : 'text',
		placeholder : 'Enter POC Name',
		valueKey    : 'business_name',
		span        : 6,
	},
	{
		label       : 'Email Id',
		name        : 'email',
		type        : 'text',
		placeholder : 'Enter Email Id',
		rules       : {
			pattern: {
				value   : EMAIL,
				message : 'Invalid email address',
			},
		},
		span: 6,
	},
	{
		label       : 'Phone Number',
		name        : 'phoneNumber',
		type        : 'mobileSelect',
		placeholder : 'Enter Phone Number',
		rules       : {
			required : 'Mobile Number is required',
			validate : (v) => GLOBAL_CONSTANTS.regex_patterns.mobile_number.test(v) || 'Invalid Phone Number',
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.mobile_number,
				message : 'Invalid Phone Number',
			},
		},
		span: 6,
	},
];

export const useGetControls = ({ checked, country_id = '', setValue = () => {} }) => {
	const countryCode = getCountryDetails({ country_id });
	const controls = addAddressControls({ setValue });

	return (controls || []).map((control) => {
		if (control.name === 'tax_number') {
			return {
				...control,
				rules: {
					required : checked,
					pattern  : {
						value:
							GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service
								.cargo_insurance.countries.includes(
									countryCode,
								)
								? GST_NUMBER
								: '',
						message: 'Invalid Tax number',
					},
				},
			};
		}
		return {
			...control,
		};
	});
};
