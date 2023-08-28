import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { StatsKeyMapping, StatsKeyMappingOutstanding, StatsKeyMappingPayment } from '../../constants';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

function StatsOutstanding({ item = {}, showOutStanding = true }) {
	const {
		entityCode = '',
	} = item || {};

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	const invoiceContainer = [
		{
			name     : 'OPEN INVOICES',
			statsKey : StatsKeyMapping,
			key      : 'totalOpenInvoiceAmount',
			countKey : 'totalOpenInvoicesCount',
		},
		{
			name     : 'ON ACCOUNT PAYMENTS',
			statsKey : StatsKeyMappingPayment,
			key      : 'totalOnAccountAmount',
			countKey : 'totalOnAccountCount',
		},
		{
			name     : 'OutStanding',
			statsKey : StatsKeyMappingOutstanding,
			key      : 'totalOutstanding',
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
											item?.[invoiceObject?.key],
										currency:
											item?.ledCurrency || currency,
										options: {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : DEFAULT_AMOUNT,
										},
									})}
									{invoiceObject?.countKey ? (
										<div className={styles.count_open}>
											(
											{item?.[invoiceObject?.countKey] || DEFAULT_AMOUNT}
											)
										</div>
									) : null}
								</div>
							</div>
							<div className={styles.flex}>
								{(invoiceObject.statsKey || []).map((val) => (
									<div key={val.label} className={styles.label}>
										<div className={styles.amount}>
											{formatAmount({
												amount:
													item?.[val?.valueKey] || DEFAULT_AMOUNT,
												currency:
													item?.ledCurrency || currency,
												options: {
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : DEFAULT_AMOUNT,
												},
											})}
										</div>
										{val?.countKey ? (
											<div className={styles.count}>
												(
												{item?.[val?.countKey] || DEFAULT_AMOUNT}
												)
											</div>
										) : null}
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
									amount: item?.totalInvoiceAmount || DEFAULT_AMOUNT,
									currency:
										item?.ledCurrency || currency,
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
						style={{ background: '#F9F9F9' }}
					>
						<div className={styles.flex_column}>
							<div className={styles.total}>Total Outstanding</div>
							<div className={styles.amountout}>
								{formatAmount({
									amount: item?.totalInvoiceAmount || DEFAULT_AMOUNT,
									currency:
										item?.ledCurrency || currency,
									options: {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : DEFAULT_AMOUNT,
									},
								})}
							</div>
							<div className={styles.counttotal}>
								Count -
								{' '}
								<span className={styles.counts}>{item?.totalInvoicesCount || DEFAULT_AMOUNT}</span>
							</div>
						</div>
					</div>
				) : null
			}
		</div>
	);
}

export default StatsOutstanding;
