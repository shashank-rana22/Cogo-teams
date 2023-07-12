import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React, { useMemo } from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name,
	control,
	showElements,
	controls,
	buttonText,
	showButtons = true,
	disabled = false,
	value,
	error,
	formValues,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({ control, name });

	const controlledItems = useMemo(() => {
		let item = {};
		controls.forEach((defaultControl) => {
			item = {
				...item,
				[defaultControl.name]: defaultControl.name !== 'url' ? '' : undefined,
			};
		});
		return item;
	}, [controls]);

	return (
		<div className={styles.child}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					showElements={showElements?.[index]}
					disabled={disabled}
					error={error?.[index]}
					formValues={formValues}
					id={field.id}
					length={fields.length}
				/>
			))}

			{showButtons && !disabled ? (
				<div className={styles.add_button_container}>
					<Button
						size="sm"
						themeType="accent"
						onClick={() => append(controlledItems)}
					>
						<div className={styles.add_button_text}>
							+&nbsp;
							{buttonText || 'Add Items'}
						</div>
					</Button>

				</div>
			) : null}

		</div>
	);
}

export default FieldArray;
