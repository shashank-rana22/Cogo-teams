import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import {
	StatsKeyMapping,
	StatsKeyMappingPayment,
} from '../../../../../constants/index.ts';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

function StatsOutstanding({ item = {}, showOutStanding = true }) {
	const {
		openInvoice = {},
		totalOutstanding = {},
		creditNote = {},
		openInvoiceAgeingBucket = {},
		creditNoteAgeingBucket = {},
		onAccount = {},
		onAccountAgeingBucket = {},
		entityCode = '',
	} = item || {};

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	const invoiceContainer = [
		{
			name         : 'OPEN INVOICES',
			LedgerAmount : openInvoice,
			ageingBucket : openInvoiceAgeingBucket,
			statsKey     : StatsKeyMapping,
		},
		{
			name         : 'ON ACCOUNT PAYMENTS',
			LedgerAmount : onAccount,
			ageingBucket : onAccountAgeingBucket,
			statsKey     : StatsKeyMappingPayment,
		},
		{
			name         : 'CREDIT NOTES',
			LedgerAmount : creditNote,
			ageingBucket : creditNoteAgeingBucket,
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
					invoiceContainer.map((invoiceObject) => (
						<div
							className={styles.invoices_card}
							key={invoiceObject.name}
						>
							<div className={styles.left_container}>
								<div className={styles.styled_heading}>
									{invoiceObject.name}
									{' '}
								</div>
								<div className={styles.amount_open}>
									{formatAmount({
										amount:
											invoiceObject.LedgerAmount
												?.ledgerAmount || DEFAULT_AMOUNT,
										currency:
											invoiceObject.LedgerAmount
												?.ledgerCurrency || currency,
										options: {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : DEFAULT_AMOUNT,
										},
									})}
									<div className={styles.count_open}>
										(
										{invoiceObject.LedgerAmount?.ledgerCount}
										)
									</div>
								</div>
							</div>
							<div className={styles.flex}>
								{(invoiceObject.statsKey || []).map((val) => (
									<div key={val.label} className={styles.label}>
										<div className={styles.amount}>
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
					))
				}
				{
					!showOutStanding ? (
						<div className={styles.outstanding}>
							<div className={styles.headings}>Total Outstanding</div>
							<div className={styles.totaloutstanding}>
								{formatAmount({
									amount: totalOutstanding.ledgerAmount || DEFAULT_AMOUNT,
									currency:
										totalOutstanding.ledgerCurrency || currency,
									options: {
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
						style={{ background: '#FEF9FE' }}
					>
						<div className={styles.flex_column}>
							<div className={styles.label_outstanding}>Total Outstanding</div>
							<div className={styles.amountout}>
								{formatAmount({
									amount: totalOutstanding.ledgerAmount || DEFAULT_AMOUNT,
									currency:
										totalOutstanding.ledgerCurrency || currency,
									options: {
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
