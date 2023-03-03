import { useFieldArray, useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import StyledTable from '../../../../commons/StyledTable';
import usePostListItemTaxes from '../hooks/usePostItemTaxes';

import lineItemColumns from './coulmns';
import styles from './styles.module.css';
import TotalAfterTax from './TotalAfterTax';
import TotalColumn from './TotalColumn';

function LineItemsForm({ formData, setFormData }) {
	const [taxOptions, setTaxOptions] = useState([]);
	const { control, watch, register } = useForm(
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
					label : `${item?.itemName} - ${item?.taxPercent}%`,
					value : item?.productCode,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchFieldArray]);

	const totalAmountBeforeTax = watchFieldArray?.reduce((acc, curr) => {
		const amount = curr?.amount_before_tax;
		if (!Number.isNaN(+amount)) {
			return +acc + +amount;
		}
		return +acc;
	}, 0);

	return (
		<div className={styles.section}>
			<form className={styles.container}>
				<div className={styles.tableContainer}>
					<StyledTable
						columns={lineItemColumns(remove, control, register, taxOptions)}
						data={controlledFields}
						style={{ margin: '0px' }}
					/>

				</div>
				<TotalColumn append={append} totalAmountBeforeTax={totalAmountBeforeTax} />
				<TotalAfterTax />
			</form>
		</div>
	);
}

export default LineItemsForm;
