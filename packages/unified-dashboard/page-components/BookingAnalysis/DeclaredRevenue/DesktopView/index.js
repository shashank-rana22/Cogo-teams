import React from 'react';

import currencyCoversion from '../../../../utils/currencyCoversion';
import getMonthYear from '../../../../utils/getMonthYear';
import getShortFormatNumber from '../../../../utils/getShortFormatNumber';
import styles from '../styles.module.css';

const DesktopView = ({ master, keys, selectedFilterTab, currency }) => {
	const backgroundColor = (item) => (
		selectedFilterTab === 'month'
			&& `${item?.month || ''}${item?.year || ''}`
				=== `${getMonthYear().getMonth}${getMonthYear().getYear}`
	);

	const declaredRevenueData = master.map((el) => {
		const keyToUse = selectedFilterTab === 'week' ? 'day' : 'month';
		return keys.find((val) => val[keyToUse] === el[keyToUse]);
	});

	return declaredRevenueData.map((val) => (
		<div className={backgroundColor(val) ? `${styles.revenue_col_color}` : `${styles.revenue_col}`}>
			<div className={styles.text_currency}>
				{getShortFormatNumber(
					'en-US',
					currencyCoversion(currency, val?.total_amount || 0),
					currency,
					{
						currencyDisplay: 'symbol',
					},
				)}
			</div>
			<div className={styles.text_bookings}>
				<div className={styles.revenue_span}>No. of Bookings</div>
				<div className={styles.point}>:</div>
				{' '}
				<div className={styles.value_span}>{val === undefined ? 0 : Math.trunc(val?.no_of_booking)}</div>
				<div className={styles.bar}>|</div>
				{' '}
				<div className={styles.revenue_span}>No. of Customers</div>
				<div className={styles.point}>:</div>
				{' '}
				<div className={styles.value_span}>{val === undefined ? 0 : Math.trunc(val?.no_of_customers)}</div>
			</div>

		</div>
	));
};

export default DesktopView;
