const splitAthAmountControls = () => {
	const controls = [
		{
			name        : 'split_advanced_amount',
			type        : 'fieldArray',
			showButtons : true,
			showHeading : false,
			buttonText  : '',
			value       : [
				{
					split_type     : '',
					amount         : 0,
					trade_party_id : '',
				},
			],
			controls: [
				{
					label   : 'Split Type',
					name    : 'split_type',
					type    : 'select',
					options : [
						{ label: 'Self', value: 'self' },
						{ label: 'Agent', value: 'agent' },
						{ label: 'Fleet Owner', value: 'fleet_owner' },
						{ label: 'Driver', value: 'driver' },
						{ label: 'Fuel', value: 'fuel' },
						{ label: 'Toll', value: 'toll' },
					],
					rules : { required: 'Required' },
					span  : 3.5,
				},
				{
					label : 'Amount',
					name  : 'amount',
					type  : 'number',
					rules : { required: 'Required' },
					span  : 3.5,
				},
				{
					label          : 'Collection Party',
					name           : 'trade_party_id',
					type           : 'select',
					optionsListKey : 'trade_parties',
					span           : 3.5,
					rules          : { required: 'Required' },
				},
			],
		},
	];
	return controls;
};

export default splitAthAmountControls;
