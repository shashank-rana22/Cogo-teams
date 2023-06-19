import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React, { useEffect } from 'react';

import CONSTANTS from '../../../constants/CONSTANTS';

import Child from './child';
import styles from './styles.module.css';

const { EMPTY_LIST_LENGTH } = CONSTANTS;

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

	const CHILD_EMPTY_VALUES = { };

	useEffect(() => {
		if (fields.length === EMPTY_LIST_LENGTH) {
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
