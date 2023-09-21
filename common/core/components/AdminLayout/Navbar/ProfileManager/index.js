// import logout from '@cogoport/authentication/utils/getLogout';
import { IcMLogout, IcMProfile, IcMReactivatedUsers, IcMHelp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
// import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useGetAllActions from '../../../../hooks/useGetAllActions';
import useRemoveUserSessions from '../../../../hooks/useRemoveUserSessions';

import useGetUnreadMessagesCount from './helpers/useGetUnreadMessageCount';
import Items from './Items';
import styles from './styles.module.css';

function ProfileManager({
	resetSubnavs,
	setOpenPopover = () => {},
	openPopover,
	openNotificationPopover,
	setOpenNotificationPopover,
	timeLeft,
	refetch = () => {},
	loading,
	checkIfSessionExpiring,
	userId = '',
	firestore = {},
	data,
	notificationLoading,
	trigger,
	showCount,
}) {
	const router = useRouter();
	const { t } = useTranslation(['common']);
	// const { general } = useSelector((state) => state);
	// const { scope } = general;

	// const [notificationPopover, setNotificationPopover] = useState(false);

	// const [{ data, loading : notificationLoading }, trigger] = useRequest({
	// 	url    : '/list_communications',
	// 	method : 'get',
	// 	params : {
	// 		data_required                  : true,
	// 		not_seen_count_required        : true,
	// 		pagination_data_required       : true,
	// 		page                           : 1,
	// 		communication_content_required : true,
	// 		filters                        : { type: 'platform_notification' },
	// 	},
	// 	scope,
	// }, { manual: false });
	const { unReadChatsCount = 0 } = useGetUnreadMessagesCount({
		firestore,
		userId,
	});

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
		// {
		// 	title : 'notification', // add in translation
		// 	name  : 'notifications',
		// 	icon  : IcMNotifications,
		// },
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

	// useEffect(() => {
	// 	trigger();
	// }, [trigger]);

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
				// notificationPopover={notificationPopover}
				// setNotificationPopover={setNotificationPopover}
				notificationLoading={notificationLoading}
				trigger={trigger}
				openNotificationPopover={openNotificationPopover}
				setOpenNotificationPopover={setOpenNotificationPopover}
				notificationData={data}
				showCount={showCount}
				notificationCount={unReadChatsCount} // not being used
			/>
		</ul>
	);
}

export default ProfileManager;
