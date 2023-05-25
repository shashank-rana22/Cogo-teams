import PATTERNS from '@cogoport/constants/patterns';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

const geo = getGeoConstants();
const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const controls = ({ watch }) => {
	const watchCountryId = watch('country_id');
	const isCountryIndia = watchCountryId === INDIA_COUNTRY_ID;

	const formControl = [
		{
			name     : 'country_id',
			label    : 'Country',
			type     : 'async-select',
			asyncKey : 'list_locations',
			params   : {
				filters: { type: ['country'] },
			},
			placeholder : 'Select Country',
			rules       : { required: { value: true, message: 'Country is required' } },
		},
		{
			name        : 'registration_number',
			label       : 'PAN Number',
			type        : 'input',
			placeholder : 'Enter PAN Number',
			rules       : {
				required : 'PAN Number is required',
				pattern  : {
					value   : isCountryIndia && PATTERNS.PAN_NUMBER,
					message : 'PAN is invalid',
				},
			},
		},
		{
			name        : 'business_name',
			label       : 'Business Name',
			type        : 'input',
			placeholder : 'Enter Business Name here',
			rules       : { required: 'Business Name is required' },
		},
		{
			name        : 'company_type',
			label       : 'Type of Company',
			type        : 'select',
			placeholder : 'Select Type of Company',
			options     : geo.options.registration_types,
			rules       : { required: 'Type of Company is required' },
		},
		{
			name  : 'verification_document',
			label : 'Trade Party Verification document',
			type  : 'file',
			rules : { required: 'Trade Party Verification Document is required' },
		},
	];

	return { formControl };
};

export default controls;
