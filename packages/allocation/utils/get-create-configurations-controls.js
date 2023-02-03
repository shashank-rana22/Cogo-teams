import { startCase } from '@cogoport/utils';

const getCreateConfigurationsControls = ({
	value = {},
	// setSegment = () => {}
}) => {
	const controls = [
		{
			name    : 'service_type',
			label   : 'Service Type',
			type    : 'radioGroup',
			value   : value.service_type || 'organization',
			options : [
				{ value: 'organization', label: 'Organization' },
				{ value: 'lead_organization', label: 'Lead Organization' },
			],
			rules: {
				required: true,
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
			value       : value.role_ids,
			params      : {
				permissions_data_required : false,
				filters                   : {
					stakeholder_id   : '6fd98605-9d5d-479d-9fac-cf905d292b88',
					stakeholder_type : 'partner',
				},
			},
			rules: {
				required: true,
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
			value       : value.user_ids,
			valueKey    : 'user_id',
			isClearable : true,
		},
		{
			name        : 'stakeholder_type',
			label       : 'Stakeholder Type',
			placeholder : 'Select stakeholder type',
			type        : 'select',
			value       : value.stakeholder_type,
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
				required: true,
			},
			isClearable: true,
		},
		{
			name               : 'segment_id',
			label              : 'Segment Type',
			placeholder        : 'Type segment here...',
			type               : 'asyncSelect',
			asyncKey           : 'segments',
			initialCall        : false,
			value              : value.segment_id,
			// labelKey           : 'label',
			// handleChange : (obj) => {
			// 	console.log('obj :: ', obj);
			// 	setSegment(obj);
			// },
			getModifiedOptions : ({ options }) => options.map((option) => ({
				...option,
				name: `${startCase(option.name)}`,
			})),
			params: {
				segment_type         : 'global',
				status               : 'active',
				is_lead_user_segment : false,
			},
			rules: {
				required: true,
			},
			isClearable: true,
		},

		{
			name        : 'locking_criterion',
			label       : 'Locking Criterion',
			placeholder : 'Select Locking Criterion',
			type        : 'select',
			value       : value.locking_criterion,
			options     : [
				{ value: 'quotations_last_date', label: 'Quotation' },
				{ value: 'shipment_booked', label: 'Shipment Booked' },
			],
			rules: {
				required: true,
			},
			isClearable: true,
		},
		{
			name        : 'locking_period',
			label       : 'Locking Period (Days)',
			placeholder : 'Enter Days',
			type        : 'number',
			value       : value.locking_period,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'cooling_period',
			label       : 'Cooling Period (Days)',
			placeholder : 'Enter Days',
			type        : 'number',
			value       : value.cooling_period,
			rules       : {
				required: true,
			},
		},
		// {
		// 	name        : 'schedule_data',
		// 	label       : 'Schedule',
		// 	placeholder : 'Select Schedule',
		// 	type        : 'select-day-frequency',
		// 	rules       : {
		// 		required: true,
		// 	},
		// 	value: {
		// 		schedule_type  : value.schedule_type,
		// 		dates_of_month : value.days,
		// 		days_of_week   : value.days,
		// 	},
		// },
	];

	return controls;
};

export default getCreateConfigurationsControls;
