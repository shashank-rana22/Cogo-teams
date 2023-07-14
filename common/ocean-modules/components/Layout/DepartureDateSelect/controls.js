const getControls = (value) => [
	{
		name          : 'departure_dates',
		label         : 'Select dates',
		selectedItems : value,
		type          : 'select',
		rules         : [
			{
				type    : 'required',
				message : 'Departure Dates is required',
			},
		],
	},
];

export default getControls;
