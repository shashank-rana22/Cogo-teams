import { useFieldArray, useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import React, { useEffect } from 'react';

import StyledTable from '../../../commons/StyledTable';
import useGetListItemTaxes from '../hooks/useGetListItemTaxes';

import lineItemColumns from './columns';
import styles from './styles.module.css';
import TotalAfterTax from './TotalAfterTax';
import TotalColumn from './TotalColumn';

function LineItemsForm({ formData, setFormData, taxOptions, setTaxOptions }) {
	const { invoiceCurrency = '', lineItemsList:lineItemsListData = [] } = formData || {};
	const { lineItemsList, loading } = useGetListItemTaxes({ formData });
	const rest = { loading };
	const { control, watch, setValue } = useForm(
		{
			defaultValues: {
				line_items: lineItemsListData.length > 0 ? lineItemsListData : [
					{ new: true, price: 0, quantity: 0 },
				],
			},
		},
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'line_items',
	});

	useEffect(() => {
		const TAX_LIST = [];
		if (lineItemsList?.length > 0) {
			lineItemsList.forEach((item) => {
				TAX_LIST.push({
					label : `${item?.taxPercent}%-${item?.itemName}`,
					value : JSON.stringify(item),
				});
			});
			setTaxOptions([...TAX_LIST]);
		}
	}, [lineItemsList, setTaxOptions]);

	const watchFieldArray = watch('line_items');
	const geo = getGeoConstants();
	const controlledFields = fields.map((field:any, index:number) => ({
		...field,
		...watchFieldArray[index],
	}));

	const stringifiedControlledFields = JSON.stringify(controlledFields);

	useEffect(() => {
		if (watchFieldArray?.length > 0) {
			setFormData((prev:object) => ({ ...prev, lineItemsList: watchFieldArray }));
		}
		const fieldsLength = (controlledFields).length || 0;
		const mappingArray = Array(fieldsLength)?.fill('value');

		mappingArray?.forEach((item, index) => {
			const beforeTax = +watch(`line_items.${index}.amount_before_tax`);
			const tax = watch(`line_items.${index}.tax`);

			if (tax) {
				const taxPercent = JSON.parse(tax || '')?.taxPercent;
				if (beforeTax && +taxPercent >= 0) {
					const amountAfterTax = beforeTax + (beforeTax * (taxPercent / 100));
					setValue(`line_items.${index}.amount_after_tax`, +amountAfterTax);
					const tds = +watch(`line_items.${index}.tds`);
					if (geo.navigations.over_heads.expense_non_recurring_upload_invoice_tds) {
						setValue(`line_items.${index}.payable_amount`, +amountAfterTax);
					} else if (!geo.navigations.over_heads.expense_non_recurring_upload_invoice_tds && tds >= 0) {
						setValue(`line_items.${index}.payable_amount`, +amountAfterTax - (beforeTax * tds) / 100);
						setValue(`line_items.${index}.tdsAmount`, (beforeTax * tds) / 100);
					}
				}
			}
		});
	}, [setFormData, setValue, watchFieldArray, watch, controlledFields?.length, stringifiedControlledFields, geo]);

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

	const getTotalTax = () => {
		const sum = watchFieldArray?.reduce((acc, curr) => {
			const columnVal = JSON.parse(curr?.tax || '{}')?.taxPercent;
			if (!Number.isNaN(+columnVal)) {
				return +acc + +columnVal;
			}
			return +acc;
		}, 0);
		return sum;
	};

	const totalAmountBeforeTax = getSum('amount_before_tax');
	const totalTax = getTotalTax();
	const totalAmountAfterTax = getSum('amount_after_tax');
	const payableAmount = getSum('payable_amount');
	const totalTds = getSum('tds');

	useEffect(() => {
		if (payableAmount) {
			setFormData((prev:object) => ({ ...prev, payableAmount }));
		}
	}, [payableAmount, setFormData]);

	const hideTdsColumn = geo.navigations.over_heads.expense_non_recurring_upload_invoice_tds;

	const modifiedColumns = lineItemColumns({
		remove,
		control,
		taxOptions,
		formData,
	}).filter((column) => column.id !== 'tds' || !hideTdsColumn);

	return (
		<div className={styles.section}>
			<form className={styles.container}>
				<StyledTable
					columns={modifiedColumns}
					data={controlledFields}
					imageFind=""
					{...rest}
				/>
				<TotalColumn
					append={append}
					totalAmountBeforeTax={totalAmountBeforeTax}
					totalTax={totalTax}
					totalAmountAfterTax={totalAmountAfterTax}
					payableAmount={payableAmount}
					totalTds={totalTds}
				/>
				<TotalAfterTax
					payableAmount={payableAmount}
					invoiceCurrency={invoiceCurrency}
				/>
			</form>
		</div>
	);
}

export default LineItemsForm;
