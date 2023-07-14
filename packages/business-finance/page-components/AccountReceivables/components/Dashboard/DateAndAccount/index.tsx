import { Tooltip, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

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

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	return (
		<div>

			<div className={styles.over_all_data}>
				<div className={styles.account_receivables}>

					{outstandingLoading ? <Placeholder className={styles.placeholder_container} />
						: (
							<>
								<div className={styles.account_receivables_line}>
									<div className={styles.account_receivables_amount}>
										<Tooltip content={(
											<div>
												{formatAmount({
													amount   : overallStats?.openInvoicesAmount as any || 0,
													currency : overallStats?.dashboardCurrency || currency,
													options  : {
														style           : 'currency',
														currencyDisplay : 'code',
													},
												})}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{formatAmount({
													amount   : overallStats?.openInvoicesAmount as any || 0,
													currency : overallStats?.dashboardCurrency || currency,
													options  : {
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'currency',
														currencyDisplay       : 'code',
													},
												})}
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

									<div
										className={styles.account_receivables_amount}
									>
										<Tooltip content={(
											<div>
												{formatAmount({
													amount   : overallStats?.onAccountAmount as any || 0,
													currency : overallStats?.dashboardCurrency || currency,
													options  : {
														style           : 'currency',
														currencyDisplay : 'code',
													},
												})}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{formatAmount({
													amount   : overallStats?.onAccountAmount as any || 0,
													currency :	overallStats?.dashboardCurrency || currency,
													options  :	{
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'currency',
														currencyDisplay       : 'code',

													},
												})}
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

									<div
										className={styles.account_receivables_amount}
									>
										<Tooltip content={(
											<div>
												{formatAmount({
													amount   : overallStats?.totalOutstandingAmount as any || 0,
													currency : overallStats?.dashboardCurrency || currency,
													options  : {
														style           : 'currency',
														currencyDisplay : 'code',
													},
												})}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{formatAmount({
													amount   : overallStats?.totalOutstandingAmount as any || 0,
													currency : overallStats?.dashboardCurrency || currency,
													options  : {
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'currency',
														currencyDisplay       : 'code',

													},
												})}
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
