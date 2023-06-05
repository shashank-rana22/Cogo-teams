import getGeoConstants from '@cogoport/globalization/constants/geo';
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const geo = getGeoConstants();

const controls = ({ watch }) => {
	const watchCountryId = watch('country_id');

	const panPatternValue = getCountrySpecificData({
		country_id    : watchCountryId,
		accessorType  : 'pan_number',
		accessor      : 'pattern',
		isDefaultData : false,
	});

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
					value   : panPatternValue,
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
