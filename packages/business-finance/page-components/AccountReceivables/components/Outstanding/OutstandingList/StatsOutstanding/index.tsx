import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';

import { StatsKeyMapping } from '../../../../constants/index';

import styles from './styles.module.css';

function StatsOutstanding({ item }) {
	const {
		openInvoice = [],
		onAccountPayment = [],
		totalOutstanding = [],
		openInvoiceCount = 0,
		openInvoiceLedgerAmount = 0,
		onAccountPaymentInvoiceLedgerAmount = 0,
		onAccountPaymentInvoiceCount = 0,
		totalOutstandingInvoiceLedgerAmount = 0,
		totalOutstandingInvoiceCount = 0,
		totalCreditNoteAmount = 0,
		creditNoteCount = 0,
	} = item || {};

	const customPadding = openInvoice.length > 2 ? '8px 10px' : '10px';

	const getAmount = (key, value = 'Amount') => item[`${key}${value}`];

	return (
		<div className={styles.Container}>
			<div className={styles.invoices_wrapper}>
				<div className={styles.invoices_card}>
					<div className={styles.left_container}>
						<div className={styles.styled_heading}>
							OPEN INVOICES
							{' '}
							<Tooltip
								theme="light"
								content={(
									<div className={styles.info_content}>
										<div className={styles.heading}>Open Invoices</div>
										<div className={styles.HR} />
										<div style={{ marginTop: '5px' }}>
											{/* {openInvoice?.map((invoice) => (
												<div
													className={styles.amount}
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
													<div className={styles.count}>
														(
														{invoice?.invoiceCount}
														)
													</div>
												</div>
											))} */}
										</div>
									</div>
								)}
								placement="right"
							>
								<div className={styles.icon}>
									<IcMInfo />
								</div>
							</Tooltip>
						</div>
						<div className={styles.amount} style={{ fontWeight: 500, fontSize: '12px' }}>
							{getFormattedPrice(
								openInvoiceLedgerAmount || 0,
								'INR',
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							<div className={styles.count}>
								(
								{openInvoiceCount}
								)
							</div>
						</div>
						<div className={styles.cn}>
							<div className={styles.styled_heading}>
								Credit Notes
							</div>
							<div className={styles.amount} style={{ fontWeight: 500, fontSize: '12px' }}>
								{getFormattedPrice(
									totalCreditNoteAmount || 0,
									'INR',
									{
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								)}
								<div className={styles.count}>
									(
									{creditNoteCount}
									)
								</div>
							</div>
						</div>
					</div>
					<div className={styles.right_container}>
						{(StatsKeyMapping || []).map((val) => (
							<div className={styles.due_ageing}>
								<div className={styles.label}>
									{val.label}
									<div className={styles.count}>
										(
										{getAmount(val.valueKey, 'Count') || 0}
										)
									</div>
								</div>
								<div
									className={styles.amount}
									style={{
										color      : val.textColor,
										fontWeight : 600,
										fontSize   : '12px',
									}}
								>
									{getFormattedPrice(
										getAmount(val.valueKey) || 0,
										'INR',
										{
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 0,
										},
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.outstanding_card} style={{ background: '#FEF9FE', padding: customPadding }}>
				<div className={styles.flex_column}>
					<div className={styles.label}>Total Outstanding</div>
					<div
						className={styles.amount}
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
						<div className={styles.count}>
							(
							{totalOutstandingInvoiceCount}
							)
						</div>
					</div>
					<div style={{ marginTop: '5px' }}>
						{/* {totalOutstanding?.map((outstanding) => (
							<div
								className={styles.amount}
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
								<div className={styles.count}>
									(
									{outstanding?.invoiceCount}
									)
								</div>
							</div>
						))} */}
					</div>
				</div>
			</div>
			<div className={styles.outstanding_card} style={{ background: '#f9fef9', padding: customPadding }}>
				<div className={styles.flex_column}>
					<div className={styles.label}>ON ACCOUNTS PAYMENTS</div>
					<div
						className={styles.amount}
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
						<div className={styles.count}>
							(
							{onAccountPaymentInvoiceCount}
							)
						</div>
					</div>
					<div style={{ marginTop: '5px' }}>
						{/* {onAccountPayment.map((onAccount) => (
							<div
								className={styles.amount}
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
								<div className={styles.count}>
									(
									{onAccount?.invoiceCount}
									)
								</div>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatsOutstanding;
