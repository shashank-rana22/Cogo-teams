import { Tooltip, Avatar } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import EnlargedCard from './EnlargedCard';
import styles from './styles.module.css';

function UserCard({
	user = {}, userId = '', setUserId = () => {}, clickable = false, enlarged = false,
	setManagerIds = [],
}) {
	const getAvatarProps = (userInfo) => {
		const avatarProps = {};

		if (userInfo?.image_url) {
			avatarProps.src = userInfo.image_url;
		}

		avatarProps.personName = userInfo?.name;

		return avatarProps;
	};

	const setNewUser = (id) => {
		if (id) {
			setUserId(id);

			setManagerIds((pv) => {
				let newManagerList = [];
				const sliceIndex = (pv || []).findIndex((managerId) => managerId === id);

				newManagerList = sliceIndex >= 0
					? pv.slice(0, sliceIndex + 1) : [...pv, id];

				return newManagerList;
			});
		}
	};

	if (!enlarged) {
		return (
			<div className={styles.card_container}>
				<div
					className={styles.name_card}
					{...(clickable && {
						className: `${styles.name_card} 
                    ${user.user_id === userId ? styles.clicked_user : ''}`,
						role     : 'button',
						tabIndex : 0,
						onClick  : () => setNewUser(user.user_id.toString()),
					})}
				>
					<Avatar {...getAvatarProps(user)} size="80px" />
					<div className={styles.user_info}>
						<strong>{startCase(user?.name)}</strong>

						<div className={styles.id_designation}>
							<Tooltip placement="bottom" content={startCase(user?.designation)}>
								<div className={styles.designation}>{startCase(user?.designation)}</div>
							</Tooltip>

							<div className={styles.id}>{user?.cogo_id}</div>
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
