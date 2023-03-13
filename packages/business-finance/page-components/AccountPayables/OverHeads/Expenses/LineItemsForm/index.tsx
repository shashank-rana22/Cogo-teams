import { useFieldArray, useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import StyledTable from '../../../../commons/StyledTable';
import usePostListItemTaxes from '../hooks/usePostItemTaxes';

import lineItemColumns from './columns';
import styles from './styles.module.css';
import TotalAfterTax from './TotalAfterTax';
import TotalColumn from './TotalColumn';

function LineItemsForm({ formData, setFormData }) {
	const [taxOptions, setTaxOptions] = useState([]);
	const { control, watch, setValue } = useForm(
		{
			defaultValues: {
				line_items: [
					{ new: true, price: 0, quantity: 0 },
				],
			},
		},
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'line_items',
	});

	const { lineItemsList } = usePostListItemTaxes();

	const taxList = [];

	useEffect(() => {
		if (lineItemsList?.length > 0) {
			lineItemsList.forEach((item) => {
				taxList.push({
					label : `${item?.taxPercent}%-${item?.itemName}`,
					value : item?.taxPercent?.toString(),
				});
			});
			setTaxOptions([...taxList]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lineItemsList]);

	const watchFieldArray = watch('line_items');
	const controlledFields = fields.map((field, index) => ({
		...field,
		...watchFieldArray[index],
	}));

	useEffect(() => {
		if (watchFieldArray?.length > 0) {
			setFormData({ ...formData, lineItemsList: watchFieldArray });
		}

		controlledFields.forEach((item, index) => {
			const beforeTax = +watch(`line_items.${index}.amount_before_tax`);
			const tax = +watch(`line_items.${index}.tax`);

			if (beforeTax && tax >= 0) {
				const amountAfterTax = beforeTax + (beforeTax * (tax / 100));
				setValue(`line_items.${index}.amount_after_tax`, +amountAfterTax);
				const tds = +watch(`line_items.${index}.tds`);
				if (tds >= 0) { setValue(`line_items.${index}.payable_amount`, +amountAfterTax + tds); }
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(controlledFields)]);

	const getSum = (columnName:string) => {
		const sum = watchFieldArray?.reduce((acc, curr) => {
			const columnVal = curr?.[columnName];
			if (!Number.isNaN(+columnVal)) {
				return +acc + +columnVal;
			}
			return +acc;
		}, 0);
		return sum;
	};

	const totalAmountBeforeTax = getSum('amount_before_tax');
	const totalTax = getSum('tax');
	const totalAmountAfterTax = getSum('amount_after_tax');
	const totalPayable = getSum('payable_amount');

	useEffect(() => {
		if (totalPayable) { setFormData({ ...formData, totalPayable }); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalPayable]);

	return (
		<div className={styles.section}>
			<form className={styles.container}>
				<StyledTable
					columns={lineItemColumns({
						remove, control, taxOptions,
					})}
					data={controlledFields}
					style={{ margin: '0px' }}
				/>

				<TotalColumn
					append={append}
					totalAmountBeforeTax={totalAmountBeforeTax}
					totalTax={totalTax}
					totalAmountAfterTax={totalAmountAfterTax}
					totalPayable={totalPayable}
				/>
				<TotalAfterTax
					totalPayable={totalPayable}
				/>
			</form>
		</div>
	);
}

export default LineItemsForm;
