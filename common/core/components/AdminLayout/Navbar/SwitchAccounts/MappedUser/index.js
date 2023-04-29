/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from '@cogoport/components';
import { IcMDelete, IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useGetAllActions from '../../../../../hooks/useGetAllActions';

import Loader from './Loader';
import styles from './styles.module.css';

function MappedUser({
	user = {},
	refetch = () => {},
	sessionId,
	setSessionId = () => {},
	showActions,
	setShowActions = () => {},
	loading,
	setOpenPopover = () => {},
	checkIfSessionExpiring,
	timeLeft,
}) {
	const profile_name = user?.user_data?.name;

	const { removeProfile = () => {}, deleteLoading, updateLoading, switchLoading } = useGetAllActions({
		user,
		refetch,
		profile: 'non-default',
		setOpenPopover,
	});

	const handleShow = (val) => {
		if (val?.user_session_id === sessionId) {
			setShowActions(!showActions);
		} else {
			setShowActions(true);
			setSessionId(val?.user_session_id);
		}
	};

	const { expire_at = '' } = user || {};
	const expire_time = new Date(expire_at).getTime();

	const lessThan30Seconds = Number(timeLeft) >= Number(expire_time / 1000 - 30);

	const loadingState = loading
		|| lessThan30Seconds
		|| checkIfSessionExpiring
		|| deleteLoading
		|| updateLoading
		|| switchLoading;

	if (deleteLoading || updateLoading || switchLoading) {
		return <Loader />;
	}

	return (
		<div
			className={styles.container}
			style={{
				pointerEvents : loadingState ? 'none' : '',
				opacity       : loadingState ? '0.2' : 1,
			}}
		>
			<div
				className={styles.active_profile}
				onClick={() => handleShow(user)}
				role="presentation"
			>
				{
					sessionId === user?.user_session_id
						? (
							<div>
								<IcMFtick
									fill="#ABCD62"
									height="30px"
									width="30px"
									style={{ marginTop: '4px' }}
								/>
							</div>
						) : (
							<div>
								<IcMFtick
									fill="#bdbdbd"
									height="30px"
									width="30px"
									style={{ marginTop: '4px' }}
								/>
							</div>
						)
				}
				<div className={styles.profile_container}>
					<div className={styles.profile_pic}>
						{user?.user_data?.picture ? (
							<img
								src={user?.user_data?.picture}
								alt="loading"
								className="img"
							/>
						) : (
							<Avatar personName={profile_name} />
						)}
					</div>
					<div>
						<div className={styles.profile_name}>{startCase(user?.user_data?.name)}</div>
						<div className={styles.profile_email}>{user?.user_data?.email}</div>
					</div>
				</div>
			</div>
			<div
				className={styles.icon_container}
				id={user?.user_session_id}
				onClick={removeProfile}
				role="presentation"
			>
				<IcMDelete
					fontWeight={700}
				/>
			</div>
		</div>
	);
}

export default MappedUser;
