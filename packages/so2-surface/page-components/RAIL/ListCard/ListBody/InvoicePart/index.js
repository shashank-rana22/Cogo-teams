import styles from './styles.module.css';

function ListInvoicePart({ item = {} }) {
	console.log({ item });
	// const {} = item;

	return (
		<div className={styles.list_invoice_part}>
			<div className={styles.container}>
				<div className={styles.agent_name}>
					Invoice Uploaded :
					{}
				</div>
				<div className={styles.agent_name}>
					Live Invoice Value :
					{}
				</div>
				<div className={styles.agent_name}>
					Estimated By :
					{}
				</div>
			</div>
			<div className={styles.line} />
		</div>
	);
}
export default ListInvoicePart;
