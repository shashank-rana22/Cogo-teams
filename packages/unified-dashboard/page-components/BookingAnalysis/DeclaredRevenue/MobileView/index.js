import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import currencyCoversion from '../../../../utils/currencyCoversion';
import styles from '../styles.module.css';

function MobileView({ master, keys, selectedFilterTab, currency }) {
	const declaredRevenueData = master.map((el) => {
		const keyToUse = selectedFilterTab === 'week' ? 'day' : 'month';
		return keys.find((val) => val[keyToUse] === el[keyToUse]);
	});

	const etdMonth = declaredRevenueData[declaredRevenueData.length - 1];

	return (
		<div className={styles.revenue_col}>
			<div className={styles.text_currency}>

				{formatAmount({
					amount: currencyCoversion(
						currency,
						etdMonth?.total_amount || 0,
					),
					currency,
					options: {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						notation              : 'compact',
						compactDisplay        : 'short',
						minimumFractionDigits : 2,
					},
				})}
			</div>
			<div className={styles.text_bookings}>
				<div className={styles.revenue_span}>No. of Bookings</div>
				{' '}
				:
				{' '}
				{etdMonth === undefined ? 0 : Math.trunc(etdMonth?.no_of_booking)}
				{' '}
				<div className={styles.bar}>|</div>
				{' '}
				<div className={styles.revenue_span}>No. of Customers</div>
				{' '}
				:
				{' '}
				{etdMonth === undefined ? 0 : Math.trunc(etdMonth?.no_of_customers)}
			</div>
		</div>
	);
}

export default MobileView;
