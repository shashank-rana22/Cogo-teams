// eslint-disable-next-line import/no-unresolved
import cl from '@cogoport/components/src/utils/classname-processor';
// eslint-disable-next-line import/no-unresolved
import React, { useState } from 'react';

// eslint-disable-next-line import/no-unresolved, import/extensions
import Items from '../Items';

// eslint-disable-next-line import/no-unresolved
import styles from './styles.module.css';

function Navbar({
	className,
	style,
	nav = [],
	mobileShow = false,
}) {
	const [resetSubnavs, setResetSubnavs] = useState(false);

	return (
		<nav
			style={style}
			className={cl`
				${styles.container}
				${className}
				${mobileShow ? styles.mobile_show : ''}
			`}
			onMouseLeave={() => setResetSubnavs(!resetSubnavs)}
		>
			<div className={styles.bg_nav} />
			<div className={styles.inner_container}>
				<ul className={styles.list_container}>
					{Object.keys(nav).map((item) => (
						<Items key={item} item={nav[item]} resetSubnavs={resetSubnavs} />
					))}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
