import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name,
	control,
	controls,
	error,
	showElements,
	buttonText = 'add more',
	showButtons = true,
	showLabelOnce = false,
	disabled = false,
	actionOnAdd = {},
	showZerothIndexControl = true,
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

	const handleAppendChild = () => {
		if (actionOnAdd && typeof actionOnAdd === 'function') {
			actionOnAdd({
				onSuccess: () => {
					append(childEmptyValues);
				},
			});
			return;
		}
		append(childEmptyValues);
	};

	if (isEmpty(fields) && showZerothIndexControl) {
		fields.push(childEmptyValues);
	}

	return (
		<div key={name} className={styles.container}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={`${field.id}_${name}`}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
					showLabelOnce={showLabelOnce}
				/>
			))}

			{showButtons && !disabled ? (
				<div className={styles.button_container}>
					<Button themeType="secondary" onClick={() => handleAppendChild()}>
						+
						{' '}
						{buttonText}
					</Button>
				</div>
			) : null}

		</div>
	);
}

export default FieldArray;
