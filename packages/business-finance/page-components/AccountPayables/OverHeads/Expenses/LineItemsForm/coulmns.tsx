import { InputController, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';

const lineItemColumns = (remove, control, register) => {
	const taxControl = [
		{ label: 'demo', value: 'demo' },
		{ label: 'demo', value: 'demo' },
		{ label: 'demo', value: 'demo' },
		{ label: 'demo', value: 'demo' },
	];

	return [
		{
			Header   : 'Item',
			id       : 'itemName',
			accessor : (row, index) => (
				<InputController
					control={control}
					name={`line_items.${index}.itemName`}
					{...register(`line_items.${index}.itemName`)}
				/>
			),
		},
		{
			Header   : 'Amount before tax',
			id       : 'amount_before_tax',
			accessor : (row, index) => (
				<div style={{ width: '110px' }}>
					<InputController
						control={control}
						name={`line_items.${index}.amount_before_tax`}
						{...register(`line_items.${index}.amount_before_tax`)}
					/>
				</div>
			),
		},
		{
			Header   : 'Tax ',
			id       : 'tax',
			accessor : (row, index) => (
				<div style={{ width: '96px' }}>
					<SelectController
						control={control}
						options={taxControl}
						name={`line_items.${index}.tax`}
						{...register(`line_items.${index}.tax`)}
					/>
				</div>
			),
		},
		{
			Header   : 'Amount after tax',
			id       : 'amount_after_tax',
			accessor : (row, index) => (
				<div style={{ width: '110px' }}>
					<InputController
						control={control}
						name={`line_items.${index}.amount_after_tax`}
						{...register(`line_items.${index}.amount_after_tax`)}
					/>
				</div>
			),
		},
		{
			Header   : 'TDS',
			id       : 'tds',
			accessor : (row, index) => (
				<div style={{ width: '96px' }}>
					TDS here...
				</div>
			),
		},
		{
			Header   : 'Payable Amount',
			id       : 'payable_amount',
			accessor : (row, index) => (
				<InputController
					control={control}
					name={`line_items.${index}.payable_amount`}
					{...register(`line_items.${index}.payable_amount`)}
				/>
			),
		},
		{
			Header   : '',
			id       : 'delete',
			accessor : (row, index) => (
				<IcMDelete
					color="#ED3726"
					onClick={() => {
						remove(index, 1);
					}}
					style={{ cursor: 'pointer' }}
					height={15}
					width={15}
				>
					x
				</IcMDelete>
			),
		},
	];
};

export default lineItemColumns;
