import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { StatsKeyMapping } from '../../constants/statsKeyMap';
import { StatsKeyMappingPayment } from '../../constants/statsKeyPayment';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

const getAmount = ({ amount, currency }) => formatAmount({
	amount:
		amount || DEFAULT_AMOUNT,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : DEFAULT_AMOUNT,
	},
});

const invoiceContainer = [
	{
		name     : 'Open Invoices',
		statsKey : StatsKeyMapping,
		key      : 'totalOpenInvoiceAmount',
		countKey : 'totalOpenInvoiceCount',
	},
	{
		name     : 'On Account Payments',
		statsKey : StatsKeyMappingPayment,
		key      : 'totalOpenOnAccountAmount',
		countKey : 'totalOpenOnAccountCount',
	},
];

function StatsOutstanding({ item = {}, source = '' }) {
	const { entityCode = '' } = item || {};

	const { currency = '' } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	return (
		<div className={styles.container} style={{ padding: source ? '12px 16px' : '0px' }}>
			<div className={styles.invoices_wrapper}>
				<div className={styles.flexdiv}>
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
							style={{ background: source ? '#fff' : '#f9fbfe' }}
						>
							<div className={styles.left_container}>
								<div className={styles.styled_heading}>
									{invoiceObject.name}
									{' '}
								</div>
								<div className={invoiceObject.key === 'totalOpenOnAccountAmount'
									? cl`${styles.amount} ${styles.positive}` : styles.amount}
								>
									{getAmount({
										amount:
											item?.[invoiceObject?.key],
										currency:
											item?.ledCurrency || currency,
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
										<div className={invoiceObject.key === 'totalOpenOnAccountAmount'
											? styles.positive : styles.amount}
										>
											{getAmount({
												amount:
													item?.[val?.valueKey],
												currency:
													item?.ledCurrency || currency,
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
			</div>
			<div
				className={styles.outstanding_card}
				style={{ background: source ? '#fff' : '#f9fbfe' }}
			>
				<div>
					<div>
						<div className={styles.total}>Total Outstanding</div>
						<div className={cl`${styles.amount} ${styles.marginleft}
						${item?.totalOutstanding >= DEFAULT_AMOUNT
							? styles.positive : styles.amount}`}
						>
							{getAmount({
								amount:
									item?.totalOutstanding,
								currency:
									item?.ledCurrency || currency,
							})}
						</div>
					</div>
					<div className={styles.padding_total}>
						<div className={styles.financial}>
							Closing Balance
							<span className={styles.year}>(FY22-23)</span>
						</div>
						<div className={cl`${styles.amount} ${styles.marginleft}
						${item?.closingOutstandingAmountAtFirstApril >= DEFAULT_AMOUNT
							? styles.positive : styles.amount}`}
						>
							{getAmount({
								amount:
									item?.closingOutstandingAmountAtFirstApril,
								currency:
									item?.ledCurrency || currency,
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatsOutstanding;
