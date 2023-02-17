import { startCase } from '@cogoport/utils';

import UserAvatar from '../../../../../common/UserAvatar';
import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function Header({
	activeMessageCard = {},
}) {
	const { name = 'Unknown User', mobile_number = '+919876543210' } = activeMessageCard || {};

	// const
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<UserAvatar type="whatsapp" />
				<div>
					<div className={styles.name}>{startCase(name)}</div>
					<div className={styles.phone_number}>
						{hideDetails({ data: mobile_number, type: 'number' })}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
