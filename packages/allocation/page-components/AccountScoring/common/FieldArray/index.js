import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import controlItem from '../../components/EngagementScoring/WarmthScoring/EngagementType/controlItem';

import Child from './Child';

function FieldArray(props) {
	const {
		name, control, item,
	} = props;

	const { fields, append } = useFieldArray({ control, name });

	const { controls } = controlItem[0];

	const childValues = {};

	Object.values(controls).forEach((value) => {
		childValues[value.name] = item[value.name];
	});

	if (isEmpty(fields)) {
		append(childValues);
	}

	return (
		<>
			<div>
				{fields.map((field, index) => (
					<Child
						key={field.id}
						fields={field}
						index={index}
						name={name}
						control={control}
						controls={controls}
					/>
				))}
			</div>

			<Button themeType="accent" onClick={() => append(childValues)}> Add +</Button>
		</>

	);
}

export default FieldArray;
