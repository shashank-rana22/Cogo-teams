import cl from '@cogoport/components/src/utils/classname-processor';
import React, { useState } from 'react';

import { LOGO } from '../../../constants/logo';
import Items from '../Items';

import ProfileManager from './ProfileManager';
import styles from './styles.module.css';

function Navbar({
	className,
	style,
	nav = [],
}) {
	const [resetSubnavs, setResetSubnavs] = useState(false);
	const [show, setShow] = useState(false);

	return (
		<div
			style={style}
			className={cl`${styles.container}${className}`}
		>
			<nav
				onMouseEnter={() => setResetSubnavs(true)}
				onMouseLeave={() => setResetSubnavs(false)}
			>
				<div className={styles.bg_nav} />
				<div className={styles.inner_container}>
					<div className={styles.brand_logo}>
						<img
							className={styles.logo}
							src={resetSubnavs ? LOGO.LARGE : LOGO.SMALL}
							alt="Logo Cogoport"
						/>
					</div>

					<ProfileManager resetSubnavs={resetSubnavs} />

					<ul className={styles.list_container}>
						{Object.keys(nav).map((item) => (
							<Items key={item} item={nav[item]} resetSubnavs={resetSubnavs} />
						))}
					</ul>
				</div>
			</nav>
		</div>

	);
}

export default Navbar;
