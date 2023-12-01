import styles from './styles.module.css';

function TermsAndConditions() {
	return (
		<div className={styles.container}>
			<li>
				Adding Cargo Insurance doesn’t confirm the policy.
			</li>
			<li>
				Confirmation necessitates pre-payment and customer document submission.
			</li>
			<li>
				The payment link will be sent after our CCS agent collects required customer documents.
			</li>
			<li>
				CCS Desk initiates the process only after the shipment is confirmed by the service provider.
			</li>
			<li>
				Payment should be completed by the customer at
				least one day before the cargo is dispatch from the warehouse.
			</li>
		</div>
	);
}

export default TermsAndConditions;
