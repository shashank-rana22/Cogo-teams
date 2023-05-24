import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name,
	control,
	controls,
	showElements,
	buttonText,
	showButtons = true,
	disabled = false,
	register,
	value,
	error,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = { };

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
					showElements={showElements?.[index]}
					disabled={disabled}
					register={register}
					error={error?.[index]}
				/>
			))}
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				{showButtons && !disabled ? (
					<Button
						style={{ margin: '4px' }}
						size="sm"
						themeType="link"
						onClick={() => append(childEmptyValues)}
					>
						+
						&nbsp;
						{buttonText}
					</Button>
				) : null}
			</div>

		</div>
	);
}

export default FieldArray;
