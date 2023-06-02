const controlsFunc = (organization_id, item) => [
	{
		label        : 'Vehicle details *',
		span         : 12,
		showOptional : false,
		name         : 'driver_details_heading',
	},
	{
		name        : 'name',
		label       : 'Name',
		placeholder : 'Model number / name',
		type        : 'text',
		value       : item?.name,
		span        : 4,
		rules       : { required: 'Name is required' },
	},
	{
		label          : 'Organization Branch',
		name           : 'organization_branch_id',
		placeholder    : 'Organization branch',
		type           : 'select',
		optionsListKey : 'organization-branches',
		params         : { filters: { organization_id } },
		caret          : true,
		value          : item?.organization_branch_id,
		span           : 4,
		disabled       : item?.object_type === 'OrganizationBranch',
		isClearable    : true,
		defaultOptions : true,
		rules          : { required: 'Organization is required' },
	},
	{
		label       : 'Asset Type',
		name        : 'asset_type',
		type        : 'select',
		span        : 4,
		value       : item?.asset_type,
		placeholder : 'Asset type',
		options     : [{ label: 'Truck', value: 'truck' }],
		rules       : { required: 'Asset type is required' },
	},
	{
		name        : 'owner_name',
		label       : 'Owner Name',
		placeholder : 'Owner name',
		type        : 'text',
		value       : item?.data?.owner_name,
		span        : 4,
		rules       : { required: 'Owner name is required' },
	},
	{
		label       : 'Vehicale Category',
		name        : 'vehicle_category',
		type        : 'select',
		span        : 4,
		value       : item?.data?.vehicle_category,
		placeholder : 'Vehicle category',
		options     : [
			{ label: 'Commercial', value: 'commercial' },
			{ label: 'Personal', value: 'personal' },
		],
		rules: { required: 'Vehicle category is required' },
	},
	{
		label          : 'Vehicle Type',
		name           : 'vehicle_type',
		type           : 'select',
		value          : item?.data?.vehicle_type,
		caret          : true,
		optionsListKey : 'truck-types',
		placeholder    : 'Vehicle type',
		span           : 4,
		rules          : { required: 'Truck Type is required' },
	},
	{
		name        : 'truck_number',
		label       : 'Truck Number',
		placeholder : 'Vehicle number',
		type        : 'text',
		value       : item?.name,
		span        : 4,
		rules       : { required: 'Truck number is required' },
	},
	{
		name        : 'asset_registration_number',
		label       : 'Registration Number (Truck Number)',
		placeholder : 'RC Number (Truck Number)',
		type        : 'text',
		value       : item?.data?.asset_registration_number,
		span        : 4,
		rules       : { required: 'Registration number is required' },
	},

	{
		label       : 'Registration Data',
		name        : 'registration_date',
		type        : 'datepicker',
		span        : 4,
		placeholder : 'Registration date',
		value       : item?.data?.registration_date,
		rules       : { required: 'Registration date is required' },
	},

	{
		label       : 'RC Validity',
		name        : 'rc_valid_till',
		type        : 'datepicker',
		span        : 4,
		placeholder : 'RC Valid till',
		value       : item?.data?.rc_valid_till,
		rules       : { required: 'Vaild till is required' },
	},
	{
		label        : 'Insurance Validity',
		name         : 'insurance_valid_till',
		type         : 'datepicker',
		span         : 4,
		placeholder  : 'Insurance valid till',
		value        : item?.data?.insurance_valid_till,
		showOptional : false,
	},
	{
		label        : 'Insurance Policy',
		name         : 'insurance_policy_type',
		type         : 'select',
		span         : 4,
		value        : item?.data?.insurance_policy_type,
		placeholder  : 'Policy type',
		showOptional : false,
		options      : [
			{ label: 'Comprehensive', value: 'comprehensive' },
			{ label: '3rd Party', value: '3rd_party' },
		],
	},

	{
		name         : 'insurance_policy_number',
		label        : 'Insurance Number',
		placeholder  : 'Insurance policy number',
		type         : 'text',
		showOptional : false,
		value        : item?.data?.insurance_policy_number,
		span         : 4,
	},

	{
		label           : 'Truck Proof',
		name            : 'image_url',
		type            : 'file',
		className       : 'primary md',
		span            : 12,
		uploadIcon      : 'ic-upload',
		themeType       : 'secondary',
		placeholder     : 'Upload truck proof',
		value           : item?.image_url,
		onlyURLOnChange : true,
		accept:
			//  eslint-disable-next-line
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		drag       : true,
		height     : 90,
		lowerlabel : 'Upload truck proof  document',
		rules      : {
			required: 'Truck proof document is required',
		},
	},
];

export default controlsFunc;
