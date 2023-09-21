import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles';

const ZERO = 0;

function InvoiceLowerContainer({
	formValues = {},
	amountInWords = '',
	calculatedValues = {},
}) {
	return (
		<div style={styles.fourth_container}>
			<div style={{ display: 'flex' }}>
				<div style={styles.amount}>
					<strong>
						Total Payable in Words :
						{' '}
						{formValues?.invoice_currency}
						{' '}
						{amountInWords || '-'}
					</strong>
				</div>
				<div style={styles.tax}>
					<div>
						<strong>
							Total Amount Before Tax:
							{' '}
							{formatAmount({
								amount   : calculatedValues.sub_total_amount || ZERO,
								currency : formValues?.invoice_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</strong>
					</div>
					<div>
						<strong>
							Total Amount After Tax:
							{' '}
							{formatAmount({
								amount   : calculatedValues.invoice_amount || ZERO,
								currency : formValues?.invoice_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</strong>
					</div>
				</div>
			</div>
			<div style={{ display: 'flex' }}>
				<div style={styles.remarks}>
					<strong>
						Remarks:
						{' '}

					</strong>
					<div>
						{formValues?.remarks || ''}
					</div>
				</div>
				<div style={styles.signature}>
					<strong> Authorised Signatory </strong>
				</div>
			</div>
		</div>
	);
}
export default InvoiceLowerContainer;
