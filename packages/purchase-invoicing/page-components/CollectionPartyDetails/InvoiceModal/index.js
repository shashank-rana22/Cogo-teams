import { Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useMemo } from 'react';

import useCalculateTotalPrice from '../../../helpers/useCalculateTotalPrice';
import useGetEntities from '../../../hooks/useGetEntities';
import { getCollectionPartyDetails } from
	'../../InvoiceFormLayout/CollectionPartyDetails/utils/getCollectionPartyDetails';
import InvoiceTemplate from '../../InvoiceTemplate';
import InvoiceModalContent from '../InvoiceModalContent';

const DEFAULT_AMOUNT_TAXABLE = 0;
const DEFAULT_AMOUNT_TOTAL = 0;
const SERIAL_INCREMENT = 1;

const STATUS_ARRAY = ['pending', 'verified'];

function InvoiceModal({
	generateInvoiceModal = false,
	setGenerateInvoiceModal = () => {},
	primary_service = {},
	collectionParty = {},
	shipment_data = {},
}) {
	const [renderContent, setRenderContent] = useState('form');
	const MODAL_TITLE = renderContent === 'form' ? 'Generate Invoice' : '';

	const [billingParty, setBillingParty] = useState({});
	const [downloadButtonState, setDownloadButtonState] = useState('');

	const [collectionPartyState, setCollectionPartyState] = useState({});
	const [collectionPartyAddress, setCollectionPartyAddress] = useState({});
	const [chargeCodes, setChargeCodes] = useState({});

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
	const COLLECTION_PARTY_BANK_OPTIONS = useMemo(() => (
		bank_details || []).reduce((collectionPartyBankOptions, bank) => {
		if (
			STATUS_ARRAY.includes(bank?.verification_status)
					&& bank?.status === 'active'
		) {
			collectionPartyBankOptions.push({
				...bank,
				label : bank?.data?.bank_name,
				value : bank?.data?.bank_account_number,
			});
		}
		return collectionPartyBankOptions;
	}, []), [bank_details]);

	const {
		billing_addresses: billingAddresses = [],
		other_addresses: otherAddresses = [],
	} = collectionPartyState || {};

	const allAddresses = useMemo(() => [...billingAddresses, ...otherAddresses], [billingAddresses, otherAddresses]);

	const collectionPartyAddresses = (allAddresses || []).map((address) => ({
		...(address || {}),
		label : `${address?.address} / ${address?.tax_number}`,
		value : address?.id,
	}));

	const calculatedValues = useCalculateTotalPrice({
		baseCurrency : formValues?.invoice_currency,
		lineItems    : formValues?.line_items,
		chargeCodes,
	});

	const lineItemsDataArray = useMemo(
		() => (calculatedValues.newItems || []).map(
			(item, index) => {
				const codeData = chargeCodes[item?.code] || {};
				return {
					serial_number       : index + SERIAL_INCREMENT,
					truck_number        : item?.truck_number,
					code                : item?.code,
					product_description : codeData?.actualname,
					sac                 : codeData?.sac_code,
					currency            : item?.currency,
					quantity            : item?.quantity,
					exchange_rate       : item?.exchange_rate,
					tax_type            : 'T',
					tax_percent         : `${codeData?.tax_percent}%`,
					taxable_amount      : Number(item?.tax_amt || DEFAULT_AMOUNT_TAXABLE),
					total               : Number(item?.cost || DEFAULT_AMOUNT_TOTAL),
				};
			},
		),
		[calculatedValues.newItems, chargeCodes],
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
					renderContent === 'form' ? (
						<InvoiceModalContent
							generateInvoiceModal={generateInvoiceModal}
							control={control}
							primary_service={primary_service}
							collectionParty={collectionParty}
							invoiceCurrency={invoiceCurrency}
							listEntities={listEntities}
							entitiesLoading={entitiesLoading}
							billingParty={billingParty}
							setBillingParty={setBillingParty}
							watch={watch}
							setValue={setValue}
							setCodes={setChargeCodes}
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
					) : (
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
