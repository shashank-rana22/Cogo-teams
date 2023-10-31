import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	SelectController,
	RadioGroupController,
	InputController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import AdditionalDetails from '../../InvoiceFormLayout/AdditionalDetails';
import BillingPartyDetails from '../../InvoiceFormLayout/BillingPartyDetails';
import PurchaseInvoiceDates from '../../InvoiceFormLayout/PurchaseInvoiceDates';
import getFormControls from '../CollectionPartyCard/controls';
import LineItemDetails from '../LineItemDetails';

import styles from './styles.module.css';

const INVOICE_TYPE_OPTIONS = [
	{ name: 'purchase_invoice', label: 'Purchase Invoice', value: 'Purchase' },
	{ name: 'proforma_invoice', label: 'Proforma Invoice', value: 'Proforma' },
	{ name: 'credit_note', label: 'Credit Note', value: 'Credit' },
];

function IndexModalContent({
	control = {},
	primary_service = {},
	collectionParty = {},
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
	collectionPartyBankOptions = [],
	calculatedValues = {},
	downloadButtonState = '',
	setRenderContent = () => {},
}) {
	const [errors, setErrors] = useState({});
	const [errMszs, setErrMszs] = useState({});

	const formControls = useMemo(() => getFormControls({
		setValue,
		cpParams,
		handleModifiedOptions,
		collectionParty    : collectionPartyState,
		setCollectionParty : setCollectionPartyState,
		collectionPartyAddress,
		collectionPartyAddresses,
		setCollectionPartyAddress,
		collectionPartyBankOptions,
	}), [setValue, cpParams, handleModifiedOptions,
		collectionPartyState, setCollectionPartyState,
		collectionPartyAddress, collectionPartyAddresses,
		setCollectionPartyAddress, collectionPartyBankOptions]);

	const handleDownload = () => {
		if (downloadButtonState) {
			window.open(downloadButtonState, '_blank');
		}
	};

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
				{(formControls || []).map((item) => {
					const ele = { ...item };
					return (
						<div key={ele.name} className={styles.controller}>
							<div style={{ marginLeft: '20px' }}>{ele.label}</div>
							{ele.name === 'collection_party' ? (
								<AsyncSelectController
									{...ele}
									key={ele.name}
									control={control}
								/>
							) : (
								<SelectController
									{...ele}
									label={ele.label}
									key={ele.name}
									control={control}
								/>
							)}
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
									onClick={handleDownload}
								>
									Download
								</Button>
							)
						}
			</div>
		</>
	);
}
export default IndexModalContent;
