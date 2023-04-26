import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Child from './child';
import styles from './styles.module.css';

function ChildFormat({
	name,
	control,
	controls,
	error,
	register,
	label,
	showElements,
	buttonText = 'add more',
	showButtons = true,
	showLabelOnce = false,
	disabled = false,
	actionOnAdd = {},
	customLabels,
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
		<div className={styles.container}>
			{label ? (
				<div className={styles.label}>{label}</div>
			) : null}
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={`${field.id}_${name}`}
					field={field}
					index={index}
					register={register}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					customLabels={customLabels?.[index]}
					disabled={disabled}
					showLabelOnce={showLabelOnce}
				/>
			))}

			{showButtons && !disabled ? (
				<div
					className={styles.button_wrap}
				>
					<Button themeType="secondary" onClick={() => handleAppendChild()}>
						+
						{' '}
						{buttonText || 'add more'}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default ChildFormat;
