import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

export function DateEntity({ dates }) {
	return (
		<div className={styles.calendar}>
			{
				dates?.map((date) => (
					<div className={styles.dateContainer}>
						<div className={styles.dayH1}>
							{format(date, 'dd')}
						</div>
						<div className={styles.dayH2}>
							{format(date, 'MMM yy')}
						</div>
					</div>
				))
			}
		</div>
	);
}

export function MonthEntity({ months }) {
	return (
		<div className={styles.calendar}>
			{
				months?.map((month) => (
					<div className={styles.dateContainer}>
						<div className={styles.dayH1}>
							{format(month, 'MMM')}
						</div>
						<div className={styles.dayH2}>
							{format(month, 'yyyy')}
						</div>
					</div>
				))
			}
		</div>
	);
}

export function WeekEntity({ weeks }) {
	const todayDate = new Date();
	return (
		<div className={styles.calendar}>
			{
				weeks?.map((week) => (
					todayDate.getTime() >= week.date.getTime()
						&& (
							<div className={styles.dateContainer}>
								<div className={styles.dayH1}>
									Week
									{' '}
									{week.iterator}
								</div>
								<div className={styles.dayH2}>
									{format(week.date, 'MMM')}
									{' '}
									{week.start}
									{' to '}
									{week.end}
								</div>
							</div>
						)

				))
}
		</div>
	);
}
