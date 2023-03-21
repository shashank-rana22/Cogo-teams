import { Button, Pill, Avatar } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import EnlargedCard from './EnlargedCard';
import styles from './styles.module.css';

function UserCard({ user = {}, userId = '', setUserId = () => {}, clickable = false, enlarged = false }) {
	const getAvatarProps = (userInfo) => {
		const avatarProps = {};

		if (userInfo?.image_url) {
			avatarProps.src = userInfo.image_url;
		}

		avatarProps.personName = userInfo?.name;

		return avatarProps;
	};

	if (!enlarged) {
		return (
			<div className={styles.card_container}>
				<div
					className={styles.name_card}
					{...(clickable && {
						className: `${styles.name_card} 
                    ${user.id === userId ? styles.clicked_user : ''}`,
						role     : 'button',
						tabIndex : 0,
						onClick  : () => setUserId(user.id.toString()),
					})}
				>
					<Avatar {...getAvatarProps(user)} size="80px" />
					<div className={styles.user_info}>
						<div>{startCase(user?.name)}</div>
						<div>
							{startCase(user?.designation)}
							{' '}
							-
							{' '}
							{user?.employee_id}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<EnlargedCard user={user} avatarProps={getAvatarProps(user)} />
	);
}

export default UserCard;
