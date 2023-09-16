import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	SelectController,
	RadioGroupController,
	InputController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import AdditionalDetails from '../../InvoiceFormLayout/AdditionalDetails';
import BillingPartyDetails from '../../InvoiceFormLayout/BillingPartyDetails';
import PurchaseInvoiceDates from '../../InvoiceFormLayout/PurchaseInvoiceDates';
import getFormControls from '../CollectionPartyCard/controls';
import LineItemDetails from '../LineItemDetails';

import styles from './styles.module.css';

const INVOICE_TYPE_OPTIONS = [
	{ name: 'purchase_invoice', label: 'Purchase Invoice', value: 'Purchase' },
	{ name: 'proforma_invoice', label: 'Proforma Invoice', value: 'Proforma' },
];

function IndexModalContent({
	control = {},
	primary_service,
	collectionParty = {},
	errors = {},
	setErrors = () => {},
	errMszs = () => {},
	setErrMszs = () => {},
	invoiceCurrency = '',
	listEntities = {},
	entitiesLoading = false,
	billingParty = {},
	setBillingParty = () => {},
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
	downloadButtonState = '',
	setRenderContent = () => {},
}) {
	return (
		<>
			<RadioGroupController
				control={control}
				name="invoice_type"
				options={INVOICE_TYPE_OPTIONS}
			/>
			<AdditionalDetails
				control={control}
				open
				primary_service={primary_service}
				serviceProvider={collectionParty}
				errors={errors}
				setErrors={setErrors}
				errMszs={errMszs}
				setErrMszs={setErrMszs}
			/>
			<PurchaseInvoiceDates control={control} invoiceCurrency={invoiceCurrency} />
			<BillingPartyDetails
				control={control}
				open
				listEntities={listEntities}
				entitiesLoading={entitiesLoading}
				billingParty={billingParty}
				setBillingParty={setBillingParty}
				setValue={setValue}
				watch={watch}
			/>
			<h3 style={{ margin: '10px' }}>Collection Party Details</h3>
			<div className={styles.collection_party}>
				{(getFormControls({
					setValue,
					cpParams,
					handleModifiedOptions,
					collectionParty    : collectionPartyState,
					setCollectionParty : setCollectionPartyState,
					collectionPartyAddress,
					collectionPartyAddresses,
					setCollectionPartyAddress,
					COLLECTION_PARTY_BANK_OPTIONS,
				}) || []).map((item) => {
					const ele = { ...item };
					if (ele.name === 'collection_party') {
						return (
							<div key={ele.name} className={styles.controller}>
								<div style={{ marginLeft: '20px' }}>{ele.label}</div>
								<AsyncSelectController
									{...ele}
									key={ele.name}
									control={control}
								/>
							</div>
						);
					}
					return (
						<div key={ele.name} className={styles.controller}>
							<div style={{ marginLeft: '20px' }}>{ele.label}</div>
							<SelectController
								{...ele}
								label={ele.label}
								key={ele.name}
								control={control}
							/>
						</div>
					);
				})}
				<div className={styles.controller} style={{ margin: '20px' }}>
					<div style={{ marginLeft: '20px' }}>
						Remarks:
						{' '}
					</div>
					<div className={styles.input_controller}>
						<InputController name="remarks" control={control} />
					</div>
				</div>

			</div>

			<LineItemDetails
				control={control}
				open
				watch={watch}
				serviceProvider={collectionParty}
				setCodes={setCodes}
				calculatedValues={calculatedValues}
			/>
			<div style={{ display: 'flex' }}>
				<Button
					size="md"
					className={styles.generate_button}
					onClick={() => {
						setRenderContent('template');
					}}
				>
					Generate
				</Button>
				{
							!isEmpty(downloadButtonState) && (
								<Button
									size="lg"
									themeType="linkUi"
									className={styles.download_button}
								>
									<a
										href={downloadButtonState}
										target="_blank"
										rel="noopener noreferrer"
										download
									>
										Download

									</a>
								</Button>
							)
						}
			</div>
		</>
	);
}
export default IndexModalContent;
