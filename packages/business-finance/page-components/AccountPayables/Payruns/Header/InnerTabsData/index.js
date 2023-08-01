import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const STATS_VALUE = 0;
function InnerTabsData({ setActivePayrunTab = () => {}, isActive = false, payrunStats = {}, name = '', title = '' }) {
	const stats = payrunStats[name];

	return (
		<div
			className={cl`${styles.container} ${isActive ? styles.active : undefined}`}
			role="presentation"
			onClick={() => { setActivePayrunTab(name); }}
		>
			<span>{title}</span>
			<span className={styles.stats}>{stats || STATS_VALUE}</span>
		</div>
	);
}

export default InnerTabsData;
