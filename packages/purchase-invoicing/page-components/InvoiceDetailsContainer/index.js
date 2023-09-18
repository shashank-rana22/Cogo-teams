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
					<b>Ship To Customer</b>
				</div>
				<div style={styles.block}>
					<b>{business_name}</b>
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
					<b>Bill To Customer</b>
				</div>
				<div style={styles.block}>
					<b>COGOPORT PRIVATE LIMITED</b>
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
					<b>Bank Details</b>
				</div>
				<div style={styles.block}>
					<div>
						<b>Account No. :</b>
						{' '}
						{bank_account_number}
					</div>
					<div>
						<b>IFSC Number :</b>
						{' '}
						{ifsc_number}
					</div>
					<div>
						<b>Bank Name :</b>
						{' '}
						{bank_name}
					</div>
					<div>
						<b>Branch Name :</b>
						{branch_name}
					</div>
				</div>
			</div>
			<div style={styles.invoice_details}>
				<div style={styles.block}>
					<div>
						<b>Invoice No : </b>
						{tax_invoice_no}
					</div>
					<div>
						<b>Invoice Date : </b>
						{formatDate({
							date       : invoice_date,
							formatType : 'dateTime',
							separator  : ', ',
						})}
					</div>
					<div>
						<b>Due Date : </b>
						{formatDate({
							date       : due_date,
							formatType : 'dateTime',
							separator  : ', ',
						})}
					</div>
					<div>
						<b>Shipment Id : </b>
						{shipment_data?.serial_id}
					</div>
					<div>
						<b>Place Of Supply : </b>
						{formValues?.place_of_supply}
					</div>
					{split_type && (
						<div>
							<b>Split type : </b>
							{startCase(split_type)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default InvoiceDetailsContainer;
