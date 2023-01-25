import { Input } from '@cogoport/components';
import cl from '@cogoport/components/src/utils/classname-processor';
import { IcMSearchdark, IcCPin } from '@cogoport/icons-react';
import React, { useCallback, useState, useRef } from 'react';

import { LOGO } from '../../../constants/logo';
import { applyFilter } from '../../../helpers/applyFilter';
import formatUserBasedNavView from '../../../helpers/formatUserBasedNavView';
import { sortNavs } from '../../../helpers/sortItems';
import Items from '../Items';

import ProfileManager from './ProfileManager';
import styles from './styles.module.css';

function Navbar({
	className,
	style,
	nav = [],
	pinListLoading = false,
	partner_user_id = '',
	pinnedNavs = [],
	setPinnedNavKeys = () => {},
	mobileShow = false,
}) {
	const ref = useRef(null);

	const userBasedNavView = formatUserBasedNavView(nav);

	const showPin = userBasedNavView === nav;

	const [resetSubnavs, setResetSubnavs] = useState(false);
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

	const scrollToPinnedList = (scrollRef) => {
		const container = scrollRef.current;

		container.scrollTop = 0;
	};

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
							className={styles.input_search}
							prefix={<IcMSearchdark width={16} height={16} />}
							onChange={setSearchFunc}
						/>
					</div>

					<ul ref={ref} className={styles.list_container}>
						<div className={styles.sticky_pins}>
							<div className={styles.line} />

							<div
								role="button"
								tabIndex={0}
								onClick={() => scrollToPinnedList(ref)}
								className={`
								${styles.list_item_inner} 
								${styles.list_item} 
								${(pinnedListItems || []).length === 0 ? styles.empty_pin_header : ''}`}
							>
								<IcCPin />
								<span>
									{(!pinListLoading && (pinnedListItems || []).length === 0) ? 'No Pins Found'
										: 'Pinned List'}

								</span>
							</div>

						</div>

						{(pinnedListItems || []).map((item) => (
							<Items
								key={item.key}
								item={item}
								resetSubnavs={resetSubnavs}
								isPinned
								partner_user_id={partner_user_id}
								setPinnedNavKeys={setPinnedNavKeys}
								showPin={showPin}
							/>
						))}

						<div className={styles.sticky_line} />

						{(listItems || []).map((item) => (
							<Items
								key={item.key}
								item={item}
								resetSubnavs={resetSubnavs}
								isPinned={false}
								partner_user_id={partner_user_id}
								setPinnedNavKeys={setPinnedNavKeys}
								showPin={showPin}
							/>
						))}
					</ul>
				</div>
			</nav>
		</div>

	);
}

export default Navbar;
