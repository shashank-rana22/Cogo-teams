import { cl, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import UserAvatar from '../../../../../common/UserAvatar';

import styles from './styles.module.css';

function KamUserContactCard({
	item = {},
	activeTab = {},
}) {
	const {
		user_id,
		userName,
	} = item || {};

	const isActiveCard = activeTab?.data?.user_id === user_id;

	return (
		<div
			key={user_id}
			role="presentation"
			// onClick={() => setActiveMessage(item)}
			className={cl`${styles.chat_card_main_container} ${isActiveCard ? styles.active_card : ''}`}
		>
			<UserAvatar
				type="whatsapp"
			/>
			<div className={styles.user_details}>
				<Tooltip
					content={startCase(userName) || 'User'}
					placement="top"
				>
					<div className={styles.user_name}>
						{startCase(userName) || 'User'}
					</div>
				</Tooltip>
			</div>
		</div>

	);
}

export default KamUserContactCard;
