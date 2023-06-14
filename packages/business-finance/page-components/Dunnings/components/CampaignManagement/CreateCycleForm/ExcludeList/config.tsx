import CheckboxItem from './CheckboxItem';

export const config = (
	{
		uncheckedRows,
		setUncheckedRows,
	},
) => [
	{
		Header   : '',
		id       : 'checkbox',
		accessor : (row?:object) => (
			<CheckboxItem
				uncheckedRows={uncheckedRows}
				setUncheckedRows={setUncheckedRows}
				row={row}
			/>
		),
		span: 1,
	},
	{
		Header   : 'Customer Name',
		id       : 'name1',
		accessor : 'name',
		span     : 3,
	},
	{
		Header   : 'Total Outstanding',
		id       : 'name2',
		accessor : 'name',
		span     : 3,
	},
	{
		Header   : 'On Account',
		id       : 'name3',
		accessor : 'name',
		span     : 3,
	},
];

export default config;
