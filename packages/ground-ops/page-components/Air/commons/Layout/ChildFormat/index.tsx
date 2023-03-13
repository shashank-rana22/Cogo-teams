import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name,
	control,
	controls,
	showElements,
	buttonText = 'Add',
	showButtons = true,
	disabled = false,
	value,
	error,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = { };

	useEffect(() => {
		if (fields.length === 0) {
			append(childEmptyValues);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.child}>
			{(fields || []).map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					disabled={disabled}
					error={error?.[index]}
				/>
			))}
			<div>
				{showButtons && !disabled ? (
					<Button
						style={{ margin: '4px' }}
						size="sm"
						themeType="secondary"
						onClick={() => append(childEmptyValues)}
					>
						+
						{' '}
						{buttonText}
					</Button>
				) : null}
			</div>

		</div>
	);
}

export default FieldArray;
