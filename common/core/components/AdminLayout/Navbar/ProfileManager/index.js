import logout from '@cogoport/authentication/utils/getLogout';
import { IcMLogout, IcMProfile, IcMReactivatedUsers, IcMHelp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import Items from './Items';
import styles from './styles.module.css';

function ProfileManager({ resetSubnavs }) {
	const router = useRouter();

	const routerFunction = () => {
		router.push('/my-profile');
	};
	const profileComponents = [

		{
			title : 'My Profile',
			name  : 'my_profile',
			fun   : routerFunction,
			icon  : IcMProfile,
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
			fun   : logout,
			icon  : IcMLogout,
		},
		{
			title : 'Logout of ALL accounts',
			name  : 'logout_all_accounts',
			icon  : IcMLogout,
		},

	];

	return (
		<ul className={styles.list_container}>
			<Items item={profileComponents} resetSubnavs={resetSubnavs} />
		</ul>
	);
}

export default ProfileManager;
