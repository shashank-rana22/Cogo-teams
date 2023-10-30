import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import {
	StatsKeyMapping,
	StatsKeyMappingPayment,
} from '../../../../../constants/index';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;
const INVOICE_TYPE_LIST = ['ON ACCOUNT PAYMENTS',
	'CREDIT NOTES'];

function StatsOutstanding({ item = {}, showOutStanding = true }) {
	const {
		totalOutstanding = 0,
		creditNoteAmount = 0,
		openInvoiceAgeingBucket = {},
		creditNoteAgeingBucket = {},
		onAccount = 0,
		onAccountAgeingBucket = {},
		entityCode = '',
		openInvoiceAmount = 0,
		openInvoiceCount = 0,
		onAccountCount = 0,
		creditNoteCount = 0,
	} = item || {};

	const { currency = '' } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	const invoiceContainer = [
		{
			name         : 'OPEN INVOICES',
			LedgerAmount : openInvoiceAmount,
			ledgerCount  : openInvoiceCount,
			ageingBucket : openInvoiceAgeingBucket,
			statsKey     : StatsKeyMapping,
		},
		{
			name         : 'ON ACCOUNT PAYMENTS',
			LedgerAmount : onAccount,
			ageingBucket : onAccountAgeingBucket,
			ledgerCount  : onAccountCount,
			statsKey     : StatsKeyMappingPayment,
		},
		{
			name         : 'CREDIT NOTES',
			LedgerAmount : creditNoteAmount,
			ageingBucket : creditNoteAgeingBucket,
			ledgerCount  : creditNoteCount,
			statsKey     : StatsKeyMapping,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.invoices_wrapper}>
				<div className={styles.flex}>
					<div className={styles.empty_container} />
					{StatsKeyMapping.map((stats) => (
						<div key={stats.label} className={styles.label}>
							{stats?.label || ''}
						</div>
					))}
				</div>
				{
					invoiceContainer.map((invoiceObject) => {
						const invoiceType = INVOICE_TYPE_LIST.includes(invoiceObject?.name);
						return (
							<div
								className={styles.invoices_card}
								key={invoiceObject.name}
							>
								<div className={styles.left_container}>
									<div className={styles.styled_heading}>
										{invoiceObject.name}
										{' '}
									</div>
									<div className={invoiceType
									&& invoiceObject?.LedgerAmount <= DEFAULT_AMOUNT
										? styles.amount_open : styles.amount_close}
									>
										{formatAmount({
											amount:
												invoiceObject?.LedgerAmount || DEFAULT_AMOUNT,
											currency,
											options: {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : DEFAULT_AMOUNT,
											},
										})}
										<div className={styles.count_open}>
											(
											{invoiceObject?.ledgerCount}
											)
										</div>
									</div>
								</div>
								<div className={styles.flex}>
									{(invoiceObject.statsKey || []).map((val) => (
										<div key={val.label} className={styles.label}>
											<div className={cl`${invoiceType
											&& invoiceObject.ageingBucket[val.valueKey]?.ledgerAmount
											<= DEFAULT_AMOUNT ? styles.account : styles.amount}`}
											>
												{formatAmount({
													amount:
														invoiceObject.ageingBucket[
															val.valueKey
														]?.ledgerAmount || DEFAULT_AMOUNT,
													currency:
														invoiceObject.ageingBucket[
															val.valueKey
														]?.ledgerCurrency || currency,
													options: {
														style                 : 'currency',
														currencyDisplay       : 'code',
														maximumFractionDigits : DEFAULT_AMOUNT,
													},
												})}
											</div>
											<div className={styles.count}>
												(
												{invoiceObject.ageingBucket[
													val.valueKey
												]?.ledgerCount || DEFAULT_AMOUNT}
												)
											</div>
										</div>
									))}
								</div>
							</div>
						);
					})
				}
				{
					!showOutStanding ? (
						<div className={styles.outstanding}>
							<div className={styles.headings}>Total Outstanding</div>
							<div className={cl`${totalOutstanding
							> DEFAULT_AMOUNT ? styles.totaloutstanding : styles.negative_totaloutstanding} 
							${styles.common_totaloutstanding}`}
							>
								{formatAmount({
									amount  : totalOutstanding || DEFAULT_AMOUNT,
									currency,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : DEFAULT_AMOUNT,
									},
								})}

							</div>
						</div>
					) : null
				}
			</div>
			{
				showOutStanding ? (
					<div
						className={styles.outstanding_card}
						style={{ background: '#F9FBFE' }}
					>
						<div className={styles.flex_column}>
							<div className={styles.label_outstanding}>Total Outstanding</div>
							<div className={cl`${totalOutstanding
							> DEFAULT_AMOUNT ? styles.amountout
								: styles.negative_amountout} ${styles.common_amountout}`}
							>
								{formatAmount({
									amount  : totalOutstanding || DEFAULT_AMOUNT,
									currency,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : DEFAULT_AMOUNT,
									},
								})}
							</div>
						</div>
					</div>
				) : null
			}
		</div>
	);
}

export default StatsOutstanding;
