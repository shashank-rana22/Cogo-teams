import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import Child from './Child';

function FieldArray({
	name,
	control,
	controls,
	error,
	showElements,
	buttonText,
	showButtons = true,
	disabled = false,
	watch,
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = '';
	});

	return (
		<div>
			{fields.map((field, index) => (
				<Child
					key={field.id}
					field={field}
					index={index}
					control={control}
					name={name}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
					watch={watch}
				/>
			))}

			{showButtons && !disabled ? (
				<Button
					themeType="primary"
					onClick={() => append(CHILD_EMPTY_VALUES)}
					size="sm"
					style={{ margin: '10px 0' }}
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
