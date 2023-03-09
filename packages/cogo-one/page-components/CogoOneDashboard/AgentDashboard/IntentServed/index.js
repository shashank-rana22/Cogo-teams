import React from 'react';

import { intentServedData } from '../../configurations/dashboard';

import styles from './styles.module.css';

function IntentServed({ intentsServed }) {
	return (
		<div className={styles.intent_served_box}>
			<div className={styles.heading}>Intent Served</div>
			{intentServedData.map((item) => {
				const { label, key } = item;
				return (
					<div className={styles.sub_section}>
						<div className={styles.numbers}>{intentsServed[key] || 0}</div>
						<div className={styles.label}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}

export default IntentServed;
