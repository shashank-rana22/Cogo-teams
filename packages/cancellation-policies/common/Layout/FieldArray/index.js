import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {},
	handleFieldArrayAddCheck = () => true,
}) {
	const { controls = [], name, buttonText = '' } = ctrl || {};

	const { fields, append, remove } = useFieldArray({ control, name });

	const handleAppend = () => {
		if (handleFieldArrayAddCheck({ currentIndex: fields.length })) {
			append();
		}
	};

	return (
		<div className={styles.field_array}>
			{fields.map((field, index) => (
				<Child
					{...ctrl}
					key={field.id}
					remove={remove}
					field={field}
					error={error?.[index]}
					controls={controls}
					control={control}
					index={index}
					name={name}
					formValues={formValues}
				/>
			))}

			{showButtons ? (
				<div>
					<Button
						size="sm"
						onClick={handleAppend}
					>
						+
						{' '}
						{buttonText || 'Add'}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default FieldArray;
