/* eslint-disable max-lines-per-function */
import { Modal } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetTradeParties from '../../hooks/useGetOrganizationTradeParty';
import { invoiceColumns } from '../../utils/invoiceColumns';

import styles from './styles';

const IMAGE_URL = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogoport2.png';

function InvoiceTemplate({
	serviceProvider = {},
	showTemplate = false,
	setShowTemplate = () => {},
	formValues = {},
	billingParty = {},
	collectionPartyState = {},
	// collectionPartyAddress = {},
	bank_details = [],
	shipment_data = {},

}) {
	const {
		// loading: loadingGetTradeParty,
		data: tradePartyData,
		getSelfTradeParty,
	} = useGetTradeParties({ serviceProvider });
	const { list = [] } = tradePartyData || {};

	const ZERO = 0;

	useEffect(() => {
		getSelfTradeParty();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showTemplate]);

	const serviceProviderTradePartyObj = list?.find((item) => item?.trade_party_type === 'self') || {};
	console.log('serviceProviderTradePartyObj:', billingParty);

	const serviceProviderAllBillingAddresses = [
		...(serviceProviderTradePartyObj?.billing_addresses || []),
		...(serviceProviderTradePartyObj?.other_addresses || []),
	];

	const billingAddress = serviceProviderAllBillingAddresses?.[ZERO] || {};

	const {
		business_name = '',
		cin = '',
		registration_number = '',
	} = billingParty;

	const billingPartyBillingAddress = (billingParty.addresses || []).find(
		(addr) => addr.gst_number === formValues.billing_party_address,
	);

	const {
		address = '',
		city = {},
		pin_code = '',
		country = {},
		gst_number = '',
	} = billingPartyBillingAddress || [];

	const collectionPartyBankDetails = (
		bank_details || []
	).find(
		(singleItem) => singleItem?.data?.bank_account_number
			=== collectionPartyState?.selectedAccNo,
	);

	console.log('collectionPartyState', collectionPartyState);

	const { data = {} } = collectionPartyBankDetails || [];

	const {
		bank_account_number = '',
		ifsc_number = '',
		bank_name = '',
		branch_name = '',
	} = data || {};

	const {
		tax_invoice_no = '',
		invoice_date = '',
		due_date = '',
		split_type = '',
	} = formValues;

	return (
		<Modal
			show={showTemplate}
			size="fullscreen"
			placement="center"
			onClose={() => { setShowTemplate(false); }}
		>
			<Modal.Header />
			<Modal.Body style={{ maxHeight: '780px' }}>
				<div style={styles.first_container}>
					<div style={styles.customer_info}>
						<b>{serviceProviderTradePartyObj?.business_name}</b>
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
							<b>Purchase</b>
						</div>
						<img src={IMAGE_URL} alt="Cogoport" height="40px" />
					</div>
				</div>

				<div style={styles.second_container}>
					<div style={styles.billing_party_details}>
						<div style={{ textAlign: 'center' }}>
							<b>Ship To Customer</b>
						</div>
						<div style={{ fontSize: '15px', padding: '12px 0 0 6px' }}>
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
						<div style={{ fontSize: '15px', padding: '12px 0 0 6px' }}>
							<b>COGOPORT PRIVATE LIMITED</b>
							<div>
								{address}
								,
								{' '}
								{city?.name}
								{' '}
								-
								{' '}
								{pin_code}
								,
								{' '}
								{country?.name}
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
						<div style={{ fontSize: '15px', padding: '12px 0 0 6px' }}>
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
						<div style={{ fontSize: '15px', padding: '12px 0 0 6px' }}>
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

				<div style={styles.third_container}>
					<div>
						<div style={styles.column_headings}>
							{invoiceColumns.map((item) => (
								<div style={styles.item_label} key={item.key}>
									{item.label}
								</div>
							))}
						</div>
					</div>
					<div>hello</div>
					<div>hello</div>
				</div>

				<div style={styles.fourth_container}>
					<div style={{ display: 'flex' }}>
						<div style={styles.amount}>
							<b>
								Total Payable in Words :
								{' '}
								{formValues?.invoice_currency}
								{' '}
								{/* {amountInWords || '-'} */}
								-
							</b>
						</div>
						<div style={styles.tax}>
							<div>
								<b>
									Total Amount Before Tax: &nbsp; &nbsp;
									{' '}
									{formatAmount({
										// amount   : calculatedValues.sub_total_amount || 0,
										amount   : 0,
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
										// amount   : calculatedValues.invoice_amount || 0,
										amount   : 0,
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
			</Modal.Body>
		</Modal>

	);
}
export default InvoiceTemplate;
