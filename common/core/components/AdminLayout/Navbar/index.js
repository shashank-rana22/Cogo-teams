/* eslint-disable max-lines-per-function */
import { Input, cl } from '@cogoport/components';
import { IcMSearchdark, IcMNotifications } from '@cogoport/icons-react';
// import NewNotifications from '@cogoport/notifications/page-components/NewNotifications/index';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useState, useRef, useEffect } from 'react';

import { LOGO } from '../../../constants/logo';
import { applyFilter } from '../../../helpers/applyFilter';
import formatUserBasedNavView from '../../../helpers/formatUserBasedNavView';
import { sortNavs } from '../../../helpers/sortItems';
import useGetUserSessionMappings from '../../../hooks/useGetUserSessionMappings';
import Items from '../Items';

import AdminNotification from './AdminNotification';
import ProfileManager from './ProfileManager';
import styles from './styles.module.css';
import SwitchAccounts from './SwitchAccounts';
// import ThemeToggle from './ThemeToggle';

const ZERO = 0;
const MAX_COUNT = 100;

function Navbar({
	className,
	style,
	nav = [],
	partner_user_id = '',
	pinnedNavs = [],
	setPinnedNavKeys = () => {},
	mobileShow = false,
	inCall = false,
	userId = '',
	firestore = {},
	showCount,
	setShowCount,
}) {
	const ref = useRef(null);
	const { t } = useTranslation(['common']);
	const userBasedNavView = formatUserBasedNavView(nav);

	// eslint-disable-next-line no-undef
	// const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);

	const {
		data,
		refetch = () => {},
		timeLeft,
		loading,
		checkIfSessionExpiring,
	} = useGetUserSessionMappings();

	const showPin = userBasedNavView === nav;

	const [resetSubnavs, setResetSubnavs] = useState(false);
	const [openPopover, setOpenPopover] = useState(false);
	const [openNotificationPopover, setOpenNotificationPopover] = useState(false);
	const [unseenNotificationCount, setUnseenNotificationCount] = useState(false);
	const [searchString, setSearchString] = useState('');

	const filterdList = searchString
		? applyFilter(searchString, userBasedNavView, 'title', ['key', 'href', 'title'])
		: userBasedNavView;

	const listItems = sortNavs(filterdList);

	const filterdPinnedNavList = searchString
		? applyFilter(searchString, pinnedNavs, 'title', ['key', 'href', 'title'])
		: pinnedNavs;

	const pinnedListItems = sortNavs(filterdPinnedNavList);

	const setSearchFunc = useCallback(
		(value) => {
			setSearchString(value);
		},
		[],
	);

	const [{ data:notificationData, loading : notificationLoading }, trigger] = useRequest({
		url    : '/list_communications',
		method : 'get',
		// params : {
		// 	data_required                  : true,
		// 	not_seen_count_required        : true,
		// 	pagination_data_required       : true,
		// 	page                           : 1,
		// 	communication_content_required : true,
		// 	filters                        : { type: 'platform_notification' },
		// },
	}, { manual: true });

	const { is_not_seen_count = ZERO } = notificationData || {};

	useEffect(() => {
		trigger({
			params: {
				data_required                  : true,
				not_seen_count_required        : true,
				pagination_data_required       : true,
				page                           : 1,
				communication_content_required : true,
				filters                        : { type: 'platform_notification' },
			},
		});
	}, [trigger]);

	useEffect(() => {
		setUnseenNotificationCount(is_not_seen_count);
	}, [is_not_seen_count]);

	const handleLeave = () => {
		setShowCount(true);
		if (openPopover || openNotificationPopover) {
			setResetSubnavs(true);
		} else {
			setResetSubnavs(false);
		}
	};

	return (
		<div
			style={style}
			className={cl`${mobileShow ? styles.mobile_container : styles.container}${className}`}
		>
			<nav
				onMouseEnter={() => {
					setResetSubnavs(true);
					setShowCount(false);
				}}
				onMouseLeave={handleLeave}
			>
				<div className={cl`${mobileShow ? styles.mobile_bg_nav : styles.bg_nav}`} />
				<div className={styles.inner_container}>
					<div className={styles.brand_logo}>
						<img
							className={styles.logo}
							src={resetSubnavs ? LOGO.LARGE : LOGO.SMALL}
							alt="Logo Cogoport"
						/>
					</div>

					<ProfileManager
						resetSubnavs={resetSubnavs}
						setOpenPopover={setOpenPopover}
						setOpenNotificationPopover={setOpenNotificationPopover}
						checkIfSessionExpiring={checkIfSessionExpiring}
						loading={loading}
						openPopover={openPopover}
						openNotificationPopover={openNotificationPopover}
						timeLeft={timeLeft}
						refetch={refetch}
						userId={userId}
						firestore={firestore}
						notificationLoading={notificationLoading}
						trigger={trigger}
						data={notificationData}
						showCount={showCount}
					/>

					<div className={styles.search_container}>
						<Input
							value={searchString}
							placeholder={t('common:search_bar')}
							className={resetSubnavs ? styles.input_search : styles.input_search_hover}
							prefix={<IcMSearchdark width={16} height={16} />}
							onChange={setSearchFunc}
						/>
					</div>

					<div
						onClick={() => {
							setOpenNotificationPopover(!openNotificationPopover);
							setOpenPopover(false);
						}}
						className={styles.list_item_inner}
						style={{ marginTop: 8 }}
						role="presentation"
					>
						<IcMNotifications width={16} height={16} fill={unseenNotificationCount ? 'red' : '#000'} />
						{unseenNotificationCount && showCount && !openNotificationPopover ? (
							<div className={styles.notification_count}>
								{unseenNotificationCount >= MAX_COUNT
									? `${MAX_COUNT}+` : unseenNotificationCount}
							</div>
						) : null}

						<span>Notifications</span>

					</div>

					<div className={styles.line} />
					<ul ref={ref} className={styles.list_container}>
						<div className={styles.pinned_list}>
							{(pinnedListItems || []).map((item) => (
								<Items
									key={item.key}
									item={item}
									resetSubnavs={resetSubnavs}
									isPinned
									partner_user_id={partner_user_id}
									setPinnedNavKeys={setPinnedNavKeys}
									showPin={showPin}
									inCall={inCall}
								/>
							))}
						</div>
						<div className={styles.unpinned_list}>
							{(listItems || []).map((item) => (
								<Items
									key={item.key}
									item={item}
									resetSubnavs={resetSubnavs}
									isPinned={false}
									partner_user_id={partner_user_id}
									setPinnedNavKeys={setPinnedNavKeys}
									showPin={showPin}
									inCall={inCall}
								/>
							))}
						</div>
					</ul>

					{/* <ul className={styles.list_container}> */}
					{/* 	<li> */}
					{/* 		<div className={styles.toggle_button}> */}
					{/* 			<div className={styles.theme_icon}> */}
					{/* 				{activeTheme === 'light' ? '☀️' : '🌙' } */}
					{/* 			</div> */}
					{/* 			<span>{activeTheme === 'light' ? 'Light Mode' : 'Dark (beta)' }</span> */}
					{/* 			<ThemeToggle activeTheme={activeTheme} setActiveTheme={setActiveTheme} /> */}
					{/* 		</div> */}
					{/* 	</li> */}
					{/* </ul> */}
				</div>
			</nav>

			<div
				onMouseLeave={() => setResetSubnavs(false)}
			>
				{
					openPopover
						&& (
							<SwitchAccounts
								userMappings={data}
								refetch={refetch}
								setOpenPopover={setOpenPopover}
								loading={loading}
								checkIfSessionExpiring={checkIfSessionExpiring}
								timeLeft={timeLeft}
							/>
						)
				}

				{
					openNotificationPopover
						&& (
							<AdminNotification
								notificationData={notificationData}
								notificationLoading={notificationLoading}
								trigger={trigger}
								openNotificationPopover={openNotificationPopover}
								setOpenNotificationPopover={setOpenNotificationPopover}
								setUnseenNotificationCount={setUnseenNotificationCount}
								unseenNotificationCount={unseenNotificationCount}
							/>
						)
				}

			</div>

		</div>

	);
}

export default Navbar;
