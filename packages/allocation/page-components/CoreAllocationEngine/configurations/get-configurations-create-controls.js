const getCreateConfigurationsControls = ({
	setSegment = () => {},
}) => {
	const controls = [
		{
			name    : 'service_type',
			label   : 'Service Type',
			type    : 'radioGroup',
			options : [
				{ value: 'organization', label: 'Organization' },
				{ value: 'lead_organization', label: 'Lead Organization' },
			],
			rules: {
				required: 'Service Type is required',
			},
		},
		{
			name        : 'role_ids',
			label       : 'Roles',
			placeholder : 'Select roles',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_roles',
			initialCall : false,
			params      : {
				permissions_data_required : false,
				filters                   : {
					partner_entity_types: ['cogoport'],
				},
			},
			rules: {
				required: 'Roles is required',
			},
			isClearable: true,
		},
		{
			name        : 'user_ids',
			label       : 'Users',
			placeholder : 'Select Users',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_users',
			initialCall : false,
			disabled    : true,
			valueKey    : 'user_id',
			isClearable : true,
		},
		{
			name        : 'exclusion_user_ids',
			label       : 'Excluded Users',
			placeholder : 'Select Users',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_users',
			initialCall : false,
			disabled    : true,
			valueKey    : 'user_id',
			isClearable : true,
		},
		{
			name        : 'stakeholder_type',
			label       : 'Stakeholder Type',
			placeholder : 'Select stakeholder type',
			type        : 'select',
			options     : [
				{ value: 'sales_agent', label: 'Sales Agent' },
				{ value: 'booking_agent', label: 'Booking Agent' },
				{ value: 'supply_agent', label: 'Supply Agent' },
				{ value: 'entity_manager', label: 'Entity Manager' },
				{ value: 'ckam', label: 'CKAM' },
				{ value: 'credit_controller', label: 'Credit Controller' },
				{ value: 'service_ops2', label: 'Service OPS 2' },
				{ value: 'trade_finance_agent', label: 'Trade Finance Agent' },
			],
			rules: {
				required: 'Stakeholder Type is required',
			},
			isClearable: true,
		},
		{
			name              : 'segment_id',
			label             : 'Segment Type',
			placeholder       : 'Type segment here...',
			type              : 'asyncSelect',
			asyncKey          : 'segments',
			labelKey          : 'name',
			valueKey          : 'id',
			initialCall       : false,
			getSelectedOption : (obj) => {
				setSegment(obj?.name);
			},
			params: {
				segment_type         : 'global',
				status               : 'active',
				is_lead_user_segment : false,
			},
			rules: {
				required: 'Segment is Required',
			},
			isClearable: true,
		},
		{
			name        : 'locking_criterion',
			label       : 'Locking Criterion',
			placeholder : 'Select Locking Criterion',
			type        : 'select',
			options     : [
				{ value: 'quotations_last_date', label: 'Quotation' },
				{ value: 'shipment_booked', label: 'Shipment Booked' },
			],
			rules: {
				required: 'Locking Criteria is Required',
			},
			isClearable: true,
		},
		{
			name        : 'locking_period',
			label       : 'Locking Period (Days)',
			placeholder : 'Enter Number of Days',
			type        : 'number',
			rules       : {
				required: 'Locking Period is Required',
			},
		},
		{
			name        : 'cooling_period',
			label       : 'Cooling Period (Days)',
			placeholder : 'Enter Number of Days',
			type        : 'number',
			rules       : {
				required: 'Cooling Period is Required',
			},
		},
		{
			name        : 'schedule_data',
			label       : 'Schedule',
			placeholder : 'Select Schedule',
			type        : 'selectDayFrequency',
			rules       : {
				required: 'Schedule is Required',
			},
		},
	];

	return controls;
};

export default getCreateConfigurationsControls;
