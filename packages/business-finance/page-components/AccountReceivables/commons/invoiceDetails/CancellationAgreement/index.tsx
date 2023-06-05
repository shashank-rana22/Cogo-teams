import styles from './styles.module.css';

function CancellationAgreement({ data }) {
	console.log(data, 'data');
	const { cancelledEInvoiceDetails } = data || {};

	console.log(cancelledEInvoiceDetails, 'cancellationAgreement');

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				Agreement No. -
				<span style={{ fontWeight: 600 }}>12345</span>
			</div>
			<div className={styles.sub_container}>
				Agreement Date -
				<span style={{ fontWeight: 600 }}>12/4/2023</span>
			</div>
			<div className={styles.sub_container}>
				Agreement Proof -
				<a style={{ fontWeight: 600 }} href="demo">View Documnet</a>
			</div>
			<div className={styles.sub_container}>
				Form 04 -
				<a style={{ fontWeight: 600 }} href="demo">View Domcument</a>
			</div>
		</div>
	);
}

export default CancellationAgreement;
