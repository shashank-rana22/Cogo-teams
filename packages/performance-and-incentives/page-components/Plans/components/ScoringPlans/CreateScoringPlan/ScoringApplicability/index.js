import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { getFieldController } from '../../../../../../common/Form/getFieldController';
import getScoreApplicableFormControls from '../../../../configurations/get-score-applicable-form-controls';
import CHANNEL_OPTIONS from '../../../../constants/select-channel-options';

import styles from './styles.module.css';
import useCreateScoringConfig from './useCreateScoringConfig';

function ScoringApplicability() {
	const { control, formState: { errors }, handleSubmit, watch } = useForm();

	const { createScoringConfig, loading } = useCreateScoringConfig();

	const [cogoEntityId, roleFunction, channel] = watch(['cogo_entity_id', 'role_function', 'channel']);

	const channelOptions = CHANNEL_OPTIONS[roleFunction] || [];

	const controls = getScoreApplicableFormControls({ cogoEntityId, roleFunction, channel, channelOptions });

	const onSubmit = (values) => {
		createScoringConfig({ values });
	};

	return (
		<>

			<h3>Scoring Applicable On</h3>

			<div className={styles.container}>

				<div className={styles.form_container}>
					{controls.map((controlItem) => {
						const { type, label, name, style = {} } = controlItem || {};

						const Element = getFieldController(type);

						return (
							<div className={styles.control_item} key={name} style={style}>
								<div className={styles.label}>
									{label}
									<sup className={styles.sup}>*</sup>
								</div>

								<div>
									<Element
										control={control}
										{...controlItem}
									/>

									{errors[name] && <div className={styles.error_msg}>This is required</div>}
								</div>
							</div>
						);
					})}

				</div>

			</div>

			<Button
				type="button"
				size="md"
				themeType="secondary"
				loading={loading}
				className={styles.btn}
				onClick={handleSubmit(onSubmit)}
			>
				Save
			</Button>
		</>

	);
}

export default ScoringApplicability;
