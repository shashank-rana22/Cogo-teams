const controls = (new_sell_price, isDisabled) => [
	{
		name      : 'chargeable_weight',
		type      : 'number',
		label     : 'Chargeable Weight',
		span      : 6,
		className : 'primary md',
		rules     : { required: true },
		disabled  : true,
	},
	{
		name      : 'currency',
		type      : 'text',
		label     : 'Currency',
		span      : 6,
		className : 'primary md',
		rules     : { required: true },
		disabled  : true,
	},
	{
		name      : 'sell_price',
		type      : 'number',
		label     : 'Sell Price',
		span      : 6,
		className : 'primary md',
		disabled  : isDisabled,
		rules     : {
			required : true,
			validate : (value) => (Number(value) < new_sell_price
				? `Cannot be less than ${new_sell_price}`
				: true),
		},
	},
];

export default controls;
