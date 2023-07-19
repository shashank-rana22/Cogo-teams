import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function InnerTabsData({ setActivePayrunTab = () => {}, isActive = false, payrunStats = {}, name = '', title = '' }) {
	const stats = payrunStats[name];
	return (
		<div
			className={cl`${styles.container} ${isActive ? styles.active : ''}`}
			role="presentation"
			onClick={() => { setActivePayrunTab(name); }}
		>
			<span>{title}</span>
			<span className={styles.stats}>{stats}</span>
		</div>
	);
}

export default InnerTabsData;
