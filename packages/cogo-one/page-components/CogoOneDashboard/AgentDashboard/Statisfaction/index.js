import React from 'react';

import { satisfactionData } from '../../../../configurations/dummyStatisfactionData';

import styles from './styles.module.css';

function Statisfaction({ customerSatisfaction = {} }) {
	return (
		<div className={styles.statisfaction_box}>
			<div className={styles.heading}>User Satisfaction</div>
			{satisfactionData.map((item) => {
				const { label, key, icon } = item;
				return (
					<div className={styles.sub_section}>
						<div className={styles.icon_plus_number}>
							<div>{icon}</div>
							<div className={styles.customers_numbers}>{customerSatisfaction[key] || 0}</div>
						</div>
						<div className={styles.label}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}

export default Statisfaction;
