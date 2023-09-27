// import logout from '@cogoport/authentication/utils/getLogout';
import { Toast } from '@cogoport/components';
import { IcMLogout, IcMProfile, IcMReactivatedUsers, IcMHelp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import getStaticPath from '@cogoport/notifications/utils/getStaticPath';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import useGetAllActions from '../../../../hooks/useGetAllActions';
import useRemoveUserSessions from '../../../../hooks/useRemoveUserSessions';

import useGetUnreadMessagesCount from './helpers/useGetUnreadMessageCount';
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
	userId = '',
	firestore = {},
	mobileShow = false,
}) {
	const router = useRouter();
	const { t } = useTranslation(['common', 'notifications']);

	let audio = null;

	if (typeof window !== 'undefined') {
		audio = new Audio(getStaticPath('/mp3/notification.mp3'));
	}

	const { unReadChatsCount = 0 } = useGetUnreadMessagesCount({
		firestore,
		userId,
	});

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

			const notifyMe = () => {
				if (!('Notification' in window)) {
					Toast.default('This browser does not support desktop notification', { icon: false });
				} else if (Notification.permission === 'granted') {
					// eslint-disable-next-line no-unused-vars
					const notification = new Notification(
						`${unReadChatsCount} ${t('notifications:new_notifications')}`,
					);
				}
			};

			if (audio && unReadChatsCount > currentNotSeen && unReadChatsCount !== ZERO) {
				audio.play();
				notifyMe();
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
