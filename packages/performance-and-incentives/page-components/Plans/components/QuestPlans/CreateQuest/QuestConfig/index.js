import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMJobsConfig } from '@cogoport/icons-react';

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
		<>

			<div className={styles.heading}>
				<IcMJobsConfig height={20} width={20} />
				Set Configurations
			</div>

			<div className={styles.field_container}>

				<div className={styles.quest_string_label}>
					Quest String
					<sup className={styles.sup}>*</sup>
				</div>

				<InputController
					name="quest_string"
					size="sm"
					control={control}
					errors={errors}
					rules={{ required: 'Required' }}
					style={{ width: '84%' }}
					value={data?.quest_string}
				/>

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

		</>
	);
}

export default QuestConfig;
