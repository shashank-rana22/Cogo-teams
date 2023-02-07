import { Button } from '@cogoport/components';
import { InputController, SelectController } from '@cogoport/forms';

const lineItemColumns = (remove, control, register) => [
	{
		Header   : 'Sr No.',
		id       : 'sr_no',
		accessor : (row, index) => index,
	},
	{
		Header   : 'Item',
		id       : 'name',
		accessor : (row, index) => (
			<InputController
				control={control}
				name={`line_items.${index}.name`}
				{...register(`line_items.${index}.name`)}
			/>
		),
	},
	{
		Header   : 'Amount before tax',
		id       : 'amount_before_tax',
		accessor : (row, index) => (
			<InputController
				control={control}
				name={`line_items.${index}.amount_before_tax`}
				{...register(`line_items.${index}.amount_before_tax`)}
			/>
		),
	},
	{
		Header   : 'Tax ',
		id       : 'tax',
		accessor : (row, index) => (
			<SelectController
				options={[{ label: 'demo', value: 'demo' }]}
				control={control}
				name={`line_items.${index}.amount_before_tax`}
				{...register(`line_items.${index}.amount_before_tax`)}
			/>
		),
	},
	{
		Header   : 'Amount after tax',
		id       : 'amount_after_tax',
		accessor : (row, index) => (
			<InputController
				control={control}
				name={`line_items.${index}.amount_before_tax`}
				{...register(`line_items.${index}.amount_before_tax`)}
			/>
		),
	},
	{
		Header   : 'TDS',
		id       : 'tds',
		accessor : (row, index) => (
			<SelectController
				control={control}
				name={`line_items.${index}.amount_before_tax`}
				{...register(`line_items.${index}.amount_before_tax`)}
			/>
		),
	},
	{
		Header   : 'Payable Amount',
		id       : 'payable_amount',
		accessor : (row, index) => (
			<InputController
				control={control}
				name={`line_items.${index}.amount_before_tax`}
				{...register(`line_items.${index}.amount_before_tax`)}
			/>
		),
	},
	{
		Header   : '',
		id       : 'delete',
		accessor : (row, index) => (
			<Button onClick={() => {
				remove(index, 1);
			}}
			>
				x
			</Button>
		),
	},
];

export default lineItemColumns;
