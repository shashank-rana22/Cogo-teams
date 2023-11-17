import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray({ ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {}, ...rest }) {
	const { controls = [], name, buttonText = '', showAddIcon = true } = ctrl || {};

	const { showElements = {} } = rest || {};

	const { fields, append, remove } = useFieldArray({ control, name });

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = controlItem.value || '';
	});

	const handleAppendChild = () => {
		append(CHILD_EMPTY_VALUES);
	};

	return (
		<div className={styles.field_array}>
			{fields.map((field, index) => (
				<Child
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
				/>
			))}

			{showButtons ? (
				<div>
					<Button
						size="sm"
						onClick={handleAppendChild}
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
