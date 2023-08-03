import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import getVoiceCallStatement from '../../../../../utils/getVoiceCallStatement';

import styles from './styles.module.css';

function AgentTimeLine({ timeLineList = [] }) {
	return (
		<div className={styles.container}>
			{(timeLineList || []).map((item) => {
				const {
					conversation_type = '',
					agent_data = {},
					performed_by_data = {},
					created_at,
					conversation_started_at,
					channel = '',
					status = '',
					user_data = {},
				} = item || {};
				const { name : presentAgent } = agent_data || {};
				const { name : previousAgent } = performed_by_data || {};
				const { name : voiceCallUserName = '' } = user_data || {};

				return (
					<>
						<div
							className={styles.activity_date}
							key={created_at}
						>
							<div className={styles.dot} />
							<div className={styles.durations}>
								{formatDate({
									date       : created_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
									timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm a'],
									formatType : 'dateTime',
									separator  : ' ',
								})}
							</div>
						</div>
						<div className={styles.main_card}>
							<div className={styles.card}>
								<div className={styles.title}>
									{getVoiceCallStatement({
										type            : conversation_type,
										present         : presentAgent,
										previous        : channel === 'voice_call' ? voiceCallUserName : previousAgent,
										startAt         : conversation_started_at,
										voiceCallStatus : status,
									})}
								</div>
								<div className={styles.user_avatar}>
									<Avatar
										src={GLOBAL_CONSTANTS.image_url.user_avatar}
										alt="img"
										size="30px"
									/>
								</div>
							</div>
						</div>
					</>
				);
			})}
		</div>
	);
}
export default AgentTimeLine;
