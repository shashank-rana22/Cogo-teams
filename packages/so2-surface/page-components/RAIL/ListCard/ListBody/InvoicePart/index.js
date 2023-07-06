import styles from './styles.module.css';

function ListInvoicePart({ item = {} }) {
	return (
		<div className={styles.list_invoice_part}>
			<div className={styles.container}>
				<div className={styles.agent_name}>
					Invoice Uploaded :&nbsp;
					<span>{item?.uploaded_invoice_count}</span>
				</div>
				<div className={styles.agent_name}>
					Live Invoice Value :&nbsp;
					<span>{item?.live_invoice_inr_value}</span>
				</div>
				<div className={styles.agent_name}>
					Estimated Buy :&nbsp;
					<span>{item?.net_total_inr_value}</span>
				</div>
			</div>
			<div className={styles.line} />
		</div>
	);
}
export default ListInvoicePart;
