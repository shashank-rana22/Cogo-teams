import { Tooltip, Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

import { keyValue } from '../../../constants';

import styles from './styles.module.css';

interface OverallStats {
	customersCount?: number,
	dashboardCurrency?: string,
	onAccountAmount?: number,
	onAccountAmountForPastSevenDaysPercentage?: number,
	openInvoiceAmountForPastSevenDaysPercentage?: number,
	openInvoicesAmount?: number,
	openInvoicesCount?: number,
	totalOutstandingAmount?: number
}

interface OutsatndingProps {
	outstandingServiceWise?: object,
	overallStats?: OverallStats,
}

interface DateAndAccountProps {
	outstandingData?: OutsatndingProps,
	outstandingLoading?: boolean,
	entityCode?: string,
}

function DateAndAccount({ outstandingData, outstandingLoading, entityCode }: DateAndAccountProps) {
	const {
		overallStats = {},
	} = outstandingData || {};

	return (
		<div>

			<div className={styles.over_all_data}>
				<div className={styles.account_receivables}>

					{outstandingLoading ? <Placeholder className={styles.placeholder_container} />
						: (
							<>
								<div className={styles.account_receivables_line}>
									<div className={styles.dashboard_currency}>
										{overallStats?.dashboardCurrency || keyValue[entityCode]}
									</div>
									<div className={styles.account_receivables_amount}>
										<Tooltip content={(
											<div>
												{getFormattedPrice(
													overallStats?.openInvoicesAmount || 0,
													overallStats?.dashboardCurrency || keyValue[entityCode],

												)}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{getFormattedPrice(
													overallStats?.openInvoicesAmount || 0,
													overallStats?.dashboardCurrency || keyValue[entityCode],
													{
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'decimal',
													},
												)}
											</div>

										</Tooltip>

									</div>
								</div>

								<div className={styles.account_receivables_invoices}>
									<div className={styles.styled_text}>
										Account Receivables
									</div>
									<div
										className={styles.invoice_text}
									>
										Open Invoices -
										{overallStats?.openInvoicesCount || 0}
										{' | '}
										Customers -
										{overallStats?.customersCount || 0}
									</div>

								</div>

							</>
						)}
				</div>

				<div className={styles.open_invoices}>
					{outstandingLoading ? <Placeholder className={styles.placeholder_container} />
						: (
							<>
								<div className={styles.account_receivables_open_line}>
									<div className={styles.dashboard_currency}>
										{overallStats?.dashboardCurrency || keyValue[entityCode]}
									</div>

									<div
										className={styles.account_receivables_amount}
									>
										<Tooltip content={(
											<div>
												{getFormattedPrice(
													overallStats?.onAccountAmount || 0,
													overallStats?.dashboardCurrency || keyValue[entityCode],
												)}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{getFormattedPrice(
													overallStats?.onAccountAmount || 0,
													overallStats?.dashboardCurrency || keyValue[entityCode],
													{
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'decimal',
													},
												)}
											</div>

										</Tooltip>

									</div>
								</div>
								<div className={styles.sub_invoices}>
									<div className={styles.styled_text}>
										On Account Payment
									</div>
								</div>
							</>
						)}
				</div>

				<div className={styles.open_invoices}>

					{outstandingLoading ? <Placeholder className={styles.placeholder_container} />
						: (
							<>
								<div className={styles.account_receivables_open_line}>
									<div className={styles.dashboard_currency}>
										{overallStats?.dashboardCurrency || keyValue[entityCode]}
									</div>

									<div
										className={styles.account_receivables_amount}
									>
										<Tooltip content={(
											<div>
												{getFormattedPrice(
													overallStats?.totalOutstandingAmount || 0,
													overallStats?.dashboardCurrency || keyValue[entityCode],
												)}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{getFormattedPrice(
													overallStats?.totalOutstandingAmount || 0,
													overallStats?.dashboardCurrency || keyValue[entityCode],
													{
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'decimal',
													},
												)}
											</div>

										</Tooltip>

									</div>
								</div>

								<div className={styles.sub_invoices}>
									<div className={styles.styled_text}>
										Total Outstanding
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
