import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name,
	control,
	controls,
	error,
	showElements,
	buttonText,
	showButtons = true,
	disabled = false,
	newField,

	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	console.log('fields', fields, control, name);
	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					append={append}
					field={field}
					childIndex={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
				/>
			))}

			{showButtons && !disabled ? (
				<Button themeType="secondary" onClick={() => append(childEmptyValues)}>
					+
					{' '}
					{buttonText}
				</Button>
			) : null}
		</div>
	);
}

export default FieldArray;
