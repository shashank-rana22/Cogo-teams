import { useFieldArray, useForm } from '@cogoport/forms';
import React from 'react';

import StyledTable from '../../../../commons/StyledTable';

import lineItemColumns from './coulmns';
import styles from './styles.module.css';
import TotalAfterTax from './TotalAfterTax';
import TotalColumn from './TotalColumn';

function LineItemsForm() {
	const { control, handleSubmit, watch, register, setValue } = useForm();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'line_items',
	});

	const watchFieldArray = watch('line_items');
	const controlledFields = fields.map((field, index) => ({
		...field,
		...watchFieldArray[index],
	}));

	return (
		<form className={styles.container}>
			<StyledTable
				columns={lineItemColumns(remove, control, register)}
				data={controlledFields}
				style={{ margin: '0px' }}
			/>
			<TotalColumn append={append} />
			<TotalAfterTax />
		</form>
	);
}

export default LineItemsForm;
