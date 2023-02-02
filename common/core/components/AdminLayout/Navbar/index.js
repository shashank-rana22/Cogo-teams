import { Input, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMSearchdark } from '@cogoport/icons-react';
import React, { useCallback, useState } from 'react';

import { LOGO } from '../../../constants/logo';
import { applyFilter } from '../../../helpers/applyFilter';
import formatUserBasedNavView from '../../../helpers/formatUserBasedNavView';
import { sortNavs } from '../../../helpers/sortItems';
import Items from '../Items';

import ProfileManager from './ProfileManager';
import styles from './styles.module.css';
import ThemeToggle from './ThemeToggle';

function Navbar({
	className,
	style,
	nav = [],
	mobileShow = false,
}) {
	const userBasedNavView = formatUserBasedNavView(nav);
	// eslint-disable-next-line no-undef
	const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);

	const [resetSubnavs, setResetSubnavs] = useState(false);
	const [searchString, setSearchString] = useState('');

	const filterdList = searchString
		? applyFilter(searchString, userBasedNavView, 'title', ['key', 'href', 'title'])
		: userBasedNavView;

	const listItems = sortNavs(filterdList);

	const setSearchFunc = useCallback(
		(value) => {
			setSearchString(value);
		},
		[],
	);

	return (
		<div
			style={style}
			className={cl`${mobileShow ? styles.mobile_container : styles.container}${className}`}
		>
			<nav
				onMouseEnter={() => setResetSubnavs(true)}
				onMouseLeave={() => setResetSubnavs(false)}
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

					<ProfileManager resetSubnavs={resetSubnavs} />

					<div className={styles.search_container}>
						<Input
							value={searchString}
							placeholder="Search menu..."
							className={resetSubnavs ? styles.input_search : styles.input_search_hover}
							prefix={<IcMSearchdark width={16} height={16} />}
							onChange={setSearchFunc}
						/>
					</div>

					<ul className={styles.list_container}>
						{(listItems || []).map((item) => (
							<Items key={item.key} item={item} resetSubnavs={resetSubnavs} />
						))}
					</ul>

					<ul className={styles.list_container}>
						<li>
							<div className={styles.toggle_button}>
								<div className={styles.theme_icon}>
									{activeTheme === 'light' ? '☀️' : '🌙' }
								</div>
								<span>{activeTheme === 'light' ? 'Light Mode' : 'Dark (beta)' }</span>
								<ThemeToggle activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>

	);
}

export default Navbar;
