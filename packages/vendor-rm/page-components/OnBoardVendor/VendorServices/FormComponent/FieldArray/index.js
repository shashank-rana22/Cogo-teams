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
	buttonText,
	showButtons = true,
	disabled = false,
	showLabelOnce = false,
	noDeleteButtonTill,
	watch = () => {},
	setValue = () => {},
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

	if (isEmpty(fields)) {
		fields.push(childEmptyValues);
	}

	// const alreadySelectedCategories = (watch().services || []).map((item) => getByKey(item, 'category'));
	// const newControls = controls.map((item) => {
	// 	if (item.name !== 'category') {
	// 		return item;
	// 	}

	// 	const options = categoryOptions.filter((category) => !alreadySelectedCategories.includes(category.value));
	// 	const obj = {
	// 		...item,
	// 		options,
	// 	};

	// 	return obj;
	// });

	// console.log('alreadySelectedCategories:: ', alreadySelectedCategories);
	// console.log('newControls:: ', newControls);

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					field={field}
					index={index}
					control={control}
					// controls={newControls}
					controls={controls}
					name={name}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
					showLabelOnce={showLabelOnce}
					noDeleteButtonTill={noDeleteButtonTill}
					services={watch().services}
					setValue={setValue}
					watch={watch}
				/>
			))}

			{showButtons && !disabled ? (
				<Button
					size="lg"
					role="presentation"
					themeType="accent"
					onClick={() => append(childEmptyValues)}
				>
					+
					{' '}
					{buttonText}
				</Button>
			) : null}
		</div>
	);
}

export default FieldArray;
