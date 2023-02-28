import { Input, cl } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useCallback, useState, useRef } from 'react';

import { LOGO } from '../../../constants/logo';
import { applyFilter } from '../../../helpers/applyFilter';
import formatUserBasedNavView from '../../../helpers/formatUserBasedNavView';
import { sortNavs } from '../../../helpers/sortItems';
import useGetUserSessionMappings from '../../../hooks/useGetUserSessionMappings';
import Items from '../Items';

import ProfileManager from './ProfileManager';
import styles from './styles.module.css';
import SwitchAccounts from './SwitchAccounts';
// import ThemeToggle from './ThemeToggle';

function Navbar({
	className,
	style,
	nav = [],
	partner_user_id = '',
	pinnedNavs = [],
	setPinnedNavKeys = () => {},
	mobileShow = false,
	inCall = false,
}) {
	const ref = useRef(null);

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

	const handleLeave = () => {
		if (openPopover) {
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
				onMouseEnter={() => setResetSubnavs(true)}
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
						checkIfSessionExpiring={checkIfSessionExpiring}
						loading={loading}
						openPopover={openPopover}
						timeLeft={timeLeft}
						refetch={refetch}
					/>

					<div className={styles.search_container}>
						<Input
							value={searchString}
							placeholder="Search menu..."
							className={resetSubnavs ? styles.input_search : styles.input_search_hover}
							prefix={<IcMSearchdark width={16} height={16} />}
							onChange={setSearchFunc}
						/>
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
			</div>
		</div>

	);
}

export default Navbar;
