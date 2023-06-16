import React from 'react';

import styles from './styles.module.css';

function TabStat({ name = '', number = 0, value, isActive = false, setActiveTab = () => { } }) {
	return (
		<div
			className={`${styles.container} ${isActive ? styles.active : ''}`}
			role="presentation"
			onClick={() => { setActiveTab(value); }}
		>
			<span>{name}</span>
			<span className={styles.stat}>{number}</span>
		</div>
	);
}

export default TabStat;
