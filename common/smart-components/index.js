import React from 'react';

import styles from './styles.module.css';

function ViewLayout({ children = null, sidebar = null }) {
	return (
		<div>
			<div className={styles.container}>
				<div className={sidebar ? styles.with_sidebar : styles.without_sidebar}>
					{ children}
				</div>
				{
					sidebar ? (<div>{sidebar}</div>) : null
				}
			</div>
		</div>
	);
}

export default ViewLayout;
