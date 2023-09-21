import styles from './styles';

function InvoiceHeaderContainer({
	serviceProviderTradePartyObj = {},
	billingAddress = {},
	imageSrc = '',
	formValues = {},
}) {
	return (
		<div style={styles.header_container}>
			<div style={styles.customer_info}>
				<strong>{serviceProviderTradePartyObj?.business_name}</strong>
				<div style={{ paddingTop: '5px' }}>
					<div>
						{billingAddress?.address}
						,
						{' '}
						{billingAddress?.pincode}
					</div>
					<div>{serviceProviderTradePartyObj?.country?.name}</div>
					<div>
						PAN No :
						{' '}
						{serviceProviderTradePartyObj?.registration_number}
					</div>
					<div>
						GST No :
						{' '}
						{billingAddress?.tax_number}
					</div>
				</div>
			</div>
			<div style={styles.invoice_type}>
				<div style={styles.proforma}>
					<strong>{formValues.invoice_type}</strong>
				</div>
				<img src={imageSrc} alt="Cogoport" height="40px" />
			</div>
		</div>
	);
}
export default InvoiceHeaderContainer;
