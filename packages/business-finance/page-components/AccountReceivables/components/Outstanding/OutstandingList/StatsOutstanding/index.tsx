import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';

import { StatsKeyMapping } from '../../../../constants/index';

import styles from './styles.module.css';

function StatsOutstanding({ item }) {
	const {
		openInvoice = {},
		onAccountPayment = {},
		totalOutstanding = {},
		openInvoiceCount = 0,
		ageingBucket = {},
	} = item || {};

	const customPadding = openInvoice.length > 2 ? '8px 10px' : '10px';

	const { invoiceBucket = [] } = openInvoice;

	const { creditNote = {} } = ageingBucket;

	const getAmount = (key, value) => {
		if (value === 'Amount') return ageingBucket[key]?.ledgerAmount;
		if (value === 'Count') return ageingBucket[key]?.ledgerCount;
		return ageingBucket[key]?.ledgerCurrency;
	};

	const invoiceContainer = [{
		name: 'OPEN INVOICES',
	},
	{
		name: 'ON ACCOUNT PAYMENTS',

	},
	{
		name: 'CREDIT NOTES',

	},

	];
	return (
		<div className={styles.container}>

			<div className={styles.invoices_wrapper}>
				{invoiceContainer.map((invoiceObject) => (
					<div className={styles.invoices_card}>
						<div className={styles.left_container}>
							<div className={styles.styled_heading}>
								{invoiceObject.name}
								{' '}
							</div>
							<div className={styles.amount} style={{ fontWeight: 500, fontSize: '12px' }}>
								{getFormattedPrice(
									openInvoice.ledgerAmount || 0,
									openInvoice.ledgerCurrency,
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
											fontWeight : 500,
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
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className={styles.outstanding_card} style={{ background: '#FEF9FE', padding: customPadding }}>
				<div className={styles.flex_column}>
					<div className={styles.label}>Total Outstanding</div>
					<div
						className={styles.amount}
						style={{
							color      : '#cb6464',
							fontWeight : 500,
							fontSize   : '12px',
						}}
					>
						{getFormattedPrice(
							totalOutstanding.ledgerAmount || 0,
							totalOutstanding.ledgerCurrency,
							{
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						)}
						<div className={styles.count}>
							(
							{totalOutstanding.ledgerCount}
							)
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatsOutstanding;
