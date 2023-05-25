import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import colors from '../../utils/colors';
import currencyCoversion from '../../utils/currencyCoversion';

import styles from './styles.module.css';

function RevenueData({ data = [], currency, heading = '' }) {
	return (
		<>
			<div className={styles.revenue_row}>
				<div className={styles.pie_head} />
				<div className={styles.revenue_head}>
					<div className={styles.revenue_text}>
						{heading}
						{' '}
						Revenue
					</div>
				</div>
				<div className={styles.booking_head}>
					<div className={styles.text}>
						Bookings
					</div>
				</div>
				<div className={styles.customer_head}>
					<div className={styles.text}>
						Customers
					</div>
				</div>
			</div>
			{data.map((val, index) => (
				<div key={uuidv4()} className={styles.revenue_row_data}>
					<div className={styles.pie_data}>
						<div className={styles.shipment_type_dot} style={{ background: colors[index] }} />
						<div className={styles.shipment_text}>
							{startCase(val?.shipment_type)}
						</div>
					</div>
					<div className={styles.revenue_data}>
						<div className={styles.text_currency}>
							{formatAmount({
								amount: currencyCoversion(
									currency,
									val?.overall_revenue_in_usd || 0,
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
					</div>
					<div className={styles.booking_data}>
						<div className={styles.text_booking}>
							{val?.number_of_bookings}
						</div>
					</div>
					<div className={styles.revenue_col_bookings}>
						<div className={styles.text_booking}>
							{val?.number_of_customers}
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default RevenueData;
