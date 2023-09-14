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
					<b>
						Total Payable in Words :
						{' '}
						{formValues?.invoice_currency}
						{' '}
						{amountInWords || '-'}
					</b>
				</div>
				<div style={styles.tax}>
					<div>
						<b>
							Total Amount Before Tax: &nbsp; &nbsp;
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
						</b>
					</div>
					<div>
						<b>
							Total Amount After Tax: &nbsp; &nbsp; &nbsp;
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
						</b>
					</div>
				</div>
			</div>
			<div style={{ display: 'flex' }}>
				<div style={styles.remarks}>
					<b>Remarks: &nbsp;</b>
					<div>
						{formValues?.remarks || ''}
					</div>
				</div>
				<div style={styles.signature}>
					<b> Authorised Signatory </b>
				</div>
			</div>
		</div>
	);
}
export default InvoiceLowerContainer;
