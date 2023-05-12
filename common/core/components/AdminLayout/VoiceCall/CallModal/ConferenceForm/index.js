import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMAgentManagement } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { ICON_MAPPING } from '../../configurations/group-call-controls';
import CustomCheckBoxGroupController from '../../utils/CustomCheckBoxGroupController';
import CustomSelectController from '../../utils/CustomSelectController';

import styles from './styles.module.css';

function ConferenceForm({
	control,
	agent = {},
	actionType = {},
	live_call_action_type = '',
	reset,
	updateLiveCallStatusLoading = false,
	updateLiveCallStatus,
	handleSubmit,
	errors = {},
}) {
	const ActiveTypeIcon = ICON_MAPPING[live_call_action_type] || null;
	return (
		!live_call_action_type ? (
			<div className={styles.actions_div}>
				<CustomCheckBoxGroupController control={control} {...actionType} />
			</div>
		) : (
			<div className={styles.agent_view}>
				<div className={styles.agent_selecter}>
					<IcMArrowLeft onClick={reset} className={styles.back_icon} />
					<div>
						<CustomSelectController
							{...agent}
							control={control}
							prefix={<IcMAgentManagement />}
						/>
						<div className={styles.error_text}>{errors?.agent_id && 'This is Required'}</div>
					</div>
				</div>
				<div className={styles.button_div}>
					<Button
						size="md"
						themeType="accent"
						className={styles.button_flex}
						loading={updateLiveCallStatusLoading}
						onClick={handleSubmit((val) => updateLiveCallStatus(val, reset))}
					>
						{ActiveTypeIcon && <ActiveTypeIcon className={styles.type_icon} />}
						{startCase(live_call_action_type)}
					</Button>
				</div>
			</div>
		)
	);
}
export default ConferenceForm;
