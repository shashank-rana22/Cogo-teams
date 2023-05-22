import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import Child from './Child';

function FieldArray(props) {
	const {
		name, control, controls,
	} = props;

	const { fields, append, remove } = useFieldArray({ control, name });

	const childEmptyValues = {};

	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	if (isEmpty(fields)) {
		fields.push(childEmptyValues);
	}

	return (
		<>
			{fields.map((field, index) => (
				<Child
					key={field.id}
					fields={field}
					index={index}
					name={name}
					remove={remove}
					control={control}
					controls={controls}
				/>
			))}

			<Button
				themeType="accent"
				onClick={() => append(childEmptyValues)}
				style={{ marginTop: '8px', width: '70px' }}
			>
				{' '}
				+ Add
			</Button>

		</>

	);
}

export default FieldArray;
