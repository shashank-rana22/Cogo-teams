/* eslint-disable max-lines-per-function */
import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
// eslint-disable-next-line import/no-unresolved
import converter from 'number-to-words';
import { useEffect, useRef, useState } from 'react';

import useGeneratePdf from '../../hooks/useGeneratePdf';
import useGetTradeParties from '../../hooks/useGetOrganizationTradeParty';
import { invoiceColumns } from '../../utils/invoiceColumns';

import styles from './styles';

const ZERO = 0;

function InvoiceTemplate({
	serviceProvider = {},
	showTemplate = false,
	setShowTemplate = () => {},
	formValues = {},
	billingParty = {},
	// collectionPartyState = {},
	// collectionPartyAddress = {},
	bank_details = [],
	shipment_data = {},
	// fields = {},
	calculatedValues = {},
	lineItemsDataArray = [],
	setGenerateInvoiceModal = () => {},
	downloadButtonState = '',
	setDownloadButtonState = () => {},
}) {
	console.log('fields', calculatedValues);

	const fetchImageData = async ({ url = '', setterFunc }) => {
		try {
			const response = await fetch(url);
			const blobData = await response.blob();
			const reader = new FileReader();
			reader.readAsDataURL(blobData);
			reader.onloadend = () => {
				const base64data = reader.result;
				setterFunc(base64data);
			};
		} catch (err) {
			console.log(err?.data);
		}
	};
	const [imageSrc, setImageSrc] = useState('');

	const { generatePdf } = useGeneratePdf();

	const ref = useRef(null);

	const uploadPdf = async () => {
		const html = `<html><body>${ref.current?.innerHTML}</body></html>`;
		await generatePdf({
			html,
			scale: 0.8,
			setShowTemplate,
			setGenerateInvoiceModal,
			setDownloadButtonState,
		});
	};
	console.log('downloadButtonState:', downloadButtonState);

	const {
		// loading: loadingGetTradeParty,
		data: tradePartyData,
		getSelfTradeParty,
	} = useGetTradeParties({ serviceProvider });
	const { list = [] } = tradePartyData || {};

	console.log('formValuesyahahai', formValues);

	useEffect(() => {
		fetchImageData({ url: GLOBAL_CONSTANTS.image_url.cogo_logo, setterFunc: setImageSrc });
	}, []);

	// const [codes, setCodes] = useState({});

	// console.log('hellocodes', codes, 'formValues', formValues);

	// const handleCodeChange = (obj) => {
	// 	setCodes({ ...codes, [obj?.code]: obj });
	// };

	// const handleOptionsChange = (options) => {
	// 	const HASHED_OPTIONS = {};
	// 	options.forEach((option) => {
	// 		HASHED_OPTIONS[option?.code] = option;
	// 	});
	// 	setCodes({ ...codes, ...HASHED_OPTIONS });
	// };

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
			=== formValues?.collection_party_bank_details,
	);

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

	let amountInWords = '';
	if (calculatedValues.invoice_amount) {
		try {
			amountInWords = startCase(
				converter.toWords(calculatedValues.invoice_amount),
			);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Modal
			show={showTemplate}
			size="fullscreen"
			placement="center"
			onClose={() => { setShowTemplate(false); }}
		>
			<Modal.Header />
			<Modal.Body style={{ maxHeight: '780px' }}>
				<div ref={ref}>
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
								<b>{formValues.invoice_type}</b>
							</div>
							<img src={imageSrc} alt="Cogoport" height="40px" />
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
					{console.log('formValuesdahsbcafdcb', formValues)}

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
						<div>
							{lineItemsDataArray.map((singleItem) => (
								<div
									style={styles.line_items_array}
									key={singleItem?.serial_number}
								>
									{invoiceColumns.map((item) => (
										<div
											style={{
												border    : '1px solid black',
												width     : '100%',
												textAlign : 'center',
											}}
											key={item.key}
										>
											{singleItem[item.key] || '-'}

											{console.log('kyahaalhaibhaike', item.key, singleItem[item.key])}
										</div>
									))}
								</div>
							))}
						</div>
						{console.log(lineItemsDataArray, invoiceColumns, 'herbjfsendj')}
						<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
							<div style={styles.total_amount}>
								<div style={{ width: '50%', border: '0.5px solid black' }}>
									<b>
										{formatAmount({
											amount   : calculatedValues.total_tax_amount || ZERO,
											currency : formValues?.invoice_currency,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}
									</b>
								</div>
								<div style={{ width: '50%', border: '0.5px solid black' }}>
									<b>
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
							</div>
						</div>
					</div>

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
				</div>
				<div style={{ marginLeft: '36%', marginTop: '40px', display: 'flex' }}>
					<Button
						size="lg"
						onClick={() => {
							setShowTemplate(false);
							setGenerateInvoiceModal(true);
						}}
					>
						Go Back
					</Button>
					<Button
						size="lg"
						style={{ marginLeft: '10px' }}
						onClick={() => {
							uploadPdf();
							// setShowTemplate(false);
							// setGenerateInvoiceModal(true);
						}}
					>
						Upload Invoice
					</Button>
				</div>
			</Modal.Body>
		</Modal>

	);
}
export default InvoiceTemplate;
