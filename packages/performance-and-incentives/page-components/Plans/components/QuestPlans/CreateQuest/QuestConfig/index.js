import FieldArray from '../../commons/FieldArray';

import useCreatePostConfig from './useCreatePostConfig';

function QuestConfig({ quest_id = null, data = {} }) {
	console.log('quest_id::', quest_id);

	const { control, errors, watch } = useCreatePostConfig({ config_id: data?.agent_scoring_config_id });

	return (
		<div>
			<div>
				<FieldArray
					name="agent_scoring_quest_configurations"
					control={control}
					error={errors}
					showElement
					buttonText=""
					size="sm"
					config_id={data?.agent_scoring_config_id}
					watch={watch}
				/>
			</div>
		</div>
	);
}

export default QuestConfig;
