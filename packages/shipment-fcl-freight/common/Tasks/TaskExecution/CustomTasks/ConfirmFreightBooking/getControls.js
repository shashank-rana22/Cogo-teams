const getControls = ({ taskData = {} }) => {
	const options = (taskData?.apis_data?.list_organization_users || []).map((user) => ({
		label : user?.name,
		value : user?.user_id,
	}));

	const formControls = [
		{
			name  : 'booking_ref_status',
			span  : 6,
			type  : 'pills',
			label : 'Booking ref status',
			rules : {
				required: {
					value   : true,
					message : 'This field is required',
				},
			},
			options: [
				{
					label : 'Placed',
					value : 'placed',
				},
				{
					label : 'Not Placed',
					value : 'not_placed',
				},
			],
		},
		{
			name  : 'booking_reference_delay_reasons',
			span  : 6,
			type  : 'text',
			label : 'Booking Reference Delay Reasons',
			rules : {
				required: {
					value   : true,
					message : 'Booking reference delay reason is required',
				},
			},
		},
		{
			name        : 'agent_id',
			type        : 'select',
			label       : 'Email for Confirm Booking will be sent To',
			span        : 6,
			options,
			placeholder : 'Select Agent',
			rules       : { required: 'Agent is required' },
			size        : 'sm',
		},
	];

	return {
		controls: formControls,
	};
};

export default getControls;
