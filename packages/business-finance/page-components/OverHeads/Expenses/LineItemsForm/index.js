import { useFieldArray, useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import StyledTable from '../../../commons/StyledTable';
import useGetListItemTaxes from '../hooks/useGetListItemTaxes';

import lineItemColumns from './columns';
import styles from './styles.module.css';
import TotalAfterTax from './TotalAfterTax';
import TotalColumn from './TotalColumn';

const PERCENTAGE = 100;

const DEFAULT_LEN = 0;

function LineItemsForm({ formData, setFormData, taxOptions, setTaxOptions, isTaxApplicable = true }) {
	const { invoiceCurrency = '', lineItemsList:lineItemsListData = [] } = formData || {};
	const { lineItemsList, loading } = useGetListItemTaxes({ formData });
	const rest = { loading };
	const { control, watch, setValue } = useForm({
		defaultValues: {
			line_items: !isEmpty(lineItemsListData)
				? lineItemsListData
				: [{ new: true, price: 0, quantity: 0 }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'line_items',
	});

	useEffect(() => {
		const TAX_LIST = [];
		if (!isEmpty(lineItemsList)) {
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
	const controlledFields = fields.map((field, index) => ({
		...field,
		...watchFieldArray[index],
	}));

	const stringifiedControlledFields = JSON.stringify(controlledFields);

	useEffect(() => {
		if (!isEmpty(watchFieldArray)) {
			setFormData((prev) => ({
				...prev,
				lineItemsList: watchFieldArray,
			}));
		}
		const fieldsLength = controlledFields.length || DEFAULT_LEN;
		const mappingArray = Array(fieldsLength)?.fill('value');

		mappingArray?.forEach((item, index) => {
			const beforeTax = +watch(`line_items.${index}.amount_before_tax`);
			const tax = watch(`line_items.${index}.tax`);

			if (tax) {
				const taxPercent = JSON.parse(tax || '')?.taxPercent || 0;
				if (beforeTax && +taxPercent >= 0) {
					const amountAfterTax =						beforeTax + beforeTax * (taxPercent / PERCENTAGE);
					setValue(
						`line_items.${index}.amount_after_tax`,
						+amountAfterTax,
					);
					const tds = +watch(`line_items.${index}.tds`);
					if (
						geo.navigations.over_heads
							.expense_non_recurring_upload_invoice_tds
					) {
						setValue(
							`line_items.${index}.payable_amount`,
							+amountAfterTax,
						);
					} else if (
						!geo.navigations.over_heads
							.expense_non_recurring_upload_invoice_tds
						&& tds >= GLOBAL_CONSTANTS.zeroth_index
					) {
						setValue(
							`line_items.${index}.payable_amount`,
							+amountAfterTax - (beforeTax * tds) / PERCENTAGE,
						);
						setValue(
							`line_items.${index}.tdsAmount`,
							(beforeTax * tds) / PERCENTAGE,
						);
					}
				}
			}
		});
	}, [
		setFormData,
		setValue,
		watchFieldArray,
		watch,
		controlledFields?.length,
		stringifiedControlledFields,
		geo,
	]);

	const getSum = (columnName) => {
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
			setFormData((prev) => ({ ...prev, payableAmount }));
		}
	}, [payableAmount, setFormData]);

	const hideTdsColumn =		geo.navigations.over_heads.expense_non_recurring_upload_invoice_tds;

	const modifiedColumns = lineItemColumns({
		remove,
		control,
		taxOptions,
		formData,
		isTaxApplicable,
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