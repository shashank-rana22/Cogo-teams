import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import Child from './child';
import styles from './styles.module.css';

function ChildFormat(
	{
		name,
		control,
		register,
		controls,
		error,
		showElements,
		buttonText,
		label,
		showButtons = true,
		showLabelOnce = false,
		disabled = false,
		customLabels = [],
		actionOnAdd,
		...rest
	},
	ref,
) {
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

	useImperativeHandle(ref, () => ({ handleAppendChild, remove }));

	return (
		<div className={styles.container}>
			{label ? (
				<div className={styles.label}>{label}</div>
			) : null}

			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
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

export default forwardRef(ChildFormat);
