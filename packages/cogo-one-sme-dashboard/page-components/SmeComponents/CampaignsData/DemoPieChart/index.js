import React from 'react';

import { demoConstants } from '../../../../constants/DemoConstants';

import DUMMY_DATA from './dummyData';
import styles from './styles.module.css';

function DemoPieChart() {
	return (
		<div className={styles.container}>
			{demoConstants.map(
				(itm) => (
					<div key={itm?.id} className={styles.body}>
						<div className={styles.header}>
							{itm?.icon}
							{itm?.header}
						</div>

						{(itm?.options || []).map(
							(option) => (
								<div
									className={styles.option_styles}
									key={option?.id}
								>
									<div className={styles.label}>
										{option?.label}
									</div>
									<div className={styles.value}>
										{DUMMY_DATA?.[option?.id] || 0}
									</div>
								</div>
							),
						)}
					</div>
				),
			)}

			<div className={styles.coming_soon}>
				Coming Soon...
			</div>
		</div>
	);
}

export default DemoPieChart;
