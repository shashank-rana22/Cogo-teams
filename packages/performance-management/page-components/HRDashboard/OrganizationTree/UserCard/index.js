import { Tooltip, Avatar } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import EnlargedCard from './EnlargedCard';
import styles from './styles.module.css';

const getAvatarProps = (userInfo) => {
	const avatarProps = {};

	if (userInfo?.image_url) {
		avatarProps.src = userInfo.image_url;
	}

	avatarProps.personName = userInfo?.name;

	return avatarProps;
};

function UserCard({
	loading = false,
	user = {}, params = '',
	setParams = () => {},
	clickable = false,
	enlarged = false,
	isLastLevel = false,
	fetchTreeData,
	clickRef,
	scrollToSection = () => {},
}) {
	const setNewUser = (id) => {
		if (id) {
			const { ManagerIDS = '' } = params;
			const previousList = ManagerIDS.split(',').filter((i) => i);

			let newManagerList = [];
			const sliceIndex = (previousList || []).findIndex((managerId) => managerId === id);

			newManagerList = sliceIndex >= 0
				? previousList.slice(0, sliceIndex + 1) : [...previousList, id];

			setParams({
				UserID     : id,
				ManagerIDS : isLastLevel ? ManagerIDS : newManagerList.join(','),
			});
			scrollToSection(clickRef);
		}
	};

	if (!enlarged) {
		return (
			<div className={`${styles.card_container} ${loading && !isLastLevel ? styles.loading_card : ''}`}>
				<div
					className={styles.name_card}
					{...(clickable && {
						className: `${styles.name_card} 
                    ${user.user_id === params.UserID ? styles.clicked_user : ''}`,
						role     : 'button',
						tabIndex : 0,
						onClick  : () => setNewUser(user.user_id?.toString()),
					})}
				>
					<Avatar {...getAvatarProps(user)} size="80px" />

					<div className={styles.user_info}>
						<strong>{startCase(user?.name)}</strong>

						<div className={styles.id_designation}>
							<Tooltip placement="bottom" content={startCase(user.designation || '')}>
								<div className={styles.designation}>{startCase(user.designation || '')}</div>
							</Tooltip>

							<div className={styles.id}>{user?.cogo_id}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<EnlargedCard user={user} avatarProps={getAvatarProps(user)} fetchTreeData={fetchTreeData} loading={loading} />
	);
}

export default UserCard;
