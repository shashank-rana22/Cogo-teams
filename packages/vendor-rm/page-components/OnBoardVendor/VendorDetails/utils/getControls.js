import { IcMCloudUpload } from '@cogoport/icons-react';

const getControls = ({ country_id = '', entityOptions = [] }) => {
	const filteredOptions = (entityOptions || []).filter((item) => {
		const { country_id: COUNTRY_ID } = item;
		return (
			country_id === COUNTRY_ID
		);
	});
	return ([
		{

			name        : 'country_id',
			label       : 'Country of Registration',
			type        : 'asyncSelect',
			params      : { filters: { type: ['country'] } },
			asyncKey    : 'list_locations',
			placeholder : 'Select a Country',
			style       : { flexBasis: '30%' },
			condition   : { type: ['country'] },
			rules       : { required: 'Country is required' },
		},
		{
			name        : 'registration_number',
			label       : 'Registration Number',
			type        : 'countrywise-tax-select',
			style       : { flexBasis: '30%' },
			condition   : { type: ['country'] },
			typeKey     : 'registrationType',
			numberKey   : 'registrationNumber',
			placeholder : 'Enter Registration Number',
			className   : 'countrywise_registration_number',
			rules       : { required: 'Registration Number is required' },
		},
		{
			name        : 'business_name',
			label       : 'Name of the Organization',
			type        : 'text',
			style       : { flexBasis: '30%' },
			placeholder : 'Type here',
			rules       : { required: 'Name of the Organization is required' },
		},
		{
			name            : 'registration_proof_url',
			showLabel       : false,
			label           : 'Upload Tax Document Proof (PAN)',
			style           : { flexBasis: '99%' },
			type            : 'file',
			themeType       : 'secondary',
			draggable       : true,
			uploadIcon      : <IcMCloudUpload height={56} width={56} />,
			onlyURLOnChange : true,
			accept          : 'image/*',
			uploadType      : 'aws',
			rules           : { required: 'Tax Document is required' },
		},
		{
			name        : 'company_type',
			label       : 'Type of Company',
			type        : 'select',
			placeholder : 'Select an Organization Type',
			style       : { flexBasis: '30%' },
			rules       : { required: 'Company Type is required' },
		},
		{
			name        : 'city_id',
			label       : 'Branch',
			type        : 'asyncSelect',
			params      : { filters: { type: ['city'], country_id } },
			asyncKey    : 'list_locations',
			style       : { flexBasis: '30%' },
			placeholder : 'Select a city',
			condition   : { type: ['city'] },
			rules       : { required: 'City is Required' },
		},
		{
			name           : 'cogo_entity_id',
			label          : 'Cogo Entity',
			type           : 'select',
			multiple       : false,
			defaultOptions : false,
			placeholder    : 'Entity',
			style          : { flexBasis: '30%' },
			options        : filteredOptions,
			rules          : { required: 'Cogo Entity is Required' },
		},
	]);
};

export default getControls;
