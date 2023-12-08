import { cl } from '@cogoport/components';
// import { IcMSearchdark } from '@cogoport/icons-react';
// import { useTranslation } from 'next-i18next';
import React, { useState, useRef, useEffect } from 'react';

import { LOGO } from '../../../constants/logo';
// import { applyFilter } from '../../../helpers/applyFilter';
import formatUserBasedNavView from '../../../helpers/formatUserBasedNavView';
// import { sortNavs } from '../../../helpers/sortItems';
import useGetUserSessionMappings from '../../../hooks/useGetUserSessionMappings';
import Items from '../Items';

// import Notification from './Notification';
import ProfileManager from './ProfileManager';
import styles from './styles.module.css';
import SwitchAccounts from './SwitchAccounts';
// import ThemeToggle from './ThemeToggle';

function Navbar({
	className = '',
	style = {},
	nav = [],
	partner_user_id = '',
	pinnedNavs = [],
	setPinnedNavKeys = () => {},
	mobileShow = false,
	inCall = false,
	ticketCount = 0,
	unReadChatsCount = 0,
}) {
	const ref = useRef(null);
	const navRef = useRef(null);
	// const { t } = useTranslation(['common']);
	const userBasedNavView = formatUserBasedNavView(nav);

	// eslint-disable-next-line no-undef
	// const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);

	const {
		data,
		refetch = () => {},
		timeLeft,
		loading,
		checkIfSessionExpiring,
		userId,
	} = useGetUserSessionMappings();

	const showPin = userBasedNavView === nav;

	const [resetSubnavs, setResetSubnavs] = useState(false);
	const [openPopover, setOpenPopover] = useState(false);
	const [notificationPopover, setNotificationPopover] = useState(false);
	// const [searchString, setSearchString] = useState('');

	// const filterdList = searchString
	// 	? applyFilter(searchString, userBasedNavView, 'title', ['key', 'href', 'title'])
	// 	: userBasedNavView;

	// const listItems = sortNavs(filterdList);

	// const filterdPinnedNavList = searchString
	// 	? applyFilter(searchString, pinnedNavs, 'title', ['key', 'href', 'title'])
	// 	: pinnedNavs;

	// const pinnedListItems = sortNavs(filterdPinnedNavList);

	// const setSearchFunc = useCallback(
	// 	(value) => {
	// 		setSearchString(value);
	// 	},
	// 	[],
	// );

	// console.log(pinnedNavs, userBasedNavView, 'nav-view');

	const handleLeave = () => {
		if (openPopover || notificationPopover) {
			setResetSubnavs(true);
		} else {
			setResetSubnavs(false);
		}
	};

	const handleClickOutside = (event) => {
		if (navRef.current && !navRef.current.contains(event.target)) {
			setNotificationPopover(false);
			setResetSubnavs(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div
			style={style}
			className={cl`${mobileShow ? styles.mobile_container : styles.container}${className}
			${notificationPopover ? ` ${styles.expanded}` : ''}`}
			ref={navRef}
		>
			<nav
				onMouseEnter={() => setResetSubnavs(true)}
				onMouseLeave={handleLeave}
			>
				<div className={cl`${mobileShow ? styles.mobile_bg_nav : styles.bg_nav}
				${notificationPopover ? ` ${styles.notification_popover_bg_nav}` : ''}`}
				/>
				<div className={styles.inner_container}>
					<div className={styles.brand_logo}>
						<img
							className={styles.logo}
							src={resetSubnavs || notificationPopover ? LOGO.LARGE : LOGO.SMALL}
							alt="Logo Cogoport"
						/>
					</div>

					<ProfileManager
						resetSubnavs={resetSubnavs}
						setOpenPopover={setOpenPopover}
						checkIfSessionExpiring={checkIfSessionExpiring}
						loading={loading}
						openPopover={openPopover}
						notificationPopover={notificationPopover}
						setNotificationPopover={setNotificationPopover}
						timeLeft={timeLeft}
						refetch={refetch}
						mobileShow={mobileShow}
						unReadChatsCount={unReadChatsCount}
					/>

					{/* <div className={styles.search_container}>
						<Input
							value={searchString}
							placeholder={t('common:search_bar')}
							className={resetSubnavs ? styles.input_search : styles.input_search_hover}
							prefix={<IcMSearchdark width={16} height={16} />}
							onChange={setSearchFunc}
						/>
					</div> */}

					<div className={styles.line} />
					<ul ref={ref} className={styles.list_container}>
						<div className={styles.pinned_list}>
							{(pinnedNavs || []).map((item) => (
								<Items
									key={item.key}
									item={item}
									resetSubnavs={resetSubnavs}
									isPinned
									partner_user_id={partner_user_id}
									setPinnedNavKeys={setPinnedNavKeys}
									showPin={showPin}
									inCall={inCall}
									ticketCount={ticketCount}
									userId={userId}
								/>
							))}
						</div>
						<div className={styles.unpinned_list}>
							{(userBasedNavView || []).map((item) => (
								<Items
									key={item.key}
									item={item}
									resetSubnavs={resetSubnavs}
									isPinned={false}
									partner_user_id={partner_user_id}
									setPinnedNavKeys={setPinnedNavKeys}
									showPin={showPin}
									inCall={inCall}
									ticketCount={ticketCount}
									userId={userId}
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

				{/* {
					// notificationPopover
						? (
							<Notification
								notificationPopover={notificationPopover}
								setNotificationPopover={setNotificationPopover}
								setResetSubnavs={setResetSubnavs}
							/>
						) : null
				} */}

			</div>

		</div>

	);
}

export default Navbar;
