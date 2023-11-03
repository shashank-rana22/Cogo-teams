import { Button } from '@cogoport/components';

import FieldArray from '../../commons/FieldArray';

import styles from './styles.module.css';
import useCreatePostConfig from './useCreatePostConfig';

function QuestConfig({ quest_id = null, data = {} }) {
	const {
		control,
		errors,
		watch,
		handleSubmit,
		handleClick,
	} = useCreatePostConfig({ quest_id, data });

	return (
		<div className={styles.container}>
			<FieldArray
				name="agent_scoring_quest_configurations"
				control={control}
				errors={errors}
				showElement
				buttonText="ADD Config"
				size="sm"
				config_id={data?.agent_scoring_config_id}
				watch={watch}
			/>

			<Button onClick={handleSubmit(handleClick)}>Save</Button>
		</div>
	);
}

export default QuestConfig;
