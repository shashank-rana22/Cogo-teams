import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TabStat({ name = '', value = '', number = '', isActive = false, setSubActiveTab = () => { } }) {
	return (
		<div
			className={cl`${styles.container} ${isActive ? styles.active : ''}`}
			role="presentation"
			onClick={() => { setSubActiveTab(value); }}
		>
			<span>{name}</span>
			<span className={styles.stat}>{number}</span>
		</div>
	);
}

export default TabStat;
