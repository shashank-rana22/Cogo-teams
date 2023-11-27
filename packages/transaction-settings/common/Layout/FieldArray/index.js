import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {}, disableAddButton = false,
	showFieldHeading = true, disableButton = false, customFieldArrayControls = {},
}) {
	const { controls = [], name } = ctrl || {};

	const { fields, append, remove } = useFieldArray({ control, name });
	const currentFieldArrayCustomField = customFieldArrayControls?.[name] || {};

	return (
		<div className={styles.field_array}>
			{fields.map((field, index) => (
				<Child
					// {...ctrl}
					key={field.id}
					remove={remove}
					field={field}
					error={error?.[index]}
					controls={controls}
					control={control}
					noDeleteButtonTill={ctrl.noDeleteButtonTill}
					index={index}
					name={name}
					formValues={formValues}
					customField={currentFieldArrayCustomField?.[index] || {}}
					showFieldHeading={showFieldHeading}
				/>
			))}

			{showButtons ? (
				<div>
					<Button
						size="sm"
						// themeType="tertiary"
						onClick={append}
						disabled={disableButton || disableAddButton || false}
					>
						Add
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default FieldArray;
