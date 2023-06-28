import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

import FORM_VALUE_PATTERNS from '../../../../utils/formValuePatterns';

const { EMAIL, GST_NUMBER } = FORM_VALUE_PATTERNS;
const MOBILE_VALIDATOR = /^[0-9]{10}$/;

export const addAddressControls = [
	{
		label       : 'Billing Party Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rules       : {
			required: { value: true, message: 'Billing Party Name is required' },
		},
		span: 6,
	},
	{
		label       : 'Address',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: { value: true, message: 'Address is required' },
		},
		span: 6,
	},
	{
		label       : 'Pincode',
		name        : 'pincode',
		type        : 'text',
		placeholder : 'Enter Pincode',
		rules       : {
			required: { value: true, message: 'Pincode is required' },
		},
		span: 3,
	},
	{
		label       : 'Country',
		name        : 'country_id',
		type        : 'async_select',
		placeholder : 'Enter Country',
		rules       : {
			required: { value: true, message: 'Country is required' },
		},
		asyncKey    : 'list_locations',
		initialCall : false,
		params      : {
			filters: {
				type: ['country'],
			},
		},
		span: 6,
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
			pattern: {
				value   : MOBILE_VALIDATOR,
				message : 'Invalid phone number',
			},
		},
		span: 6,
	},
];

export const useGetControls = ({ checked }) => {
	const {
		watch,
	} = useForm();
	const country_id = watch('country_id');

	const countryCode = getCountryDetails({
		country_id,
	});

	return (addAddressControls || []).map((control) => {
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
