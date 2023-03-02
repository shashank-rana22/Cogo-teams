import { useFieldArray, useForm } from '@cogoport/forms';
import React from 'react';

import StyledTable from '../../../../commons/StyledTable';
import usePostListItemTaxes from '../hooks/usePostItemTaxes';

import lineItemColumns from './coulmns';
import styles from './styles.module.css';
import TotalAfterTax from './TotalAfterTax';
import TotalColumn from './TotalColumn';

function LineItemsForm() {
	const { control, handleSubmit, watch, register, setValue, getValues } = useForm(
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

	const { lineItemsData, loading } = usePostListItemTaxes();

	const watchFieldArray = watch('line_items');
	const controlledFields = fields.map((field, index) => ({
		...field,
		...watchFieldArray[index],
	}));

	const totalAmountBeforeTax = watchFieldArray?.reduce((acc, curr) => {
		const amount = curr?.amount_before_tax;
		return +acc + +amount;
	}, 0);

	return (
		<form className={styles.container}>
			<StyledTable
				columns={lineItemColumns(remove, control, register)}
				data={controlledFields}
				style={{ margin: '0px' }}
			/>
			<TotalColumn append={append} totalAmountBeforeTax={totalAmountBeforeTax} />
			<TotalAfterTax />
		</form>
	);
}

export default LineItemsForm;
