import { Tooltip, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function DateAndAccount({ outstandingData, outstandingLoading, entityCode }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

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
													amount   : overallStats?.openInvoicesAmount || 0,
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
													amount   : overallStats?.openInvoicesAmount || 0,
													currency : overallStats?.dashboardCurrency || currency,
													options  : {
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'currency',
														currencyDisplay       : 'code',
														currencyWise          : true,
													},
												})}
											</div>

										</Tooltip>

									</div>
								</div>

								<div className={styles.account_receivables_invoices}>
									<div className={styles.styled_text}>
										{t('account_receivables')}
									</div>
									<div className={styles.invoice_text}>
										<span className={styles.span}>{t('open_invoices')}</span>
										-
										{overallStats?.openInvoicesCount || 0}
										{' | '}
										<span className={styles.span}>{t('customers')}</span>
										-
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
													amount   : overallStats?.onAccountAmount || 0,
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
													amount   : overallStats?.onAccountAmount || 0,
													currency :	overallStats?.dashboardCurrency || currency,
													options  :	{
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'currency',
														currencyDisplay       : 'code',
														currencyWise          : true,
													},
												})}
											</div>

										</Tooltip>

									</div>
								</div>
								<div className={styles.sub_invoices}>
									<div className={styles.styled_text}>
										{t('on_account_payment')}
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
													amount   : overallStats?.totalOutstandingAmount || 0,
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
													amount   : overallStats?.totalOutstandingAmount || 0,
													currency : overallStats?.dashboardCurrency || currency,
													options  : {
														notation              : 'compact',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
														style                 : 'currency',
														currencyDisplay       : 'code',
														currencyWise          : true,
													},
												})}
											</div>

										</Tooltip>

									</div>
								</div>

								<div className={styles.sub_invoices}>
									<div className={styles.styled_text}>
										{t('total_outstanding')}
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
