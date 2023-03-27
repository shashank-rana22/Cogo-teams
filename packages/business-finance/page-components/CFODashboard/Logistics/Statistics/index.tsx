import { IcMInfo, IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import useGetTodayStats from '../../hooks/getTodayStats';

import styles from './styles.module.css';

function Statistics() {
	const { todayStatsData } = useGetTodayStats();
	const {
		todayPurchaseStats, todaySalesStats,
		totalCashFlow = 0, cashFlowDiffFromYesterday = 0,
	} = todayStatsData || {};
	const { totalBills = 0, totalExpense = 0, totalPurchaseOrgs = 0 } = todayPurchaseStats || {};
	const { totalInvoices = 0, totalRevenue = 0, totalSalesOrgs = 0 } = todaySalesStats || {};

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
					<div className={styles.border_left_side} />
					<div className={styles.expense_main}>
						<div className={styles.expense_text}>Expense</div>
						<div className={styles.amount_styles}>{totalExpense}</div>
						<div className={styles.invoices_styles}>
							{totalBills}
							{' '}
							Invoices |
							{' '}
							{totalPurchaseOrgs}
							{' '}
							Organisations
						</div>
					</div>
					<div className={styles.revenue_main}>
						<div className={styles.expense_text}>Revenue</div>
						<div className={styles.amount_styles}>{totalRevenue}</div>
						<div className={styles.invoices_styles}>
							{totalInvoices}
							{' '}
							Invoices |
							{' '}
							{totalSalesOrgs}
							{' '}
							Organisations
						</div>
					</div>
					<div className={styles.border_right_side} />
					<div className={styles.revenue_main}>
						<div>Cash Flow</div>
						<div>{totalCashFlow}</div>
						<div className={styles.text_styles}>
							<div className={styles.icon_styles}><IcMArrowNext height={20} width={20} /></div>
							<div>
								{' '}
								{cashFlowDiffFromYesterday}
								% more than yesterday
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default Statistics;
