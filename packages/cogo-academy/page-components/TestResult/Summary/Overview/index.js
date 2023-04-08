import { IcMActivePlans, IcMTimer } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Overview({ time_taken, topics_covered }) {
	const hours = Math.floor(parseInt(time_taken, 10) / 60);

	const remainingMinutes = parseInt(time_taken, 10) % 60;

	const formattedTime = `${hours.toString().padStart(2, '0')} : ${remainingMinutes.toString().padStart(2, '0')} hr`;

	return (
		<div className={styles.container}>
			<div className={styles.component_heading}>Overview</div>
			<div className={styles.items_container}>
				<div className={styles.single_item_container} style={{ marginBottom: '40px' }}>
					<div className={styles.svg}><IcMActivePlans /></div>
					<div className={styles.text_container}>
						<div className={styles.item_heading}>Topics Covered</div>

						<div className={styles.topics_container}>
							{Object.keys(topics_covered).map((key, index) => (
								<div className={styles.item_text}>
									{startCase(topics_covered[key])}
									{index !== Object.keys(topics_covered).length - 1 && ',' }
									&nbsp;
								</div>
							))}
						</div>

					</div>
				</div>
				<div className={styles.single_item_container}>
					<div className={styles.svg}><IcMTimer /></div>
					<div className={styles.text_container}>
						<div className={styles.item_heading}>Time Taken</div>
						<div className={styles.item_text}>
							{formattedTime}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Overview;
