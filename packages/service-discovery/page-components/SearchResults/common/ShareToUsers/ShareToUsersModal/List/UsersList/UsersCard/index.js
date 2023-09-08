import { Avatar, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function UserCard({ user = {}, onClick = () => {}, isSelected = false }) {
	return (
		<div
			role="presentation"
			className={cl`${styles.container} ${isSelected && styles.active}`}
			onClick={() => onClick(user)}
		>
			<div className={styles.content}>
				<Avatar
					src={GLOBAL_CONSTANTS.image_url.user_avatar}
					alt="img"
					size="40px"
					style={{ width: 34, height: 34 }}
				/>

				<div className={styles.main}>
					<div className={cl`${styles.name} ${styles.names}`}>{user.name}</div>
					<div className={styles.name}>{user.email}</div>
				</div>
			</div>

			{isSelected ? (
				<IcMFtick fill="#849E4C" width="20px" height="20px" />
			) : null}
		</div>
	);
}

export default UserCard;
