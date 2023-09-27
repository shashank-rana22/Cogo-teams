import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

const PERCENTAGE_BASE = 100;

function ProgressPercent({
	allotedBudget = '',
	promoUsed = '',
	promoCreated = '',
	selectedCurrency = 'USD',
}) {
	return (
		<div className={styles.card}>
			<div className={styles.alloted_budget}>
				<div className={styles.alloted_budget_text}>ALLOTED BUDGET:</div>
				{formatAmount({
					amount   : allotedBudget,
					currency : selectedCurrency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						notation              : 'compact',
						compactDisplay        : 'short',
						maximumFractionDigits : 2,
					},
				})}
			</div>
			<div className={styles.progress_bar}>
				<div
					className={styles.promo_code_created_progress}
					style={{ width: `${(promoCreated * PERCENTAGE_BASE) / allotedBudget}%` }}
				/>
				<div
					className={styles.promo_code_used_progress}
					style={{ width: `${(promoUsed * PERCENTAGE_BASE) / allotedBudget}%` }}
				/>
			</div>
			<div className={styles.bottom}>
				<div className={styles.bottom_container}>
					<div className={styles.promo_code_used_dot} />
					<div className={styles.alloted_budget_text}>PROMO CODE USED:</div>
					{formatAmount({
						amount   : promoUsed,
						currency : selectedCurrency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							notation              : 'compact',
							compactDisplay        : 'short',
							maximumFractionDigits : 2,
						},
					})}
				</div>
				<div className={styles.bottom_container}>
					<div className={styles.promo_code_created_dot} />
					<div className={styles.alloted_budget_text}>PROMO CODE CREATED:</div>
					{formatAmount({
						amount   : promoCreated,
						currency : selectedCurrency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							notation              : 'compact',
							compactDisplay        : 'short',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default ProgressPercent;
