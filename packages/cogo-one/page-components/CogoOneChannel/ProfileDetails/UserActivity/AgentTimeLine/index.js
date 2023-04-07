import { Avatar } from '@cogoport/components';
import { format } from '@cogoport/utils';

import timeLineFunctions from '../../../../../utils/timeLineFunctions';

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
				} = item || {};
				const { name : presentAgent } = agent_data || {};
				const { name : previousAgent } = performed_by_data || {};
				const { renderStatement } = timeLineFunctions();

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
								<div className={styles.title}>
									{renderStatement({
										type     : conversation_type,
										present  : presentAgent,
										previous : previousAgent,
										startAt  : conversation_started_at,
									})}
								</div>
								<div className={styles.user_avatar}>
									<Avatar
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
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
