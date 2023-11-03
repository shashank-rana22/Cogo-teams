import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import getControls from '../../CreateQuest/QuestConfig/get-quest-config-controls';

import Child from './Child';

function FieldArray(props) {
	const {
		name,
		control,
		error,
		showElements,
		buttonText,
		showButtons = true,
		disabled = false,
		config_id = null,
		watch = () => {},
		...rest
	} = props;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const CHILD_EMPTY_VALUES = {};
	const controls = getControls({ config_id, watch });
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
					config_id={config_id}
					watch={watch}
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
