import React from 'react';

import Sidebar from './Sidebar';
import styles from './styles.module.css';
import Topbar from './Topbar';

function CoreLayout({ children }) {
	return (
		<div className={styles.container}>
			<nav className={styles.topbar_container}>
				<Topbar />
			</nav>
			<aside className={styles.sidebar_container}>
				<Sidebar />
			</aside>
			<div className={styles.content_container}>
				{children}
			</div>
		</div>
	);
}

export default CoreLayout;
