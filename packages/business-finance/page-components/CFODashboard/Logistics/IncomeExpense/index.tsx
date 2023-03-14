import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function IncomeExpense() {
	return (
		<div>
			<div className={styles.card}>
				<div>
					Income & Expense
					<IcMInfo />
					<div className={styles.border} />
				</div>
			</div>
		</div>
	);
}

export default IncomeExpense;
