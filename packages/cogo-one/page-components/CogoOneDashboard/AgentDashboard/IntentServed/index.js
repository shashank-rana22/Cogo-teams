import React from 'react';

import { intentServedData } from '../../../../configurations/dummyIntentservedData';

import styles from './styles.module.css';

function IntentServed() {
	return (

		<div className={styles.intent_served_box}>
			<div className={styles.heading}>Intent Served</div>

			{intentServedData.map((item) => {
				const { label, numbers } = item;
				return (

					<div className={styles.sub_section}>
						<div className={styles.numbers}>{numbers}</div>
						<div className={styles.label}>{label}</div>
					</div>

				);
			})}
		</div>

	);
}

export default IntentServed;
