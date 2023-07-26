// import logout from '@cogoport/authentication/utils/getLogout';
import { IcMLogout, IcMProfile, IcMReactivatedUsers, IcMHelp, IcMNotifications } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetAllActions from '../../../../hooks/useGetAllActions';
import useRemoveUserSessions from '../../../../hooks/useRemoveUserSessions';

import Items from './Items';
import styles from './styles.module.css';

function ProfileManager({
	resetSubnavs,
	setOpenPopover = () => {},
	openPopover,
	timeLeft,
	refetch = () => {},
	loading,
	checkIfSessionExpiring,
}) {
	const router = useRouter();

	const [notificationPopover, setNotificationPopover] = useState(false);

	const routerFunction = () => {
		router.push('/my-profile');
	};

	const notificationRedirect = () => {
		router.push('/notifications');
	};

	const { logoutOfAllAccounts = () => {} } = useRemoveUserSessions();

	const { removeProfile = () => {} } = useGetAllActions({ refetch, profile: 'default' });

	const profileComponents = [

		{
			title : 'My Profile',
			name  : 'my_profile',
			fun   : routerFunction,
			icon  : IcMProfile,
		},
		{
			title : 'Notifications',
			name  : 'notifications',
			fun   : notificationRedirect,
			icon  : IcMNotifications,
		},
		{
			title : 'Switch Account',
			name  : 'switch_account',
			icon  : IcMReactivatedUsers,
		},
		{
			title : 'Help',
			name  : 'help',
			href  : 'https://www.cogoport.com/en/contact-us/',
			icon  : IcMHelp,
		},
		{
			title : 'Logout',
			name  : 'logout',
			fun   : removeProfile,
			icon  : IcMLogout,
		},
		{
			title : 'Logout of ALL accounts',
			name  : 'logout_all_accounts',
			fun   : logoutOfAllAccounts,
			icon  : IcMLogout,
		},

	];

	return (
		<ul className={styles.list_container}>
			<Items
				item={profileComponents}
				resetSubnavs={resetSubnavs}
				timeLeft={timeLeft}
				loading={loading}
				refetch={refetch}
				setOpenPopover={setOpenPopover}
				checkIfSessionExpiring={checkIfSessionExpiring}
				openPopover={openPopover}
				notificationPopover={notificationPopover}
				setNotificationPopover={setNotificationPopover}
			/>
		</ul>
	);
}

export default ProfileManager;
