const getColumns = () => [
	{
		Header   : 'NAME',
		accessor : (item) => <div>{item?.name || '-'}</div>,
	},
	{
		Header   : 'RATING',
		accessor : (item) => <div>{item?.name || '-'}</div>,
	},
	{
		Header   : 'FEEDBACK',
		accessor : (item) => <div>{item?.name || '-'}</div>,
	},
];

export default getColumns;
