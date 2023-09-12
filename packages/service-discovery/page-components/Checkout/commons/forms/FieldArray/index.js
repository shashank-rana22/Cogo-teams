import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
		value,
		...rest
	} = props;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		EMPTY_VALUES[controlItem.name] = value[GLOBAL_CONSTANTS.zeroth_index][controlItem.name] || '';
	});
<<<<<<< HEAD:packages/service-discovery/page-components/Checkout/commons/forms/FieldArray/index.js

	if (isEmpty(fields)) {
		append(EMPTY_VALUES);
	}

=======
	console.log('fields', newField);
>>>>>>> 275c6c8316 (added list and adding):packages/terms-and-conditions/page-components/FieldArray/index.js
	return (
		<div>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					append={append}
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
					onClick={() => append(EMPTY_VALUES)}
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
