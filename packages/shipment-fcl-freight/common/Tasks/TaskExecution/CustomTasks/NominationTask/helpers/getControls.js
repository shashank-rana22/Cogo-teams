const getControls = ({
	taskData,
	task,
	primaryService = {},
	shipmentData = {},
}) => {
	const options = [];

	(taskData?.apis_data?.list_organization_users || []).forEach((user) => {
		options.push({
			label : user.name,
			value : user.user_id,
		});
	});

	const ccOptions = [
		{
			label : task?.stakeholder?.name,
			value : task?.stakeholder?.id,
		},
	];

	let cargoWeight = 0;
	(primaryService?.cargo_details || []).forEach((container) => {
		cargoWeight += container?.cargo_weight_per_container || 0;
	});

	return [
		{
			name        : 'agent_id',
			type        : 'select',
			label       : 'To',
			span        : 8,
			options,
			placeholder : 'Select Agent',
			rules       : { required: 'Agent is required' },
			size        : 'sm',
		},

		{
			name     : 'cc',
			type     : 'select',
			span     : 8,
			disabled : true,
			options  : ccOptions,
			label    : 'CC',
			value    : task?.stakeholder?.id,
			size     : 'sm',
		},

		{
			name        : 'email_body',
			type        : 'textarea',
			// eslint-disable-next-line max-len
			value       : `We have received nomination from below customer for ${primaryService?.origin_port?.display_name} to ${primaryService?.destination_port?.display_name}`,
			span        : 12,
			label       : 'Email Body',
			placeholder : 'Add Email Body Here',
			rules       : { required: 'Email Body is required' },
			size        : 'sm',
		},
		{
			name  : 'shipper_details',
			type  : 'text',
			label : 'Shipper Details',
			rules : { required: 'Shipper Details is required' },
			span  : 4,
			value : shipmentData?.importer_exporter?.business_name || '',
			size  : 'sm',
		},
		{
			name  : 'consignee_details',
			type  : 'text',
			label : 'Consignee Details',
			rules : { required: 'Consignee Details is required' },
			span  : 4,
			value : shipmentData?.importer_exporter?.business_name || '',
			size  : 'sm',
		},
		{
			name  : 'commodity',
			type  : 'text',
			rules : { required: 'Commodity is required' },
			label : 'Commodity',
			span  : 4,
			value : primaryService?.cargo_details[0]?.commodity_description || '',
			size  : 'sm',
		},
		{
			name  : 'hs_code',
			type  : 'text',
			rules : { required: 'HS Code is required' },
			label : 'HS Code',
			span  : 4,
			value : primaryService?.hs_code?.hs_code_name || '',
			size  : 'sm',
		},
		{
			name  : 'cargo_weight',
			type  : 'number',
			rules : { required: 'Cargo Wt. is required' },
			label : 'Cargo Weight (Per Container)',
			span  : 4,
			value : cargoWeight || '',
			size  : 'sm',
		},
		{
			name  : 'free_days_detention_destination',
			type  : 'number',
			rules : { required: 'Detention days is required' },
			label : 'Free Detention Days',
			span  : 4,
			value : primaryService?.free_days_detention_destination || '',
			size  : 'sm',
		},
	];
};

export default getControls;
