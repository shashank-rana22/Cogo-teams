import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';

import { StatsKeyMapping } from '../../../../constants/index';

import styles from './styles.module.css';

function StatsOutstanding({ item }) {
	const {
		openInvoice = {},
		onAccountPayment = [],
		totalOutstanding = [],
		openInvoiceCount = 0,
		onAccountPaymentInvoiceLedgerAmount = 0,
		onAccountPaymentInvoiceCount = 0,
		totalOutstandingInvoiceLedgerAmount = 0,
		totalOutstandingInvoiceCount = 0,
		totalCreditNoteAmount = 0,
		creditNoteCount = 0,
		ageingBucket = {},
	} = item || {};

	const customPadding = openInvoice.length > 2 ? '8px 10px' : '10px';

	const { invoiceBucket = [] } = openInvoice;

	const { creditNote = {} } = ageingBucket;

	const getAmount = (key, value) => {
		if (value === 'Amount') return ageingBucket[key].ledgerAmount;
		if (value === 'Count') return ageingBucket[key].ledgerCount;
		return ageingBucket[key].ledgerCurrency;
	};
	return (
		<div className={styles.Container}>
			<div className={styles.InvoicesWrapper}>
				<div className={styles.InvoicesCard}>
					<div className={styles.LeftContainer}>
						<div className={styles.StyledHeading}>
							OPEN INVOICES
							{' '}
							<Tooltip
								theme="light"
								content={(
									<div className={styles.InfoContent}>
										<div className={styles.Heading}>Open Invoices</div>
										<div className={styles.HR} />
										<div style={{ marginTop: '5px' }}>
											{openInvoice?.invoiceBucket.map((invoice) => (
												<div
													className={styles.Amount}
													style={{ fontWeight: 600, fontSize: '11px' }}
												>
													{getFormattedPrice(
														invoice?.amount || 0,
														invoice?.currency,
														{
															style                 : 'currency',
															currencyDisplay       : 'code',
															maximumFractionDigits : 0,
														},
													)}
													<div className={styles.Count}>
														(
														{invoice?.invoiceCount}
														)
													</div>
												</div>
											))}
										</div>
									</div>
								)}
								placement="right"
							>
								<div className={styles.Icon}>
									<IcMInfo />
								</div>
							</Tooltip>
						</div>
						<div className={styles.Amount} style={{ fontWeight: 500, fontSize: '12px' }}>
							{getFormattedPrice(
								openInvoice.ledgerAmount || 0,
								openInvoice.ledgerCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							<div className={styles.Count}>
								(
								{openInvoiceCount}
								)
							</div>
						</div>
						<div style={{ marginTop: '5px' }}>
							{invoiceBucket.map((openInvoiceAmount) => (
								<div>
									{openInvoiceAmount.amount !== 0

									&& (
										<div
											className={styles.Amount}
											style={{ color: '#cb6464', fontWeight: 600, fontSize: '11px' }}
										>
											{getFormattedPrice(
												openInvoiceAmount?.amount || 0,
												openInvoiceAmount?.currency,
												{
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 0,
												},
											)}
											<div className={styles.Count}>
												(
												{openInvoiceAmount?.invoiceCount}
												)
											</div>
										</div>
									)}
								</div>
							))}
						</div>
						<div className={styles.CN}>
							<div className={styles.StyledHeading}>
								Credit Notes
							</div>
							<div className={styles.Amount} style={{ fontWeight: 500, fontSize: '12px' }}>
								{getFormattedPrice(
									creditNote.ledgerAmount || 0,
									creditNote.ledgerCurrency,
									{
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								)}
								<div className={styles.Count}>
									(
									{creditNote.ledgerCount}
									)
								</div>
							</div>
						</div>
						<div style={{ marginTop: '5px' }}>
							{creditNote?.invoiceBucket.map((CreditNoteAmount) => (

								<div>

									{CreditNoteAmount.amount !== 0

										&& 											(
											<div
												className={styles.Amount}
												style={{ color: '#cb6464', fontWeight: 600, fontSize: '11px' }}
											>
												{getFormattedPrice(
													CreditNoteAmount?.amount || 0,
													CreditNoteAmount?.currency,
													{
														style                 : 'currency',
														currencyDisplay       : 'code',
														maximumFractionDigits : 0,
													},
												)}
												<div className={styles.Count}>
													(
													{CreditNoteAmount?.invoiceCount}
													)
												</div>
											</div>
										)}
								</div>

							))}
						</div>
					</div>
					<div className={styles.RightContainer}>
						{(StatsKeyMapping || []).map((val) => (
							<div className={styles.DueAgeing}>
								<div className={styles.Label}>
									{val.label}
									<div className={styles.Count}>
										(
										{getAmount(val.valueKey, 'Count') || 0}
										)
									</div>
								</div>
								<div
									className={styles.Amount}
									style={{
										color      : val.textColor,
										fontWeight : 600,
										fontSize   : '12px',
									}}
								>
									{getFormattedPrice(
										getAmount(val.valueKey, 'Amount') || 0,
										getAmount(val.valueKey, 'Currency'),
										{
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 0,
										},
									)}
								</div>
								<div style={{ marginTop: '5px' }}>
									{ageingBucket[val.valueKey]?.invoiceBucket.map((CreditNoteAmount) => (

										<div>

											{CreditNoteAmount.amount !== 0

										&& 											(
											<div
												className={styles.Amount}
												style={{ color: '#cb6464', fontWeight: 600, fontSize: '11px' }}
											>
												{getFormattedPrice(
													CreditNoteAmount?.amount || 0,
													CreditNoteAmount?.currency,
													{
														style                 : 'currency',
														currencyDisplay       : 'code',
														maximumFractionDigits : 0,
													},
												)}
												<div className={styles.Count}>
													(
													{CreditNoteAmount?.invoiceCount}
													)
												</div>
											</div>
										)}
										</div>

									))}
								</div>

							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.OutstandingCard} style={{ background: '#FEF9FE', padding: customPadding }}>
				<div className={styles.FlexColumn}>
					<div className={styles.Label}>Total Outstanding</div>
					<div
						className={styles.Amount}
						style={{
							color      : '#cb6464',
							fontWeight : '600',
							fontSize   : '12px',
						}}
					>
						{getFormattedPrice(
							totalOutstandingInvoiceLedgerAmount || 0,
							'INR',
							{
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						)}
						<div className={styles.Count}>
							(
							{totalOutstandingInvoiceCount}
							)
						</div>
					</div>
					<div style={{ marginTop: '5px' }}>
						{totalOutstanding?.invoiceBucket?.map((outstanding) => (
							<div
								className={styles.Amount}
								style={{ color: '#cb6464', fontWeight: 600, fontSize: '11px' }}
							>
								{getFormattedPrice(
									outstanding?.amount || 0,
									outstanding?.currency,
									{
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								)}
								<div className={styles.Count}>
									(
									{outstanding?.invoiceCount}
									)
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.OutstandingCard} style={{ background: '#f9fef9', padding: customPadding }}>
				<div className={styles.FlexColumn}>
					<div className={styles.Label}>ON ACCOUNTS PAYMENTS</div>
					<div
						className={styles.Amount}
						style={{
							color      : 'rgb(103, 198, 118)',
							fontWeight : '600',
							fontSize   : '12px',
						}}
					>
						{getFormattedPrice(
							onAccountPaymentInvoiceLedgerAmount || 0,
							'INR',
							{
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						)}
						<div className={styles.Count}>
							(
							{onAccountPaymentInvoiceCount}
							)
						</div>
					</div>
					<div style={{ marginTop: '5px' }}>
						{onAccountPayment?.invoiceBucket.map((onAccount) => (
							<div
								className={styles.Amount}
								style={{
									color      : 'rgb(103, 198, 118)',
									fontWeight : '600',
									fontSize   : '11px',
								}}
							>
								{getFormattedPrice(
									onAccount?.amount || 0,
									onAccount?.currency,
									{
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								)}
								<div className={styles.Count}>
									(
									{onAccount?.invoiceCount}
									)
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatsOutstanding;
