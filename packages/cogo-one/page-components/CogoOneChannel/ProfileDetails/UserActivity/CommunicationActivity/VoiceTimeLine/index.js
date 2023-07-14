import { Avatar } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import { VOICE_ICON_MAPPING } from '../../../../../../constants';
import timeLineFunctions from '../../../../../../utils/timeLineFunctions';

import styles from './styles.module.css';

function VoiceTimeLine({ item }) {
	const {
		agent_data = {},
		created_at = '',
		duration_of_call = '',
		call_status = '',
		call_type = '',
		initiated_by = '',
	} = item || {};
	const { name = '' } = agent_data || {};
	const { renderDuration, callStatus } = timeLineFunctions();

	const voiceIconUrl = VOICE_ICON_MAPPING[callStatus(call_status, call_type)];

	return (
		<>
			<div
				className={styles.activity_date}
				key={created_at}
			>
				<div className={styles.dot} />
				<div className={styles.durations}>
					{format(created_at, 'HH:mm a dd MMM')}
				</div>
			</div>
			<div className={styles.main_card}>
				<div className={styles.card}>
					<div className={styles.activity_div}>
						<div className={styles.title}>
							{startCase(name) || 'User'}
						</div>
						<div
							role="presentation"
							className={styles.icon_type}
						>
							<img
								src={voiceIconUrl}
								className={styles.avatar}
								alt="call-icon"
							/>
						</div>
					</div>
					<div className={styles.message_details}>
						<div className={styles.user_details}>
							<div className={styles.user_message}>
								Initiated by
								<span>{startCase(initiated_by)}</span>

							</div>
							<div className={styles.user_message}>
								{renderDuration(duration_of_call) || '0 sec'}
							</div>
						</div>
					</div>
					<div className={styles.user_avatar}>
						<Avatar
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
							alt="agent-img"
							disabled={false}
							size="30px"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default VoiceTimeLine;
