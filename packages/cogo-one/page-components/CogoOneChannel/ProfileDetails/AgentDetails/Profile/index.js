import { Avatar, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function Profile({ loading, name, userEmail }) {
	return (
		<div className={styles.content}>
			<Avatar
				src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
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
