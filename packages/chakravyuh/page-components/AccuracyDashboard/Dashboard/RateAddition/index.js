import { cl } from '@cogoport/components';
import React from 'react';

import { section_container } from '../styles.module.css';

import ColumnChart from './ColumnChart';
import styles from './styles.module.css';

function RateAddition() {
	return (
		<div className={cl`${section_container} ${styles.container}`}>
			<h3 className={styles.header}>Rate Addition</h3>
			<div className={cl`${styles.chart_container}`}>
				<ColumnChart />
			</div>
		</div>
	);
}

export default RateAddition;
