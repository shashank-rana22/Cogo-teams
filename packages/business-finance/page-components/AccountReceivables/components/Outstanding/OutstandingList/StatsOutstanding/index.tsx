import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { StatsKeyMapping, StatsKeyMappingPayment } from '../../../../constants/index';

import styles from './styles.module.css';

function StatsOutstanding({ item }) {
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

	const invoiceContainer = [{
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
				{invoiceContainer.map((invoiceObject) => (
					<div key={invoiceObject.name} className={styles.invoices_card}>
						<div className={styles.left_container}>
							<div className={styles.styled_heading}>
								{invoiceObject.name}
								{' '}
							</div>
							<div className={styles.amount_open}>
								{formatAmount({
									amount   : invoiceObject.LedgerAmount?.ledgerAmount || 0,
									currency : invoiceObject.LedgerAmount?.ledgerCurrency || currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
								<div className={styles.count}>
									(
									{invoiceObject.LedgerAmount?.ledgerCount}
									)
								</div>
							</div>
						</div>
						<div className={styles.right_container}>
							{(invoiceObject.statsKey || []).map((val) => (
								<div key={val.label}>
									<div className={styles.label}>
										{val.label}
										<div className={styles.count}>
											(
											{invoiceObject.ageingBucket[val.valueKey]?.ledgerCount || 0}
											)
										</div>
									</div>
									<div
										className={styles.amount}
									>
										{formatAmount({
											amount   : invoiceObject.ageingBucket[val.valueKey]?.ledgerAmount || 0,
											currency : invoiceObject.ageingBucket[val.valueKey]?.ledgerCurrency
																	|| currency,
											options: {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 0,
											},
										})}
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className={styles.outstanding_card} style={{ background: '#FEF9FE' }}>
				<div className={styles.flex_column}>
					<div className={styles.label}>Total Outstanding</div>
					<div
						className={styles.amount}
					>
						{formatAmount({
							amount   : totalOutstanding.ledgerAmount || 0,
							currency : totalOutstanding.ledgerCurrency || currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatsOutstanding;
