const controlsFunc = (organization_id, item) => [
	{
		label        : 'Driver details *',
		span         : 12,
		showOptional : false,
		name         : 'driver_details_heading',
	},
	{
		name        : 'name',
		label       : '   ',
		placeholder : 'Enter name',
		type        : 'text',
		value       : item?.name,
		span        : 6,
		rules       : { required: 'Name is required' },
	},
	{
		name         : 'email',
		label        : '   ',
		placeholder  : 'Enter email',
		type         : 'text',
		value        : item?.email,
		span         : 6,
		showOptional : false,
	},
	{
		label          : '   ',
		name           : 'organization_branch_id',
		placeholder    : 'Select organization Branch',
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
		label       : '   ',
		name        : 'mobile_number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile-number-select',
		value       : {
			mobile_country_code : item?.mobile_country_code,
			mobile_number       : item?.mobile_number,
		},
		numberKey : 'mobile_number',
		codeKey   : 'mobile_country_code',
		span      : 4,
		select2   : 'new',
		rules     : {
			required : true,
			validate : (value) => (value?.mobile_country_code && value?.mobile_number
				? undefined
				: 'Mobile Number is Required'),
		},
	},
	{
		label       : '   ',
		name        : 'mobile_number',
		type        : 'number',
		span        : 4,
		placeholder : 'Enter Mobile Number',
		value       : item?.mobile_number,
		rules       : {
			required: 'Mobile Number is required',
		},
	},
	{
		label        : '   ',
		name         : 'dob',
		type         : 'datepicker',
		span         : 4,
		placeholder  : 'Enter DOB',
		value        : item?.data?.dob,
		showOptional : false,
		rules        : {
			required: 'Date of birth is required',
		},
	},
	{
		label        : '  ',
		span         : 12,
		showOptional : false,
		name         : 'empty_row',
	},

	{
		label        : 'Address *',
		span         : 12,
		name         : 'address_details_heading',
		showOptional : false,
	},
	{
		label       : '   ',
		name        : 'address',
		type        : 'text',
		span        : 3,
		placeholder : 'Enter address',
		value       : item?.data?.address,
		rules       : { required: 'Address is required' },
	},
	{
		label       : '   ',
		name        : 'pincode',
		type        : 'text',
		span        : 3,
		value       : item?.data?.pincode,
		placeholder : 'Enter pincode',
		rules       : { required: 'Pincode is required' },
	},

	{
		label       : '   ',
		name        : 'address_proof_type',
		type        : 'select',
		span        : 3,
		isClearable : true,
		value       : item?.data?.address_proof_type,
		placeholder : 'Address Proof Type',
		options     : [
			{ label: 'Aadhar Card', value: 'aadhar_card' },
			{ label: 'Voter Id Card', value: 'voter_id_card' },
			{ label: 'Electricity Bill', value: 'electricity_bill' },
		],
		rules: { required: 'Address proof type is required' },
	},
	{
		label       : '   ',
		value       : item?.data?.address_proof_number,
		name        : 'address_proof_number',
		type        : 'text',
		span        : 3,
		placeholder : 'Enter identity proof number',
		rules       : { required: 'Address proof number is required' },
	},
	{
		label           : '   ',
		name            : 'address_proof_document',
		type            : 'file',
		span            : 12,
		uploadIcon      : 'ic-upload',
		themeType       : 'secondary',
		placeholder     : 'Upload Identity Proof Document...',
		value           : item?.data?.address_proof_document,
		onlyURLOnChange : true,
		accept:
		//  eslint-disable-next-line
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		drag       : true,
		height     : 90,
		lowerlabel : 'Upload address proof  document',
	},
	{
		label        : '  ',
		span         : 12,
		showOptional : false,
		name         : 'empty_row',
	},

	{
		label        : 'Pan Details *',
		span         : 12,
		name         : 'pan_details_heading',
		showOptional : false,
	},
	{
		label       : '   ',
		name        : 'pan_number',
		type        : 'text',
		span        : 6,
		value       : item?.data?.pan_number,
		placeholder : 'Enter pan number',
	},
	{
		label           : '   ',
		name            : 'pan_url',
		type            : 'file',
		span            : 12,
		uploadIcon      : 'ic-upload',
		themeType       : 'secondary',
		value           : item?.data?.pan_url,
		placeholder     : 'Upload PAN Card...',
		onlyURLOnChange : true,
		accept:
		//  eslint-disable-next-line
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		drag       : true,
		height     : 90,
		lowerlabel : 'Upload PAN card',
	},
	{
		label        : '  ',
		span         : 12,
		showOptional : false,
		name         : 'empty_row',
	},
	{
		label        : 'Driving License Details *',
		span         : 12,
		name         : 'driving_license_details_heading',
		showOptional : false,
	},
	{
		label       : '   ',
		name        : 'driver_license_type',
		type        : 'select',
		span        : 4,
		value       : item?.data?.driver_license_type,
		isClearable : true,
		placeholder : 'Driving License Type',
		options     : [
			{ label: 'HMB', value: 'hmb' },
			{ label: 'HGMB', value: 'hgmb' },
			{ label: 'HPMB', value: 'hpmb' },
			{ label: 'Trailer', value: 'trailer' },
		],
		rules: { required: 'Driving license is required' },
	},
	{
		label       : '   ',
		name        : 'dl_number',
		type        : 'text',
		span        : 4,
		value       : item?.data?.dl_number,
		placeholder : 'Driving License Number',
		validations : [{ type: 'required', message: 'Mandatory' }],
		rules       : { required: 'Driving license number is required' },
	},
	{
		label       : '   ',
		name        : 'last_date_of_validity_dl',
		placeholder : 'Last Date of Validity Of DL ',
		type        : 'datepicker',
		span        : 4,
		value       : item?.data?.last_date_of_validity_dl,
		rules       : { required: 'Last date is required' },
	},
	{
		label           : '   ',
		name            : 'driving_license_document',
		type            : 'file',
		span            : 12,
		value           : item?.data?.driving_license_document,
		uploadIcon      : 'ic-upload',
		themeType       : 'secondary',
		placeholder     : 'Upload Identity Proof Document...',
		onlyURLOnChange : true,
		accept:
		//  eslint-disable-next-line
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		drag       : true,
		height     : 90,
		lowerlabel : 'Upload Identity Proof Document',
		rules      : {
			required: 'Driving license document is required',
		},
	},
	{
		label        : '  ',
		span         : 12,
		showOptional : false,
		name         : 'empty_row',
	},
	{
		label        : 'Bank Details',
		span         : 12,
		name         : 'bank_details_heading',
		showOptional : false,
	},
	{
		name         : 'bank_name',
		type         : 'text',
		span         : 6,
		value        : item?.data?.bank_account_details?.bank_name,
		placeholder  : 'Bank Name',
		showOptional : false,
	},

	{
		name         : 'branch_name',
		type         : 'text',
		span         : 3,
		value        : item?.data?.bank_account_details?.branch_name,
		placeholder  : 'Branch Name',
		showOptional : false,
	},
	{
		name         : 'ifsc_number',
		type         : 'text',
		span         : 3,
		value        : item?.data?.bank_account_details?.ifsc_number,
		placeholder  : 'Bank IFSC',
		showOptional : false,
	},
	{
		label        : '  ',
		name         : 'account_holder_name',
		type         : 'text',
		span         : 6,
		value        : item?.data?.bank_account_details?.account_holder_name,
		placeholder  : 'Enter Account Holder',
		showOptional : false,
	},

	{
		label        : '  ',
		name         : 'bank_account_number',
		type         : 'text',
		span         : 6,
		value        : item?.data?.bank_account_details?.bank_account_number,
		placeholder  : 'Enter your Bank A/c Number',
		showOptional : false,
	},

	{
		label           : '  ',
		name            : 'cancelled_cheque',
		type            : 'file',
		span            : 12,
		value           : item?.data?.bank_account_details?.cancelled_cheque,
		uploadIcon      : 'ic-upload',
		themeType       : 'secondary',
		placeholder     : 'Upload cancelled cheque...',
		lowerlabel      : 'Upload cancelled cheque',
		onlyURLOnChange : true,
		accept:
		//  eslint-disable-next-line
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType   : 'aws',
		drag         : true,
		height       : 90,
		showOptional : false,
	},
];

export default controlsFunc;
