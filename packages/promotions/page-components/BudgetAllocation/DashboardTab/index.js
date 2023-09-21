import React from 'react';

import BudgetGenerator from './BudgetGenerator';
import StatsAllotedBudget from './StatsAllotedBudget';
import StatsPromoCodes from './StatsPromoCodes';
import styles from './styles.module.css';

function DashboardTab() {
	return (
		<div>
			<BudgetGenerator amount="165456006" />
			<div className={styles.stats}>
				<div className={styles.statsItem}>
					<StatsAllotedBudget
						amount="1000"
						currency="$"
					/>
				</div>
				<div className={styles.statsItem}>
					<StatsPromoCodes
						title="Promo Codes Created"
						number="100"
						amount="1000"
						currency="$"
					/>
				</div>
				<div className={styles.statsItem}>
					<StatsPromoCodes
						title="Promo Codes Used"
						number="10"
						amount="850"
						currency="$"
					/>
				</div>
			</div>
		</div>
	);
}

export default DashboardTab;
