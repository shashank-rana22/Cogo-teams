import { IcMAirport, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Holiday() {
	return (
		<div className={styles.container}>
			<div className={styles.heading_title}>
				Next Holiday
			</div>
			<div className={styles.holiday_summary}>
				<div style={{ marginRight: 40 }}>
					<div className={styles.holiday_flex}>
						<div className={styles.holiday_date}>
							15
						</div>
						<div className={styles.holiday_month}>
							<div>
								Aug
							</div>
							2023
						</div>
					</div>
					Independence Day
				</div>
				<IcMAirport fill="#828282" width={50} height={50} />
			</div>
			<div className={styles.view_calendar}>
				View Calendar
				{' '}
				<IcMArrowRight style={{ marginLeft: 8 }} />
			</div>
		</div>
	);
}

export default Holiday;
