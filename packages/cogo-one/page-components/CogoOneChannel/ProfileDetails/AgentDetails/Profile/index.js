import { Avatar, Placeholder } from '@cogoport/components';

import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function Profile({ loading, name, userEmail }) {
	return (
		<div className={styles.content}>
			<Avatar
				src="https://www.w3schools.com/howto/img_avatar.png"
				alt="img"
				disabled={false}
				className={styles.user_div}
			/>
			<div className={styles.details}>
				{loading ? (
					<>
						<Placeholder
							height="13px"
							width="120px"
							margin="0px 0px 10px 0px"
						/>
						<Placeholder
							height="13px"
							width="120px"
							margin="0px 0px 0px 0px"
						/>
					</>
				) : (
					<>
						<div className={styles.name}>
							{name || 'unknown user'}
						</div>
						<div className={styles.email}>
							{userEmail ? hideDetails({ data: userEmail, type: 'mail' }) : ''}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Profile;
