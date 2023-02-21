const getControls = (value) => [
	{
		name          : 'departure_dates',
		label         : 'Select dates',
		selectedItems : value,
		type          : 'select',
		validations   : [
			{
				type    : 'required',
				message : 'Departure Dates is required',
			},
		],
	},
];

export default getControls;
