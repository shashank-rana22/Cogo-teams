let options = [];

const shouldShowField = (field, formValues) => {
	const { name } = field;
	const { booking_ref_status } = formValues;

	if (name === 'booking_ref_status') {
		return !formValues.booking_ref_status;
	}

	if (booking_ref_status === 'not_placed'
		&& ['booking_reference_delay_reasons', 'booking_reference_delay_remarks'].includes(name)) {
		return true;
	}

	if (booking_ref_status === 'placed') {
		if (name === 'agent_id') {
			return true;
		}
	}
	return false;
};

const getControls = ({ taskData = {}, formValues = {} }) => {
	options = (taskData?.apis_data?.list_organization_users || []).map((user) => ({
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

	const SHOW_ELEMENTS = {};

	formControls.forEach((ctrl) => {
		SHOW_ELEMENTS[ctrl?.name] = shouldShowField(ctrl, formValues);
	});

	return {
		controls     : formControls,
		showElements : SHOW_ELEMENTS,
	};
};

export default getControls;
