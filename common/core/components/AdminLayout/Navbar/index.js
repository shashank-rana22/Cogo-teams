import { Input } from '@cogoport/components';
import cl from '@cogoport/components/src/utils/classname-processor';
import { IcMSearchdark } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useCallback, useState } from 'react';

import { LOGO } from '../../../constants/logo';
import { applyFilter } from '../../../helpers/applyFilter';
import { sortNavs } from '../../../helpers/sortItems';
import Items from '../Items';

import ProfileManager from './ProfileManager';
import styles from './styles.module.css';

function Navbar({
	className,
	style,
	nav = [],
	mobileShow = false,
}) {
	const router = useRouter();

	const [resetSubnavs, setResetSubnavs] = useState(false);
	const [searchString, setSearchString] = useState('');

	const filterdList = searchString
		? applyFilter(searchString, nav, 'title', ['key', 'href', 'title'])
		: nav;

	const listItems = sortNavs(filterdList);

	const setSearchFunc = useCallback(
		(value) => {
			setSearchString(value);
		},
		[searchString],
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
							onClick={() => router.push('/home')}
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

					<ul className={styles.list_container}>
						{(listItems || []).map((item) => (
							<Items key={item} item={item} resetSubnavs={resetSubnavs} />
						))}
					</ul>
				</div>
			</nav>
		</div>

	);
}

export default Navbar;
