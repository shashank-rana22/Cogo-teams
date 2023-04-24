import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React from 'react';

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
	...rest
}) {
	const { fields, append, remove } = useFieldArray({ control, name });

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
			<div className={styles.add_button_container}>
				{showButtons && !disabled ? (
					<Button
						size="sm"
						themeType="tertiary"
						onClick={() => append()}
					>
						<div className={styles.add_button_text}>
							+&nbsp;
							{buttonText || 'Add'}
						</div>
					</Button>
				) : null}
			</div>

		</div>
	);
}

export default FieldArray;
