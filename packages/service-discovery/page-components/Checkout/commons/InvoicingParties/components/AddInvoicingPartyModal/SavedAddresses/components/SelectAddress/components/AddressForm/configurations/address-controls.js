import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const getAddressMappingControls = ({ organizationCountryId }) => [
	{
		name      : 'gst_list',
		type      : 'select',
		span      : 6,
		className : 'primary md',
		showIn    : ['billingAddress'],
		rules     : {
			required: true,
		},
	},
	{
		type  : 'text',
		name  : 'name',
		label : 'Billing Party Name',
		rules : {
			required: true,
		},
		span   : 6,
		showIn : ['billingAddress', 'otherAddress'],
	},
	{
		type    : 'select',
		name    : 'address_type',
		label   : 'Address Type',
		options : [
			{
				label : 'Office',
				value : 'office',
			},
			{
				label : 'Factory',
				value : 'factory',
			},
			{
				label : 'Warehouse Address',
				value : 'warehouse',
			},
		],
		rules: {
			required: true,
		},
		span   : 6,
		showIn : ['otherAddress'],
	},
	{
		type           : 'async-select',
		name           : 'country_id',
		label          : 'Country of Registration',
		asyncKey       : 'list_locations',
		defaultOptions : true,
		params         : {
			filters    : { status: 'active', type: ['country'] },
			page_limit : 10,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, default_params_required: true },
		},
		caret : true,
		rules : {
			required: true,
		},
		span   : 6,
		showIn : ['otherAddress'],
	},
	{
		type  : 'text',
		name  : 'tax_number',
		label : (
			<>
				<CountrySpecificData
					country_id={organizationCountryId}
					accessorType="registration_number"
					accessor="label"
				/>
				{' '}
				Number
			</>
		),
		className : 'uppercase',
		maxLength : 15,
		rules     : {
			required: true,
		},
		span   : 6,
		showIn : ['billingAddress'],
	},
	{
		type     : 'async-select',
		name     : 'pincode',
		label    : 'Pincode',
		asyncKey : 'list_locations',
		labelKey : 'postal_code',
		valueKey : 'postal_code',
		params   : {
			filters    : { status: 'active', type: ['pincode'] },
			page_limit : 10,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, default_params_required: true },
		},
		caret : true,
		rules : {
			required: true,
		},
		span   : 6,
		showIn : ['billingAddress', 'otherAddress'],
	},
	{
		type       : 'file-uploader',
		name       : 'tax_number_document_url',
		label      : 'TAX Proof',
		uploadType : 'aws',
		drag       : true,
		height     : 45,
		rules      : {
			required: true,
		},
		span   : 6,
		showIn : ['billingAddress'],
	},
	{
		name           : 'organization_branch_id',
		label          : 'Organization Branch',
		placeholder    : 'Select organization Branch',
		type           : 'select',
		value          : '',
		optionsListKey : 'organization-branches',
		caret          : true,
		isClearable    : true,
		defaultOptions : true,
		rules          : {
			required: 'Name is required',
		},
		className : 'primary sm',
		showIn    : ['billingAddress'],
	},
	{
		type  : 'textarea',
		name  : 'address',
		label : 'Address',
		rules : {
			required: true,
		},
		span   : 6,
		height : 45,
		showIn : ['billingAddress', 'otherAddress'],
		style  : {
			resize: 'vertical',
		},
	},
	{
		type    : 'checkbox_group',
		name    : 'is_sez',
		options : [
			{
				value : 'true',
				label : (
					<>
						Is
						{' '}
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="economic_zone"
							accessor="label"
						/>
						{' '}
					</>
				),
			},
		],
		span   : 12,
		showIn : ['billingAddress'],
	},
	{
		type  : 'file-uploader',
		name  : 'sez_proof',
		label : (
			<>
				<CountrySpecificData
					country_id={organizationCountryId}
					accessorType="economic_zone"
					accessor="label"
				/>
				{' '}
				Proof
			</>
		),
		uploadType : 'aws',
		drag       : true,
		height     : 45,
		rules      : {
			required: true,
		},
		span   : 6,
		showIn : ['billingAddress'],
	},
];

export default getAddressMappingControls;
