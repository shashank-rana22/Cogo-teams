import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import Child from './Child';

function AppendElement({ isText = false, buttonText = '', CHILD_EMPTY_VALUES = {}, append = () => {} }) {
	if (isText) {
		return (
			<div
				role="presentation"
				onClick={() => append(CHILD_EMPTY_VALUES)}
				style={{ cursor: 'pointer', marginTop: '14px' }}
			>
				+
				{' '}
				<span style={{ textDecoration: 'underline' }}>{buttonText}</span>
			</div>
		);
	}

	return (
		<Button
			themeType="secondary"
			onClick={() => append(CHILD_EMPTY_VALUES)}
			style={{ margin: '16px 0px' }}
		>
			+
			{' '}
			{buttonText}

		</Button>
	);
}

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
		isText = false,
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

				<AppendElement
					isText={isText}
					buttonText={buttonText}
					CHILD_EMPTY_VALUES={CHILD_EMPTY_VALUES}
					append={append}
				/>
			) : null}
		</div>
	);
}

export default FieldArray;
