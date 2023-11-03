import FieldArray from '../../commons/FieldArray';

import getControls from './get-quest-config-controls';
import useCreatePostConfig from './useCreatePostConfig';

function QuestConfig({ config_id = null }) {
	const controls = getControls({ config_id });

	const { control, errors } = useCreatePostConfig({ config_id });

	return (
		<div>
			<div>
				<FieldArray
					name="agent_scoring_quest_configurations"
					control={control}
					controls={controls}
					error={errors}
					showElement
					buttonText=""
					size="sm"
				/>
			</div>
		</div>
	);
}

export default QuestConfig;
