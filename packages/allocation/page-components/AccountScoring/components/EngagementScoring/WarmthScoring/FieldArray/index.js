import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';

import getControls from '../../../../configurations/get-configuration-controls';

import Child from './Child';

function FieldArray(props) {
	const { t } = useTranslation(['allocation']);

	const {
		name, control, watch, engagementType, refetch, editLoading,
	} = props;

	const { fields, append, remove } = useFieldArray({ control, name });

	const watchLifecycleStage = watch('single_item');
	const eventsToExclude = watchLifecycleStage.map((obj) => obj.event_name);

	const { controls = [] } = getControls({ eventsToExclude, engagementType, t });

	const CHILD_VALUES = {};

	controls.forEach((item) => {
		CHILD_VALUES[item.name] = '';
	});

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
					eventName={field.event_name}
					engagementType={engagementType}
					refetch={refetch}
					editLoading={editLoading}
					watch={watch}
				/>
			))}

			<Button
				themeType="secondary"
				onClick={() => append(CHILD_VALUES)}
				style={{ marginTop: '8px' }}
			>
				{t('allocation:add_lifecycle_item_button')}
			</Button>

		</>

	);
}

export default FieldArray;
