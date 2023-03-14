import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Statistics() {
	return (
		<div>
			<div className={styles.card}>
				<div style={{ display: 'flex' }}>
					<div className={styles.main_div}>
						<span className={styles.text}>Today’s Statistics</span>
						<span className={styles.icon}>
							<IcMInfo />
						</span>
						<div className={styles.border} />
					</div>
					{/* <div className={styles.expense_div}> */}
					<div className={styles.border_left_side} />
					<div className={styles.expense_main}>
						<div className={styles.expense_text}>Expense</div>
						<div className={styles.amount_styles}>INR 5,40,000</div>
						<div className={styles.invoices_styles}>120 Invoices | 24 Organisations</div>
					</div>
					<div className={styles.revenue_main}>
						<div className={styles.expense_text}>Revenue</div>
						<div className={styles.amount_styles}>INR 5,40,000</div>
						<div className={styles.invoices_styles}>120 Invoices | 24 Organisations</div>
					</div>
					{/* </div> */}
					<div className={styles.border_right_side} />
					<div className={styles.revenue_main}>
						<div>Cash Flow</div>
						<div>INR 5,00,000</div>
						<div>+ 1.01% more than yesterday</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Statistics;
