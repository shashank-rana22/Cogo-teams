import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function StatsAllotedBudget({ amount = '', selectedCurrency = 'USD' }) {
	return (
		<div className={styles.card}>
			<div className={styles.title}>Alloted Budget</div>
			<div className={styles.main_text}>{selectedCurrency + amount}</div>
			<div className={styles.main_text}>
				{formatAmount({
					amount   : { amount },
					currency : { selectedCurrency },
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						notation              : 'compact',
						compactDisplay        : 'short',
						maximumFractionDigits : 0,
					},
				})}

			</div>
			<div className={styles.sub_text}>Amount</div>
		</div>
	);
}

export default StatsAllotedBudget;
