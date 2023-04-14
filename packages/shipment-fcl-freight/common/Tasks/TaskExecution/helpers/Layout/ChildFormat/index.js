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
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				{showButtons && !disabled ? (
					<Button
						style={{ margin: '4px' }}
						size="sm"
						themeType="link"
						onClick={() => append()}
					>
						+&nbsp;
						{buttonText}
					</Button>
				) : null}
			</div>

		</div>
	);
}

export default FieldArray;
