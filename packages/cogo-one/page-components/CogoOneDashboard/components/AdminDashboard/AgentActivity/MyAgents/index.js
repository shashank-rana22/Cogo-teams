import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import { CALL_STATUS_MAPPING } from '../../../../constants';
import EmptyStateAgentActivity from '../EmptyStateAgentActivity';
import styles from '../styles.module.css';

const TAB_MAPPING = {
	active   : styles.online,
	inactive : styles.offline,
	break    : styles.break,
};

function MyAgents({ list = [], redirectToAgentView = () => {}, activeTab = '' }) {
	if (isEmpty(list)) {
		return <EmptyStateAgentActivity />;
	}

	return (
		<>
			{(list || []).map((item) => {
				const { agent_data = {}, agent_id = '', id = '' } = item;
				const { email = '', name = '' } = agent_data || {};

				return (
					<div
						key={id}
						className={styles.profile_box}
						role="presentation"
						onClick={() => redirectToAgentView({ agentId: agent_id, name })}
					>
						<div className={styles.profile_box_left}>
							<div className={cl`${styles.circle_icon} ${TAB_MAPPING[activeTab]}`} />
							<div className={styles.profile_icon}>
								<Image
									src={GLOBAL_CONSTANTS.image_url.agent_avatar_icon}
									alt="Agent avatar"
									width={30}
									height={30}
								/>
							</div>
						</div>
						<div className={styles.profile_box_right}>
							<div className={styles.profile_box_right_up}>
								<div className={styles.name}>{name}</div>
								<div className={styles.call_status}>{CALL_STATUS_MAPPING[activeTab]}</div>
							</div>
							<div className={styles.profile_box_right_down}>
								<div className={styles.active_assigned_chats}>{email}</div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default MyAgents;
