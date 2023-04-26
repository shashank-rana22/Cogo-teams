import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import getControls from '../../components/EngagementScoring/WarmthScoring/EngagementType/controlItem';

import Child from './Child';

function FieldArray(props) {
	const {
		name, control, watch,
	} = props;

	const { fields, append, remove } = useFieldArray({ control, name });

	const watchLifecycleStage = watch('single_item');
	const eventsToExclude = watchLifecycleStage.map((obj) => obj.event_name);

	const { controls } = getControls(eventsToExclude);

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
				themeType="secondary"
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
