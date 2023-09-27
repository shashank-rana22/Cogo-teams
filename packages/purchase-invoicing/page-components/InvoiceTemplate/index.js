import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, toWords } from '@cogoport/utils';
import { useRef } from 'react';

import useGeneratePdf from '../../hooks/useGeneratePdf';
import useGetImageSource from '../../hooks/useGetImageSource';
import useGetTradeParties from '../../hooks/useGetOrganizationTradeParty';
import InvoiceAmountContainer from '../InvoiceAmountContainer';
import InvoiceDetailsContainer from '../InvoiceDetailsContainer';
import InvoiceHeaderContainer from '../InvoiceHeaderContainer';
import InvoiceLowerContainer from '../InvoiceLowerContainer';

function InvoiceTemplate({
	serviceProvider = {},
	formValues = {},
	billingParty = {},
	bank_details = [],
	shipment_data = {},
	calculatedValues = {},
	lineItemsDataArray = [],
	setDownloadButtonState = () => {},
	setRenderContent = () => {},
}) {
	const { imageSrc = '' } = useGetImageSource();

	const callback = (res) => {
		setDownloadButtonState(res?.data?.pdf_url);
		setRenderContent('form');
	};

	const { generatePdf } = useGeneratePdf();

	const ref = useRef(null);

	const uploadPdf = async () => {
		const html = `<html><body>${ref.current?.innerHTML}</body></html>`;
		await generatePdf({
			html,
			scale: 0.8,
			callback,
		});
	};

	const {
		data: tradePartyData,
	} = useGetTradeParties({ serviceProvider });
	const { list = [] } = tradePartyData || {};

	const serviceProviderTradePartyObj = list?.find((item) => item?.trade_party_type === 'self') || {};

	const serviceProviderAllBillingAddresses = [
		...(serviceProviderTradePartyObj?.billing_addresses || []),
		...(serviceProviderTradePartyObj?.other_addresses || []),
	];

	const billingAddress = serviceProviderAllBillingAddresses?.[GLOBAL_CONSTANTS.zeroth_index] || {};

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
				toWords(calculatedValues.invoice_amount),
			);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<div ref={ref}>
				<InvoiceHeaderContainer
					serviceProviderTradePartyObj={serviceProviderTradePartyObj}
					billingAddress={billingAddress}
					imageSrc={imageSrc}
					formValues={formValues}
				/>
				<InvoiceDetailsContainer
					business_name={business_name}
					address={address}
					city={city}
					pin_code={pin_code}
					country={country}
					cin={cin}
					registration_number={registration_number}
					gst_number={gst_number}
					bank_account_number={bank_account_number}
					ifsc_number={ifsc_number}
					bank_name={bank_name}
					branch_name={branch_name}
					tax_invoice_no={tax_invoice_no}
					shipment_data={shipment_data}
					formValues={formValues}
					split_type={split_type}
					due_date={due_date}
					invoice_date={invoice_date}
				/>

				<InvoiceAmountContainer
					lineItemsDataArray={lineItemsDataArray}
					calculatedValues={calculatedValues}
					formValues={formValues}
				/>

				<InvoiceLowerContainer
					formValues={formValues}
					calculatedValues={calculatedValues}
					amountInWords={amountInWords}
				/>

			</div>
			<div style={{ marginLeft: '36%', marginTop: '40px', display: 'flex' }}>
				<Button
					size="lg"
					onClick={() => {
						setRenderContent('form');
					}}
				>
					Go Back
				</Button>
				<Button
					size="lg"
					style={{ marginLeft: '10px' }}
					onClick={() => {
						uploadPdf();
					}}
				>
					Upload Invoice
				</Button>
			</div>
		</>
	);
}
export default InvoiceTemplate;
