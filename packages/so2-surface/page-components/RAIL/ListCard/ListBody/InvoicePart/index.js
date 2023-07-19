import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function ListInvoicePart({ item = {} }) {
	const {
		uploaded_invoice_count = '',
		live_invoice_value = '',
		net_total_value = '',
		currency = '',
	} = item;

	return (
		<div className={styles.list_invoice_part}>
			<div className={styles.container}>
				<div className={styles.agent_name}>
					Invoice Uploaded :
					{' '}
					<span>{uploaded_invoice_count}</span>
				</div>
				<div className={styles.agent_name}>
					Live Invoice Value :
					{' '}
					<span className={styles.live_invoice_value}>
						{formatAmount({
							amount  : live_invoice_value,
							currency,
							options : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>
				<div className={styles.agent_name}>
					Estimated Buy :
					{' '}
					<span className={styles.live_invoice_value}>
						{formatAmount({
							amount  : net_total_value,
							currency,
							options : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>
			</div>
			<div className={styles.line} />
		</div>
	);
}
export default ListInvoicePart;
