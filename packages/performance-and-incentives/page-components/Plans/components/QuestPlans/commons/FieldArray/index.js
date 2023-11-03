import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

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

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = '';
	});

	return (
		<div>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field?.id}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					error={error?.[name]?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
				/>
			))}

			{showButtons && !disabled ? (
				<Button
					themeType="secondary"
					onClick={() => append(CHILD_EMPTY_VALUES)}
					style={{ margin: '16px 0px' }}
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
