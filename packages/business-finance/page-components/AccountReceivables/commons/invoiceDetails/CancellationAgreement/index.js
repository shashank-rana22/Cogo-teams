import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function CancellationAgreement({ data }) {
	const {
		cancelledEInvoiceDetails: {
			cancelledAgreementNumber = '',
			cancelledAgreementDate = '',
			cancelledAgreementDocument = '',
			cancelledEInvoiceForm04 = '',
		},
	} = data || {};

	const dataMap = [
		{
			label : 'Agreement No. -',
			value : cancelledAgreementNumber
				? <span className={styles.span_style_label}>{cancelledAgreementNumber}</span>
				: undefined,
		},
		{
			label : 'Agreement Date -',
			value : cancelledAgreementDate
				? <span className={styles.span_style_label}>{cancelledAgreementDate}</span>
				: undefined,
		},
		{
			label : 'Agreement Proof -',
			value : (cancelledAgreementDocument
				? (
					<Button
						className={styles.span_style_value}
						themeType="link"
						onClick={() => window.open(cancelledAgreementDocument)}
						type="button"
					>
						View Documnet

					</Button>
				) : undefined
			),
		},
		{
			label : 'Form 04 -',
			value : (cancelledEInvoiceForm04
				? (
					<Button
						className={styles.span_style_value}
						themeType="link"
						onClick={() => window.open(cancelledEInvoiceForm04)}
						type="button"
					>
						View Documnet
					</Button>
				) : undefined
			),
		},
	];

	return (
		cancelledEInvoiceForm04
			? (
				<div className={styles.container}>
					{dataMap.map(({ label, value }) => (
						value
							? (
								<div key={label} className={styles.sub_container}>
									{label}
									{value}
								</div>
							)
							: null
					))}
				</div>
			) : null
	);
}

export default CancellationAgreement;
