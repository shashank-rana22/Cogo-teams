import { Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCalculateTotalPrice from '../../../helpers/useCalculateTotalPrice';
import useGetEntities from '../../../hooks/useGetEntities';
import { getCollectionPartyDetails } from
	'../../InvoiceFormLayout/CollectionPartyDetails/utils/getCollectionPartyDetails';
import InvoiceTemplate from '../../InvoiceTemplate';
import InvoiceModalContent from '../InvoiceModalContent';

const ZERO = 0;
const ONE = 1;

function InvoiceModal({
	generateInvoiceModal = false,
	setGenerateInvoiceModal = () => {},
	primary_service,
	collectionParty = {},
	shipment_data = {},
}) {
	const [renderContent, setRenderContent] = useState('form');
	const MODAL_TITLE = renderContent === 'form' ? 'Generate Invoice' : null;
	const [errors, setErrors] = useState({});
	const [errMszs, setErrMszs] = useState({});
	const [billingParty, setBillingParty] = useState({});
	const [downloadButtonState, setDownloadButtonState] = useState('');

	const [collectionPartyState, setCollectionPartyState] = useState({});
	const [collectionPartyAddress, setCollectionPartyAddress] = useState({});
	const [codes, setCodes] = useState({});

	const { fields, control, watch, setValue } = useForm();

	const formValues = watch();

	const bank_details = (collectionPartyState?.documents || []).filter(
		(item) => item?.document_type === 'bank_account_details',
	);
	const getCollectionPartyParams = (organization_id = '') => ({
		documents_data_required         : true,
		other_addresses_data_required   : true,
		poc_data_required               : true,
		billing_addresses_data_required : true,
		filters                         : {
			organization_id,
			trade_party_type: ['collection_party', 'self'],
		},
	});
	const { handleModifiedOptions = () => {} } = getCollectionPartyDetails();
	const cpParams = getCollectionPartyParams(collectionParty?.service_provider_id);
	const COLLECTION_PARTY_BANK_OPTIONS = [];

	(bank_details || []).forEach((bank) => {
		if (
			['pending', 'verified'].includes(bank?.verification_status)
			&& bank?.status === 'active'
		) {
			COLLECTION_PARTY_BANK_OPTIONS.push({
				...bank,
				label : bank?.data?.bank_name,
				value : bank?.data?.bank_account_number,
			});
		}
	});
	const {
		billing_addresses: billingAddresses = [],
		other_addresses: otherAddresses = [],
	} = collectionPartyState || {};

	const allAddresses = [...billingAddresses, ...otherAddresses];

	const collectionPartyAddresses = (allAddresses || []).map((address) => ({
		...address,
		label : `${address?.address} / ${address?.tax_number}`,
		value : address?.id,
	}));

	const calculatedValues = useCalculateTotalPrice({
		baseCurrency : formValues?.invoice_currency,
		lineItems    : formValues?.line_items,
		chargeCodes  : codes,
	});

	const lineItemsDataArray = (calculatedValues.newItems || []).map(
		(item, index) => {
			const codeData = codes[item?.code] || {};
			return {
				serial_number       : index + ONE,
				code                : item?.code,
				product_description : codeData?.actualname,
				sac                 : codeData?.sac_code,
				currency            : item?.currency,
				quantity            : item?.quantity,
				exchange_rate       : item?.exchange_rate,
				tax_type            : 'T',
				tax_percent         : `${codeData?.tax_percent}%`,
				taxable_amount      : Number(item?.tax_amt || ZERO),
				total               : Number(item?.cost || ZERO),
				truck_number        : formValues?.truck_number,
			};
		},
	);
	const { listEntities, entitiesLoading } = useGetEntities();

	const invoiceCurrency = formValues?.invoice_currency;

	return (
		<Modal
			size="fullscreen"
			show={generateInvoiceModal}
			placement="left"
			onClose={() => {
				setGenerateInvoiceModal(false);
			}}
		>
			<Modal.Header title={MODAL_TITLE} />
			<Modal.Body style={{ maxHeight: '780px' }}>
				{
					renderContent === 'form' && (
						<InvoiceModalContent
							generateInvoiceModal={generateInvoiceModal}
							control={control}
							primary_service={primary_service}
							collectionParty={collectionParty}
							errors={errors}
							setErrors={setErrors}
							errMszs={errMszs}
							setErrMszs={setErrMszs}
							invoiceCurrency={invoiceCurrency}
							listEntities={listEntities}
							entitiesLoading={entitiesLoading}
							billingParty={billingParty}
							setBillingParty={setBillingParty}
							watch={watch}
							setValue={setValue}
							setCodes={setCodes}
							cpParams={cpParams}
							handleModifiedOptions={handleModifiedOptions}
							collectionPartyState={collectionPartyState}
							setCollectionPartyState={setCollectionPartyState}
							collectionPartyAddress={collectionPartyAddress}
							setCollectionPartyAddress={setCollectionPartyAddress}
							collectionPartyAddresses={collectionPartyAddresses}
							collectionPartyBankOptions={COLLECTION_PARTY_BANK_OPTIONS}
							calculatedValues={calculatedValues}
							downloadButtonState={downloadButtonState}
							setRenderContent={setRenderContent}
						/>
					)
				}
				{
					renderContent === 'template' && (
						<InvoiceTemplate
							serviceProvider={collectionParty}
							formValues={formValues}
							billingParty={billingParty}
							collectionPartyAddress={collectionPartyAddress}
							collectionPartyState={collectionPartyState}
							bank_details={bank_details}
							shipment_data={shipment_data}
							fields={fields}
							calculatedValues={calculatedValues}
							lineItemsDataArray={lineItemsDataArray}
							setDownloadButtonState={setDownloadButtonState}
							downloadButtonState={downloadButtonState}
							setRenderContent={setRenderContent}
						/>
					)
				}

			</Modal.Body>
		</Modal>
	);
}
export default InvoiceModal;
