import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useGetAllActions from '../../../../../hooks/useGetAllActions';

import styles from './styles.module.css';

function MappedUser({
	user = {},
	refetch = () => {},
	// profileData,
	// userMappings,
	// sessionId,
	// setSessionId = () => {},
	// showActions,
	// setShowActions = () => {},
	// timeLeft,
	// checkIfSessionExpiring,
}) {
	const profile_name = user?.user_data?.name?.split(' ');

	const { removeProfile = () => {} } = useGetAllActions({
		user,
		refetch,
	});

	return (
		<div className={styles.container}>
			<div className={styles.active_profile}>
				<div className={styles.profile_container}>
					<div className={styles.profile_pic}>
						{user?.user_data?.picture ? (
							<img
								src={user?.user_data?.picture}
								alt="loading"
								className="img"
							/>
						) : (
							<span>
								{profile_name?.[0]?.[0]?.toUpperCase() || null}
								{profile_name?.[1]?.[0]?.toUpperCase() || null}
							</span>
						)}
					</div>
					<div>
						<div className={styles.profile_name}>{startCase(user?.user_data?.name)}</div>
						<div className={styles.profile_email}>{user?.user_data?.email}</div>
					</div>
				</div>
				<div
					className={styles.icon_container}
					id={user?.user_session_id}
					onClick={removeProfile}
					role="presentation"
				>
					<IcMDelete fontWeight={700} />
				</div>
			</div>
		</div>
	);
}

export default MappedUser;
