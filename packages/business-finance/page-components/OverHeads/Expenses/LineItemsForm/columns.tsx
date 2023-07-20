import { InputController, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

const TDS_OPTIONS = [
	{ label: '0 %', value: '0' },
	{ label: '1 %', value: '1' },
	{ label: '2 %', value: '2' },
	{ label: '5 %', value: '5' },
	{ label: '10 %', value: '10' },
	{ label: '20 %', value: '20' },
];

const TAX_NOT_APPLICABLE = [
	{ label: '0 %', value: '0' },
];

const lineItemColumns = ({
	remove,
	control,
	taxOptions,
	formData,
	isTaxApplicable,
}) => {
	const { lineItemsList = [] } = formData || {};

	return [
		{
			Header   : 'Item',
			id       : 'itemName',
			accessor : (row: any, index: number) => (
				<div style={{ width: '80px' }}>
					<InputController
						key={row?.id}
						size="xs"
						theme="admin"
						control={control}
						value={lineItemsList[index]?.itemName}
						name={`line_items.${index}.itemName`}
					/>
				</div>
			),
		},
		{
			Header   : 'Amount before tax',
			id       : 'amount_before_tax',
			accessor : (row: any, index: number) => (
				<div style={{ width: '80px' }}>
					<InputController
						key={row?.id}
						size="xs"
						type="number"
						theme="admin"
						control={control}
						name={`line_items.${index}.amount_before_tax`}
						value={lineItemsList[index]?.amount_before_tax}
					/>
				</div>
			),
		},
		{
			Header   : 'Tax',
			id       : 'tax',
			accessor : (row: any, index: number) => (
				<div style={{ width: '80px' }} className={styles.select}>
					<SelectController
						key={row?.id}
						control={control}
						theme="admin"
						options={!isTaxApplicable ? TAX_NOT_APPLICABLE : taxOptions}
						name={`line_items.${index}.tax`}
						size="xs"
						value={lineItemsList[index]?.tax}
					/>
				</div>
			),
		},
		{
			Header   : 'Amount after tax',
			id       : 'amount_after_tax',
			accessor : (row: any, index: number) => (
				<div style={{ width: '70px' }}>
					<InputController
						key={row?.id}
						size="xs"
						type="number"
						control={control}
						name={`line_items.${index}.amount_after_tax`}
						value={lineItemsList[index]?.amount_after_tax}
					/>
				</div>
			),
		},
		{
			Header   : 'TDS',
			id       : 'tds',
			accessor : (row: any, index: number) => (
				<div style={{ width: '75px' }} className={styles.select}>
					<SelectController
						key={row?.id}
						control={control}
						theme="admin"
						options={TDS_OPTIONS}
						name={`line_items.${index}.tds`}
						size="xs"
						value={lineItemsList[index]?.tds}
					/>
				</div>
			),
		},
		{
			Header   : 'Payable Amount',
			id       : 'payable_amount',
			accessor : (row: any, index: number) => (
				<div style={{ width: '70px' }}>
					<InputController
						key={row?.id}
						size="xs"
						type="number"
						control={control}
						name={`line_items.${index}.payable_amount`}
						value={lineItemsList[index]?.payable_amount}
					/>
				</div>
			),
		},
		{
			Header   : '',
			id       : 'delete',
			accessor : (row: any, index: number) => (
				<div>
					{index !== 0 && (
						<IcMDelete
							key={row?.id}
							color="#ED3726"
							onClick={() => {
								remove(index);
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
};

export default lineItemColumns;
