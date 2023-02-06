import { Button } from '@cogoport/components';
import { InputController, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';

const lineItemColumns = (remove, control, register) => {
	const taxControl = [
		{ label: 'demo', value: 'demo' },
	];
	const tdsControl = [
		{ label: 'demo2', value: 'demo2' },
	];
	return [
	// {
	// 	Header   : 'Sr No.',
	// 	id       : 'sr_no',
	// 	accessor : (row, index) => index,
	// },
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
					control={control}
					options={taxControl}
					name={`line_items.${index}.tax`}
					{...register(`line_items.${index}.tax`)}
				/>
			),
		},
		{
			Header   : 'Amount after tax',
			id       : 'amount_after_tax',
			accessor : (row, index) => (
				<InputController
					control={control}
					name={`line_items.${index}.amount_after_tax`}
					{...register(`line_items.${index}.amount_after_tax`)}
				/>
			),
		},
		{
			Header   : 'TDS',
			id       : 'tds',
			accessor : (row, index) => (
				<SelectController
					control={control}
					options={tdsControl}
					name={`line_items.${index}.tds`}
					{...register(`line_items.${index}.tds`)}
				/>
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
