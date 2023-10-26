import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray({ ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {}, ...rest }) {
	const { controls = [], name, buttonText = '', showAddIcon = true } = ctrl || {};

	const { showElements = {}, watch = () => { }, setValue = () => { }, validateInputs = () => { } } = rest || {};

	const { fields, append, remove } = useFieldArray({ control, name });

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		if (controlItem.name === 'lower_limit') {
			CHILD_EMPTY_VALUES[controlItem.name] = '0';
		} else {
			CHILD_EMPTY_VALUES[controlItem.name] = controlItem.value || '';
		}
	});

	if (isEmpty(fields)) {
		append(CHILD_EMPTY_VALUES);
	}

	const handleAppendChild = () => {
		if (validateInputs({ currSlab: formValues?.[name] })) {
			append(CHILD_EMPTY_VALUES);
		}
	};

	useEffect(() => {
		setValue(`${name}.0.lower_limit`, '0');
	}, [name, setValue]);

	return (
		<div className={styles.field_array}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					remove={remove}
					field={field}
					error={error?.[index]}
					controls={controls}
					control={control}
					index={index}
					name={name}
					formValues={formValues}
					showElements={showElements[index]}
					watch={watch}
					setValue={setValue}
				/>
			))}

			{showButtons ? (
				<div className={styles.button_container}>
					<Button
						size="sm"
						onClick={() => handleAppendChild()}
					>
						{showAddIcon ? '+' : ''}
						{buttonText || 'ADD'}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default FieldArray;
