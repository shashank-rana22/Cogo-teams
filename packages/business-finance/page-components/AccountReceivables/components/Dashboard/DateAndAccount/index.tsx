import { Tooltip, Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function DateAndAccount({ outstandingData, outstandingLoading }) {
	const {
		overallStats = {},
	} = outstandingData || {};

	return (
		<div>

			<div className={styles.over_all_data}>
				<div className={styles.account_receivables}>

					{outstandingLoading ? <Placeholder style={{ width: '300px', height: '40px' }} />
						: (
							<>
								<div className={styles.account_receivables_line}>
									<div>
										{overallStats.dashboardCurrency || 'INR'}
									</div>
									<div className={styles.account_receivables_amount}>
										<Tooltip content={(
											<div>
												{getFormattedPrice(
													overallStats.totalOutstandingAmount,
													overallStats.dashboardCurrency,
												)}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{getFormattedPrice(
													overallStats.totalOutstandingAmount || 0,
												)}
											</div>

										</Tooltip>

									</div>
								</div>

								<div className={styles.account_receivables_invoices}>
									<div className={styles.styled_text}>
										Account Recievables
									</div>
									<div
										className={styles.invoice_text}
									>
										open Invoices -
										{overallStats.openInvoicesCount || 0}
										{' | '}
										Customers -
										{overallStats.customersCount || 0}
									</div>

								</div>

							</>
						)}
				</div>

				<div className={styles.open_invoices}>

					{outstandingLoading ? <Placeholder style={{ width: '300px', height: '40px' }} />
						: (
							<>
								<div className={styles.account_receivables_open_line}>
									<div>
										{overallStats.dashboardCurrency || 'INR'}
									</div>

									<div
										className={styles.account_receivables_amount}
									>
										<Tooltip content={(
											<div>
												{getFormattedPrice(
													overallStats.openInvoicesAmount,
													overallStats.dashboardCurrency,
												)}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{getFormattedPrice(
													overallStats.openInvoicesAmount || 0,
												)}
											</div>

										</Tooltip>

									</div>
								</div>

								<div className={styles.sub_invoices}>
									<div className={styles.styled_text}>
										Open Invoices
									</div>
									<div style={{ display: 'flex' }}>
										<div>
											<img
												// eslint-disable-next-line max-len
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shape.svg"
												alt="Right Icon"
											/>
										</div>
										<div
											className={styles.styled_text_week}
										>
											{overallStats.openInvoiceAmountForPast7DaysPercentage || 0}
											% this week
										</div>
									</div>

								</div>
							</>
						)}
				</div>

				<div className={styles.open_invoices}>
					{outstandingLoading ? <Placeholder style={{ width: '300px', height: '40px' }} />
						: (
							<>
								<div className={styles.account_receivables_open_line}>
									<div>
										{overallStats.dashboardCurrency || 'INR'}
									</div>

									<div
										className={styles.account_receivables_amount}
									>
										<Tooltip content={(
											<div>
												{getFormattedPrice(
													overallStats.onAccountAmount,
													overallStats.dashboardCurrency,
												)}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{getFormattedPrice(
													overallStats.onAccountAmount,
												)}
											</div>

										</Tooltip>

									</div>
								</div>
								<div className={styles.sub_invoices}>
									<div className={styles.styled_text}>
										On Account Payment
									</div>
									<div style={{ display: 'flex' }}>
										<img
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shape.svg"
											alt="Right Icon"
										/>
										<div className={styles.styled_text_week}>
											{overallStats.onAccountAmountForPastSevenDaysPercentage || 0}
											% this week
										</div>
									</div>

								</div>
							</>
						)}
				</div>
			</div>

		</div>

	);
}

export default DateAndAccount;
