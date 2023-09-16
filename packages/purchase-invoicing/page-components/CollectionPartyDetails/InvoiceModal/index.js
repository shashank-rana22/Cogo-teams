import { Modal } from '@cogoport/components';
import { useState } from 'react';

import InvoiceTemplate from '../../InvoiceTemplate';
import InvoiceModalContent from '../InvoiceModalContent';

function InvoiceModal({
	generateInvoiceModal = false,
	setGenerateInvoiceModal = () => {},
	control = {},
	primary_service,
	collectionParty = {},
	invoiceCurrency = '',
	listEntities = {},
	entitiesLoading = false,
	watch = {},
	setValue = {},
	setCodes = () => {},
	cpParams = {},
	handleModifiedOptions = () => {},
	collectionPartyState = {},
	setCollectionPartyState = () => {},
	collectionPartyAddress = {},
	collectionPartyAddresses = {},
	setCollectionPartyAddress = () => {},
	COLLECTION_PARTY_BANK_OPTIONS = [],
	calculatedValues = {},
	renderContent = '',
	setRenderContent = () => {},
	formValues = {},
	bank_details = [],
	shipment_data = {},
	lineItemsDataArray = [],
	fields = {},
}) {
	const MODAL_TITLE = renderContent === 'form' ? 'Generate Invoice' : null;
	const [errors, setErrors] = useState({});
	const [errMszs, setErrMszs] = useState({});
	const [billingParty, setBillingParty] = useState({});
	const [downloadButtonState, setDownloadButtonState] = useState('');
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
							COLLECTION_PARTY_BANK_OPTIONS={COLLECTION_PARTY_BANK_OPTIONS}
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
