import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function StatsPromoCodes({
	title = '',
	number = '',
	amount = '',
	selectedCurrency = 'USD',
}) {
	return (
		<div className={styles.card}>
			<div className={styles.title}>{title}</div>
			<div className={styles.main_container}>
				<div className={styles.container_column}>
					<div className={styles.main_text}>{number}</div>
					<div className={styles.sub_text}>Number</div>
				</div>
				<div className={styles.divider} />
				<div className={styles.container_column}>
					<div className={styles.main_text}>
						{formatAmount({
							amount,
							currency : selectedCurrency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 2,
							},
						})}
					</div>
					<div className={styles.sub_text}>Amount</div>
				</div>
			</div>
		</div>
	);
}

export default StatsPromoCodes;
