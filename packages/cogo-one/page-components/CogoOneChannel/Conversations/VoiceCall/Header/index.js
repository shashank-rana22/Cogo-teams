import { startCase } from '@cogoport/utils';

import UserAvatar from '../../../../../common/UserAvatar';
import HideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function Header({
	activeVoiceCard = {},
}) {
	const { user_data, user_number = '' } = activeVoiceCard || {};
	const name = user_data?.name || '';

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<UserAvatar />
				<div>
					<div className={styles.name}>{startCase(name || 'unkown_user')}</div>
					<div className={styles.phone_number}>
						{HideDetails({ data: user_number, type: 'number' })}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
