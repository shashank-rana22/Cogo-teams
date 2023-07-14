import styles from './styles.module.css';

function ListInvoicePart({ item = {} }) {
	const {
		uploaded_invoice_count = '',
		live_invoice_inr_value = '',
		net_total_inr_value = '',
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
					<span>{live_invoice_inr_value}</span>
				</div>
				<div className={styles.agent_name}>
					Estimated Buy :
					{' '}
					<span>{net_total_inr_value}</span>
				</div>
			</div>
			<div className={styles.line} />
		</div>
	);
}
export default ListInvoicePart;
