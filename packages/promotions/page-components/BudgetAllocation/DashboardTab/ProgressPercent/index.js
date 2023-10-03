import getFormattedAmount from '../../../../helpers/getFormattedAmount';

import styles from './styles.module.css';

const PERCENTAGE_BASE = 100;
const ZERO = 0;
const ONE = 1;

function ProgressPercent({
	allotedBudget = 1,
	promoUsed = 0,
	promoCreated = 0,
	params = {},
}) {
	return (
		<div className={styles.card}>
			<div className={styles.alloted_budget}>
				<div className={styles.alloted_budget_text}>ALLOTED BUDGET:</div>
				{getFormattedAmount(allotedBudget, params?.currency)}
			</div>
			<div className={styles.progress_bar}>
				<div
					className={styles.promo_code_created_progress}
					style={{ width: `${((promoCreated || ZERO) * PERCENTAGE_BASE) / (allotedBudget || ONE)}%` }}
				/>
				<div
					className={styles.promo_code_used_progress}
					style={{ width: `${((promoUsed || ZERO) * PERCENTAGE_BASE) / (allotedBudget || ONE)}%` }}
				/>
			</div>
			<div className={styles.bottom}>
				<div className={styles.bottom_container}>
					<div className={styles.promo_code_used_dot} />
					<div className={styles.alloted_budget_text}>PROMO CODE USED:</div>
					{getFormattedAmount(promoUsed, params?.currency)}
				</div>
				<div className={styles.bottom_container}>
					<div className={styles.promo_code_created_dot} />
					<div className={styles.alloted_budget_text}>PROMO CODE CREATED:</div>
					{getFormattedAmount(promoCreated, params?.currency)}
				</div>
			</div>
		</div>
	);
}

export default ProgressPercent;
