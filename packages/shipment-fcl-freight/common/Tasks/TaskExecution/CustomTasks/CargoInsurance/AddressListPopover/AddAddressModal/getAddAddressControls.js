import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

export const getAddAddressControls = ({ setValue = () => {} }) => [
	{
		label       : 'Billing Party Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rules       : {
			required: 'Billing Party Name is required',
		},
		span: 6,
	},
	{
		label       : 'Address',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: 'Address is required',
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
			required: 'Pincode is required',
		},
		onChange: (_, option) => {
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
		span        : 6,
		disabled    : true,
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
		span        : 6,
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
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
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
			validate: (v) => {
				if (!v?.number || !v?.country_code) {
					return 'Phone Number is required';
				}
				return GLOBAL_CONSTANTS.regex_patterns.mobile_number.test(v.number) || 'Invalid Phone Number';
			},
		},
		span: 12,
	},
];

export const getModifiedControls = ({ checked, countryId = '', setValue = () => {} }) => {
	const countryCode = getCountryDetails({ country_id: countryId });
	const controls = getAddAddressControls({ setValue });

	return (controls || []).map((control) => {
		if (control.name === 'tax_number') {
			return {
				...control,
				rules: {
					required : checked && { value: true, message: 'Tax Number is required' },
					validate : (v) => GLOBAL_CONSTANTS.regex_patterns.gst_number.test(v) || 'Invalid Tax Number',
					pattern  : {
						value:
							GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service
								.cargo_insurance.countries.includes(
									countryCode,
								)
								? GLOBAL_CONSTANTS.regex_patterns.gst_number
								: '',
						message: 'Invalid Tax Number',
					},
				},
			};
		}
		return {
			control,
		};
	});
};
