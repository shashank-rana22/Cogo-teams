import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray(props) {
	const {
		name = '',
		control,
		controls = [],
		error,
		buttonText = '',
		showButtons = true,
		disabled = false,
		...rest
	} = props;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	useEffect(() => {
		if (isEmpty(fields)) {
			append({});
		}
	}, [append, fields]);

	return (
		<div>
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
					error={error?.[index]}
					disabled={disabled}
				/>
			))}

			{showButtons && !disabled ? (
				<Button
					themeType="secondary"
					onClick={() => append({})}
					classname={styles.add_button}
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
