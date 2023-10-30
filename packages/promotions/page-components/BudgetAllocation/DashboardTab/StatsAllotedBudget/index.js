import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function StatsAllotedBudget({
	amount = 0,
	params = {},
}) {
	return (
		<div className={styles.card}>
			<div className={styles.title}>Alloted Budget</div>
			<div className={styles.main_text}>
				{formatAmount({
					amount,
					currency : params?.currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
			</div>
			<div className={styles.sub_text}>Amount</div>
		</div>
	);
}

export default StatsAllotedBudget;
