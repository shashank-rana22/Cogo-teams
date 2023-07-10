import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import getServiceRequirementControls from '../../../../../../../../configurations/service-requirements-form-controls';

import Child from './Child';

function FieldArray(props) {
	const {
		name,
		control,
		...rest
	} = props;

	const controls = getServiceRequirementControls();

	const { fields, append, remove } = useFieldArray({ control, name });

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((item) => {
		CHILD_EMPTY_VALUES[item.name] = '';
	});

	return (
		<>
			{fields.map((field, index) => (
				<Child
					key={field.id}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					{...rest}
				/>
			))}

			<Button
				type="button"
				themeType="tertiary"
				onClick={() => append(CHILD_EMPTY_VALUES)}
			>
				<IcMPlusInCircle style={{ marginRight: '4px' }} />
				Add Another
			</Button>
		</>
	);
}

export default FieldArray;
