import { Button } from '@cogoport/components';

const fields = (items, setAddRate) => [
	{
		label  : 'Validity Start',
		key    : 'validity_start',
		span   : 2.2,
		render : (item) => <div style={{ width: '500px' }}>{item.validity_start}</div>,
	},
	{
		label  : 'Validity End',
		key    : 'validity_end',
		span   : 2.2,
		render : (item) => <div>{item.validity_end}</div>,
	},
	{
		label  : 'Currency',
		key    : 'currency',
		span   : 2.2,
		render : (item) => <div>{item.currency}</div>,
	},
	{
		label  : 'Price',
		key    : 'price',
		span   : 2.2,
		render : (item) => <div>{item.buy_price}</div>,
	},
	{
		label  : '',
		key    : 'action',
		span   : 2.2,
		render : (item) => (
			<Button
				className="secondary sm"
				onClick={() => setAddRate({ ...item, ...items })}
			>
				Choose This Rate
			</Button>
		),
	},
];
export default fields;
