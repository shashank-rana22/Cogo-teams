// import logout from '@cogoport/authentication/utils/getLogout';
import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMLogout, IcMProfile, IcMReactivatedUsers, IcMHelp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import useGetAllActions from '../../../../hooks/useGetAllActions';
import useRemoveUserSessions from '../../../../hooks/useRemoveUserSessions';

import Items from './Items';
import styles from './styles.module.css';

const ZERO = 0;

function ProfileManager({
	resetSubnavs = false,
	setOpenPopover = () => {},
	openPopover = false,
	notificationPopover = false,
	setNotificationPopover = () => {},
	timeLeft = '',
	refetch = () => {},
	loading = false,
	checkIfSessionExpiring = false,
	mobileShow = false,
	unReadChatsCount = 0,
}) {
	const router = useRouter();
	const { t } = useTranslation(['common', 'notifications']);

	let audio = null;

	const isProdMode = process.env.NEXT_PUBLIC_REST_BASE_API_URL?.includes('https://api.cogoport.com/');

	if (typeof window !== 'undefined' && isProdMode) {
		const url = `${process.env.STATIC_ASSETS_URL}/mp3/notification.mp3`;

		audio = new Audio(url.replace(GLOBAL_CONSTANTS.regex_patterns.static_url, '$1'));
	}

	const [currentNotSeen, setCurrentNotSeen] = useState(unReadChatsCount);

	useEffect(() => {
		try {
			if (Notification && Notification.permission !== 'granted') {
				Notification.requestPermission();
			}
		} catch (err) {
			Toast.default(err, { hideAfter: 3 });
		}
	}, []);

	useEffect(() => {
		try {
			if (unReadChatsCount < currentNotSeen) {
				setCurrentNotSeen(unReadChatsCount);
			}

			if (audio && unReadChatsCount > currentNotSeen && unReadChatsCount !== ZERO) {
				audio?.play();
				setCurrentNotSeen(unReadChatsCount);
			}
		} catch (err) {
			Toast.error(err, { hideAfter: 3 });
		}
	}, [audio, unReadChatsCount, currentNotSeen, t]);

	const routerFunction = () => {
		router.push('/my-profile');
	};

	const { logoutOfAllAccounts = () => {} } = useRemoveUserSessions();

	const { removeProfile = () => {} } = useGetAllActions({ refetch, profile: 'default' });

	const profileComponents = [

		{
			title : t('common:my_profile'),
			name  : 'my_profile',
			fun   : routerFunction,
			icon  : IcMProfile,
		},
		{
			title : t('common:switch_account'),
			name  : 'switch_account',
			icon  : IcMReactivatedUsers,
		},
		{
			title : t('common:help'),
			name  : 'help',
			href  : 'https://www.cogoport.com/en/contact-us/',
			icon  : IcMHelp,
		},
		{
			title : t('common:logout'),
			name  : 'logout',
			fun   : removeProfile,
			icon  : IcMLogout,
		},
		{
			title : t('common:logout_all_accounts'),
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
				notificationCount={unReadChatsCount}
				mobileShow={mobileShow}
			/>
		</ul>
	);
}

export default ProfileManager;
