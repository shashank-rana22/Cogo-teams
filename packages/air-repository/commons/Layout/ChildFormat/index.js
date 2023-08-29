import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name = '',
	control = {},
	controls = [],
	buttonText = 'Add',
	showButtons = true,
	disabled = false,
	error = {},
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const CHILD_EMPTY_VALUES = { };

	useEffect(() => {
		if (isEmpty(fields)) {
			append(CHILD_EMPTY_VALUES);
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
						onClick={() => append(CHILD_EMPTY_VALUES)}
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
