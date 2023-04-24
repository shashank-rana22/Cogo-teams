import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import controlItem from '../../components/EngagementScoring/WarmthScoring/EngagementType/controlItem';

import Child from './Child';

function FieldArray(props) {
	const {
		name, control,
	} = props;

	const { fields, append, remove } = useFieldArray({ control, name });

	const { controls } = controlItem[0];

	const childValues = {};

	controls.forEach((item) => {
		childValues[item.name] = '';
	});

	return (
		<>
			<div>
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
			</div>

			<Button
				themeType="accent"
				onClick={() => append(childValues)}
				style={{ marginTop: '8px' }}
			>
				{' '}
				+ Add Lifecycle Item
			</Button>

		</>

	);
}

export default FieldArray;
