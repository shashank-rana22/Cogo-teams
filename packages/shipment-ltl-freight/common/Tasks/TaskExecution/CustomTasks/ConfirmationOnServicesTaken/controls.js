const getControls = () => {
	const controls = [
		{
			name  : 'pickup_address',
			span  : 6,
			type  : 'text',
			label : 'Origin Exact Location',
			rules : {
				required: {
					value   : true,
					message : 'Origin Location is Required',
				},
			},
		},
		{
			name  : 'delivery_address',
			span  : 6,
			type  : 'text',
			label : 'Destination Exact Location',
			rules : {
				required: {
					value   : true,
					message : 'Destination Location is Required',
				},
			},
		},
		{
			name  : 'pickup_date',
			type  : 'datepicker',
			label : 'Pickup Date',
			rules : {
				required: {
					value   : true,
					message : 'Pickup date is Required',
				},
			},
			placeholder: 'Select',
		},
		{
			name  : 'weight',
			span  : 3,
			type  : 'number',
			label : 'Weight (Ton)',
			rules : {
				required: {
					value   : true,
					message : 'Weight is Required',
				},
			},
		},
		{
			name  : 'volume',
			span  : 3,
			type  : 'number',
			label : 'Volume (cubic meter)',
			rules : {
				required: {
					value   : true,
					message : 'Volume is Required',
				},
			},
		},
		{
			name  : 'commodity_description',
			span  : 6,
			type  : 'text',
			label : 'Commodity Description',
			rules : {
				required: {
					value   : true,
					message : 'Commodity Description is Required',
				},
			},
		},
		{
			name  : 'payment_term',
			span  : 3,
			type  : 'select',
			label : 'Payment Type',
			rules : {
				required: {
					value   : true,
					message : 'Payment Type is Required',
				},
			},
			options: [
				{
					label : 'Collect',
					value : 'collect',
				},
				{
					label : 'Prepaid',
					value : 'prepaid',
				},
			],
		},
		{
			name  : 'payment_subterm',
			span  : 3,
			type  : 'select',
			label : 'Payment Sub Type',
			rules : {
				required: {
					value   : true,
					message : 'Payment sub Type is Required',
				},
			},
			options: [
				{ label: 'Paid', value: 'paid' },
				{ label: 'TBB', value: 'tbb' },
				{ label: 'To Pay', value: 'to_pay' },
			],
		},
	];
	return controls;
};
export default getControls;
