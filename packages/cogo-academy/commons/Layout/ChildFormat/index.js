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
	buttonText,
	showButtons = true,
	disabled = false,
	showZerothIndexControl = true,
	register,
	value,
	error,
	getArray,
	watch,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = { };

	if (isEmpty(fields) && showZerothIndexControl) {
		fields.push(childEmptyValues);
	}

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
					register={register}
					error={error?.[index]}
					getArray={getArray[index]}
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
						{' '}
						{buttonText}
					</Button>
				) : null}
			</div>

		</div>
	);
}

export default FieldArray;
