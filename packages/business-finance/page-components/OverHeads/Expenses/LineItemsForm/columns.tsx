import { InputController, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';

const lineItemColumns = ({
	remove, control, taxOptions,
}) => [
	{
		Header   : 'Item',
		id       : 'itemName',
		accessor : (row:any, index:number) => (
			<InputController
				control={control}
				name={`line_items.${index}.itemName`}
			/>
		),
	},
	{
		Header   : 'Amount before tax',
		id       : 'amount_before_tax',
		accessor : (row:any, index:number) => (
			<div style={{ width: '110px' }}>
				<InputController
					control={control}
					name={`line_items.${index}.amount_before_tax`}
				/>
			</div>
		),
	},
	{
		Header   : 'Tax ',
		id       : 'tax',
		accessor : (row:any, index:number) => (
			<div style={{ width: '122px' }}>
				<SelectController
					control={control}
					options={taxOptions}
					name={`line_items.${index}.tax`}
					size="md"
				/>
			</div>
		),
	},
	{
		Header   : 'Amount after tax',
		id       : 'amount_after_tax',
		accessor : (row:any, index:number) => (
			<div style={{ width: '110px' }}>
				<InputController
					control={control}
					name={`line_items.${index}.amount_after_tax`}
				/>
			</div>
		)
		,
	},
	{
		Header   : 'TDS',
		id       : 'tds',
		accessor : (row:any, index:number) => (
			<div style={{ width: '110px' }}>
				<InputController
					control={control}
					name={`line_items.${index}.tds`}
				/>
			</div>
		),
	},
	{
		Header   : 'Payable Amount',
		id       : 'payable_amount',
		accessor : (row:any, index:number) => (
			<InputController
				control={control}
				name={`line_items.${index}.payable_amount`}
			/>
		),
	},
	{
		Header   : '',
		id       : 'delete',
		accessor : (row:any, index:number) => (
			<div>
				{index !== 0 && (
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
				)}
			</div>
		),
	},
];

export default lineItemColumns;
