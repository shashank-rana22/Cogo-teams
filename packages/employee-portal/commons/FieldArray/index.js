import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import Child from './Child';

function FieldArray(props) {
	const {
		name,
		control,
		controls,
		error,
		showElements,
		buttonText,
		showButtons = true,
		disabled = false,
		...rest
	} = props;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const CHILD_EMPTYVALUES = {};

	controls.forEach((controlItem) => {
		CHILD_EMPTYVALUES[controlItem.name] = '';
	});

	if (isEmpty(fields)) {
		fields.push(CHILD_EMPTYVALUES);
	}

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
					showElements={showElements?.[index]}
					disabled={disabled}
				/>
			))}

			{showButtons && !disabled ? (
				<Button
					themeType="secondary"
					onClick={() => append(CHILD_EMPTYVALUES)}
					style={{ margin: '16px 0px' }}
				>
					+ Add
				</Button>
			) : null}
		</div>
	);
}

export default FieldArray;
