import styles from './styles.module.css';

function Details({ text = '', isBody = false }) {
	if (!isBody) {
		return <div className={styles.section}>{text}</div>;
	}
	return (
		<div className={styles.section}>
			<div>Hi Zubin Khanna,</div>

			<div>
				A new expense approval request has been placed for your response. Please find attached
				the invoice for the same.
			</div>
			<div>
				<div>Vendor Name:</div>
				<div>Category:</div>
				<div>Expense date:</div>
				<div>Payable Amount:</div>
				<div>Requested By:</div>
			</div>

			<div>
				<div>Thank you,</div>
				<div>Cogoport Finance Team</div>
				<div>(finance@cogoport.com)</div>
				<div>Note: This is an automatically generated email, please do not reply</div>
			</div>
		</div>
	);
}

export default Details;
