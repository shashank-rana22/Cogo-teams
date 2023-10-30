import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true,
	formValues = {}, customFieldArrayControls = {},
}) {
	const { controls = [], name, addButtonText = '' } = ctrl || {};

	const { fields, append, remove } = useFieldArray({ control, name });

	return (
		<div className={styles.field_array}>
			{fields.map((field, index) => (
				<Child
					customField={customFieldArrayControls}
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
						// themeType="tertiary"
						onClick={append}
					>
						{addButtonText || 'Add'}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default FieldArray;
