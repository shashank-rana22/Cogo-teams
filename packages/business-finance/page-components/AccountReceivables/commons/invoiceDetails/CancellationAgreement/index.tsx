import styles from './styles.module.css';

function CancellationAgreement({ data }) {
	const { cancelledEInvoiceDetails } = data || {};

	if (cancelledEInvoiceDetails === undefined) {
		return (
			<div>Cancellation Aggreement Does Not Exist</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				Agreement No. -
				<span className={styles.span_style}>{cancelledEInvoiceDetails?.agreementNumber}</span>
			</div>
			<div className={styles.sub_container}>
				Agreement Date -
				<span className={styles.span_style}>{cancelledEInvoiceDetails?.agreementDate}</span>
			</div>
			<div className={styles.sub_container}>
				Agreement Proof -
				<a className={styles.span_style} href={cancelledEInvoiceDetails?.agreementDocument}>
					View Documnet
				</a>
			</div>
			<div className={styles.sub_container}>
				Form 04 -
				<a className={styles.span_style} href={cancelledEInvoiceDetails?.eInvoiceForm04}>View Document</a>
			</div>
		</div>
	);
}

export default CancellationAgreement;
