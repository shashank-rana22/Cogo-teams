import { Button } from '@cogoport/components';

import styles from './styles.module.css';

interface DataInterface {
	data?: {
		cancelledEInvoiceDetails?: AggreementFile;
	}
}

interface AggreementFile {
	agreementNumber?: string;
	agreementDate?: string;
	agreementDocument?: string;
	einvoiceForm04?: string;
}

function CancellationAgreement({ data }: DataInterface) {
	const { cancelledEInvoiceDetails } = data || {};

	if (cancelledEInvoiceDetails === undefined) {
		return (
			<div>Cancellation Aggreement Does Not Exist</div>
		);
	}

	const {
		agreementNumber = '',
		agreementDate = '',
		agreementDocument = '',
		einvoiceForm04 = '',
	} = cancelledEInvoiceDetails || {};

	const dynamicDataVariables = [
		{ label: 'Agreement No. -', value: agreementNumber },
		{ label: 'Agreement Date -', value: agreementDate },
	];

	const dynamicDataUrl = [
		{ label: 'Agreement Proof -', value: agreementDocument },
		{ label: 'Form 04 -', value: einvoiceForm04 },
	];

	return (
		<div className={styles.container}>
			{dynamicDataVariables.map(({ label, value }) => (
				<div key={label} className={styles.sub_container}>
					{label}
					<span className={styles.span_style_label}>{value}</span>
				</div>
			))}
			{dynamicDataUrl.map(({ label, value }) => (
				<div key={label} className={styles.sub_container}>
					{label}
					{ value
						&& (
							<Button
								className={styles.span_style_value}
								themeType="link"
								onClick={() => window.open(value)}
							>
								View Documnet
							</Button>
						) }
				</div>
			))}
		</div>
	);
}

export default CancellationAgreement;
