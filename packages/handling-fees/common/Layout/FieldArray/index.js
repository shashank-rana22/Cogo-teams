import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import Child from './Child';
import styles from './styles.module.css';

function FieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {},
	handleFieldArrayAddCheck = () => true, customFieldArrayControls = {},
}) {
	const { controls = [], name, showHeading = true } = ctrl || {};

	const { fields, append, remove } = useFieldArray({ control, name });

	const currentFieldArrayCustomField = customFieldArrayControls?.[name] || {};

	const handleAppend = () => {
		if (handleFieldArrayAddCheck({ currentIndex: fields.length, formValues, name })) {
			append();
		}
	};

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = '';
	});

	if (isEmpty(fields)) {
		append(CHILD_EMPTY_VALUES);
	}

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
					showHeading={showHeading}
					customField={currentFieldArrayCustomField?.[index] || {}}
				/>
			))}

			{showButtons ? (
				<div>
					<Button
						size="md"
						themeType="secondary"
						onClick={handleAppend}
						style={{ marginLeft: '4px' }}
					>
						<IcMPlusInCircle
							width={14}
							height={14}
							style={{ marginRight: '4px' }}
						/>
						ADD
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default FieldArray;
