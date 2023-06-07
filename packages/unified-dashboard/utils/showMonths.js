import React from 'react';

import getNextWeekDate from './getNextWeek';
import styles from './styles.module.css';

function ShowMonths({ selectedFilterTab, value }) {
	switch (selectedFilterTab) {
		case 'month':
			return (
				<div className={styles.text_date}>
					{value?.month}
					(
					{value?.year}
					)
				</div>
			);

		case 'week':
			return (
				<div className={styles.text_date}>
					{getNextWeekDate(value)}
				</div>
			);

		case 'quarter':
			return (
				<div className={styles.text_date}>
					{value?.month}
					(
					{value?.year}
					)
				</div>
			);
		default:
			break;
	}

	return false;
}

export default ShowMonths;
