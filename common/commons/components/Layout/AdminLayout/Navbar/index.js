import cl from '@cogoport/components/src/utils/classname-processor';
import React, { useState } from 'react';

import Items from '../Items';

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
					{nav.map((item) => (
						<Items key={item.name} item={item} resetSubnavs={resetSubnavs} />

					))}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
