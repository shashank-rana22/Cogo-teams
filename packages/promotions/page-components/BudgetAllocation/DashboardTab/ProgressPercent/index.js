import React, { useMemo } from 'react';

import getFormattedAmount from '../../../../helpers/getFormattedAmount';

import styles from './styles.module.css';

function ProgressPercent({
	allotedBudget = 1,
	promoUsed = 0,
	promoCreated = 0,
	params = {},
}) {
	const { currency } = params || {};

	const promoCreateWidth = useMemo(
		() => ((promoCreated || 0) * 100) / (allotedBudget || 1),
		[promoCreated, allotedBudget],
	);

	const promoUseWidth = useMemo(
		() => ((promoUsed || 0) * 100) / (allotedBudget || 1),
		[allotedBudget, promoUsed],
	);

	const allotedAmount = useMemo(
		() => getFormattedAmount(allotedBudget, currency),
		[currency, allotedBudget],
	);

	const promoUsedAmout = useMemo(
		() => getFormattedAmount(promoUsed, currency),
		[currency, promoUsed],
	);
	const promoCreatedAmout = useMemo(
		() => getFormattedAmount(promoCreated, currency),
		[currency, promoCreated],
	);

	return (
		<div className={styles.card}>
			<div className={styles.alloted_budget}>
				<div className={styles.alloted_budget_text}>ALLOTED BUDGET:</div>
				<span className={styles.amount}>{allotedAmount}</span>
			</div>

			<div className={styles.progress_bar}>
				<div
					className={styles.promo_code_created_progress}
					style={{ width: `${promoCreateWidth}%` }}
				/>

				<div
					className={styles.promo_code_used_progress}
					style={{ width: `${promoUseWidth}%` }}
				/>
			</div>

			<div className={styles.bottom}>
				<div className={styles.bottom_container}>
					<div className={styles.promo_code_used_dot} />
					<div className={styles.alloted_budget_text}>PROMO CODE USED:</div>
					<span className={styles.amount}>{promoUsedAmout}</span>
				</div>

				<div className={styles.bottom_container}>
					<div className={styles.promo_code_created_dot} />
					<div className={styles.alloted_budget_text}>PROMO CODE CREATED:</div>
					<span className={styles.amount}>{promoCreatedAmout}</span>
				</div>
			</div>
		</div>
	);
}

export default React.memo(ProgressPercent);
