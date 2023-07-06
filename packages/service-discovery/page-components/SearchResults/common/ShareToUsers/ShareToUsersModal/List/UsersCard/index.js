import { Avatar } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function UserCard({ user, onClick, isSelected }) {
	return (
		<div
			role="presentation"
			className={`${styles.container} ${isSelected && styles.active}`}
			onClick={() => onClick(user)}
		>
			<div className={styles.content}>
				<Avatar
					src="https://cogoport-production.sgp1.digitaloceanspaces.com/b17e97c0185eb584ed0227f8f630ebac/avatar.svg"
					alt="img"
					size="40px"
					style={{ width: 34, height: 34 }}
				/>

				<div className={styles.main}>
					<div className={`${styles.name} ${styles.names}`}>{user.name}</div>
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
