import { Placeholder, Tooltip, Avatar } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import EnlargedCard from './EnlargedCard';
import styles from './styles.module.css';

const getAvatarProps = (userInfo) => {
	const avatarProps = {};

	if (userInfo?.image_url) {
		avatarProps.src = userInfo.image_url;
	}

	avatarProps.personName = (userInfo?.name || '').split(' ').splice(0, 2).join(' ');

	return avatarProps;
};

function UserCard({
	loading = false,
	user = {}, params = '',
	setParams = () => {},
	clickable = false,
	enlarged = false,
	refetchTreeParams,
}) {
	const setNewUser = () => {
		if (user) {
			const { ManagerIDS = '' } = params;
			const previousList = ManagerIDS.split(',').filter((i) => i);

			let newManagerList = [];
			const sliceIndex = (previousList || []).findIndex(
				(managerId) => managerId === user.manager_id || managerId === user.user_id,
			);

			newManagerList = sliceIndex >= 0
				? previousList.slice(0, sliceIndex + 1) : [...previousList, user.manager_id || user.user_id];

			setParams({
				UserID     : user.user_id,
				ManagerIDS : newManagerList.join(','),
			});
		}
	};

	if (!enlarged) {
		if (loading) {
			return (
				<div className={styles.card_container}>
					<div className={styles.name_card}>
						<Placeholder width="56px" height="56px" style={{ borderRadius: '4px' }} margin="8px" />

						<div className={styles.user_info}>
							<Placeholder width="240px" height="24px" style={{ borderRadius: '4px' }} />

							<div className={styles.id_designation}>
								<div className={styles.designation}>
									<Placeholder width="100px" height="20px" style={{ borderRadius: '4px' }} />
								</div>

								<div className={styles.id}>
									<Placeholder width="60px" height="20px" style={{ borderRadius: '4px' }} />
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className={styles.card_container}>
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
						<strong>{startCase(user?.name || '---')}</strong>

						<div className={styles.id_designation}>
							<Tooltip
								placement="bottom"
								content={(
									<div style={{ wordBreak: 'break-word' }}>
										{startCase(user.designation || '')}
									</div>
								)}
							>
								<div className={styles.designation}>{startCase(user.designation || '')}</div>
							</Tooltip>

							<div className={styles.id}>{user.cogo_id || '---'}</div>
						</div>
					</div>
				</div>
				{!!user.team_count && <div className={styles.team_count}>{user.team_count}</div>}
			</div>
		);
	}

	return (
		<EnlargedCard
			user={user}
			avatarProps={getAvatarProps(user)}
			refetchTreeParams={refetchTreeParams}
			loading={loading}
		/>
	);
}

export default UserCard;
