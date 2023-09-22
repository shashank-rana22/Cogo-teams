import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles';

function InvoiceDetailsContainer({
	business_name = '',
	address = '',
	city = {},
	pin_code = '',
	country = {},
	cin = '',
	registration_number = '',
	gst_number = '',
	bank_account_number = '',
	ifsc_number = '',
	bank_name = '',
	branch_name = '',
	tax_invoice_no = '',
	shipment_data = {},
	formValues = {},
	split_type = '',
	due_date = '',
	invoice_date = '',
}) {
	return (
		<div style={styles.details_container}>
			<div style={styles.billing_party_details}>
				<div style={{ textAlign: 'center' }}>
					<strong>Ship To Customer</strong>
				</div>
				<div style={styles.block}>
					<strong>{business_name}</strong>
					<div style={{ paddingTop: '5px' }}>
						<div>{address}</div>
						<div>
							{city?.name}
							{' '}
							-
							{' '}
							{pin_code}
						</div>
						<div>{country?.name}</div>
						<div>
							CIN No :
							{' '}
							{cin}
						</div>
						<div>
							PAN No :
							{' '}
							{registration_number}
						</div>
						<div>
							GST No:
							{' '}
							{gst_number}
						</div>
					</div>
				</div>
			</div>
			<div style={styles.billing_party_address}>
				<div style={{ textAlign: 'center' }}>
					<strong>Bill To Customer</strong>
				</div>
				<div style={styles.block}>
					<strong>COGOPORT PRIVATE LIMITED</strong>
					<div>
						{`${address} , ${city?.name} - ${pin_code} , ${country.name}`}
					</div>
					<div>
						CIN No :
						{' '}
						{cin}
					</div>
					<div>
						PAN No :
						{' '}
						{registration_number}
					</div>
					<div>
						GST No :
						{' '}
						{gst_number}
					</div>
				</div>
			</div>
			<div style={styles.bank_details}>
				<div style={{ textAlign: 'center' }}>
					<strong>Bank Details</strong>
				</div>
				<div style={styles.block}>
					<div>
						<strong>Account No. :</strong>
						{' '}
						{bank_account_number}
					</div>
					<div>
						<strong>IFSC Number :</strong>
						{' '}
						{ifsc_number}
					</div>
					<div>
						<strong>Bank Name :</strong>
						{' '}
						{bank_name}
					</div>
					<div>
						<strong>Branch Name :</strong>
						{branch_name}
					</div>
				</div>
			</div>
			<div style={styles.invoice_details}>
				<div style={styles.block}>
					<div>
						<strong>Invoice No : </strong>
						{tax_invoice_no}
					</div>
					<div>
						<strong>Invoice Date : </strong>
						{formatDate({
							date       : invoice_date,
							formatType : 'dateTime',
							separator  : ', ',
						})}
					</div>
					<div>
						<strong>Due Date : </strong>
						{formatDate({
							date       : due_date,
							formatType : 'dateTime',
							separator  : ', ',
						})}
					</div>
					<div>
						<strong>Shipment Id : </strong>
						{shipment_data?.serial_id}
					</div>
					<div>
						<strong>Place Of Supply : </strong>
						{formValues?.place_of_supply}
					</div>
					{split_type && (
						<div>
							<strong>Split type : </strong>
							{startCase(split_type)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default InvoiceDetailsContainer;
