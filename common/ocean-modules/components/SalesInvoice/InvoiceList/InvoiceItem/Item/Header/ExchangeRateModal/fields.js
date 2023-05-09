const fields = [
	{
		label: 'Currency Code',
		render: (item) => <div>{item?.currency}</div>,
	},
	{
		label: 'Exchange Rate',
		render: (item) => <div>{item?.exchange_rate}</div>,
	},
];

export default fields;
