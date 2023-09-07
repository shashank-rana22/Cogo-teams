import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray({
	name = '',
	control = {},
	showElements = {},
	controls = [],
	buttonText = '',
	showButtons = true,
	disabled = false,
	error = [],
	...rest
}) {
	const { fields, append, remove } = useFieldArray({ control, name });

	const EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		EMPTY_VALUES[controlItem.name] = controlItem.value || '';
	});

	if (isEmpty(fields)) {
		append(EMPTY_VALUES);
	}

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
				/>
			))}

			{showButtons && !disabled ? (
				<div className={styles.add_button_container}>
					<Button
						size="sm"
						themeType="accent"
						onClick={() => append()}
					>
						<div className={styles.add_button_text}>
							+
							{buttonText || 'Add Items'}
						</div>
					</Button>

				</div>
			) : null}

		</div>
	);
}

export default FieldArray;
