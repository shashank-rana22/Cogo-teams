import styles from './styles.module.css';

interface DataInterface {
	data: {
		cancelledEInvoiceDetails: AggreementFile;
	}
}

interface AggreementFile {
	agreementNumber: string;
	agreementDate: string;
	agreementDocument: string;
	eInvoiceForm04: string;
}

function CancellationAgreement({ data }: DataInterface) {
	const { cancelledEInvoiceDetails } = data || {};

	const { agreementNumber, agreementDate, agreementDocument, eInvoiceForm04 } = cancelledEInvoiceDetails || {};

	const dynamicDataVariables = [
		{ label: 'Agreement No. - ', value: agreementNumber },
		{ label: 'Agreement Date -', value: agreementDate },
	];

	const dynamicDataUrl = [
		{ label: 'Agreement Proof -', value: agreementDocument },
		{ label: 'Form 04 -', value: eInvoiceForm04 },
	];

	if (cancelledEInvoiceDetails === undefined) {
		return (
			<div>Cancellation Aggreement Does Not Exist</div>
		);
	}

	return (
		<div className={styles.container}>
			{dynamicDataVariables.map(({ label, value }) => (
				<div key={label} className={styles.sub_container}>
					{label}
					<span className={styles.span_style}>{value}</span>
				</div>
			))}
			{dynamicDataUrl.map(({ label, value }) => (
				<div key={label} className={styles.sub_container}>
					{label}
					<a className={styles.span_style} href={value}>View Documnet</a>
				</div>
			))}
		</div>
	);
}

export default CancellationAgreement;
