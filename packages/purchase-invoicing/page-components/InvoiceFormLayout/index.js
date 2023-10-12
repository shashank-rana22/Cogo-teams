/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm, RadioGroupController, SelectController, CheckboxController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useContext, useImperativeHandle, forwardRef, useState } from 'react';

import AccordianView from '../../common/Accordianview';
import {
	EMPTY_LINE_ITEMS,
	INVOICE_TYPE_OPTIONS,
	INVOICE_TYPE_OPTIONS_CN,
	OPTIONSCN,
	URGENCY_TAG_OPTIONS,
} from '../../constants';
import useCalculateTotalPrice from '../../helpers/useCalculateTotalPrice';
import useResetErrors from '../../helpers/useResetErrors';
import useGetEntities from '../../hooks/useGetEntities';

import AdditionalDetails from './AdditionalDetails';
import BankForm from './BankForm';
import BillingPartyDetails from './BillingPartyDetails';
import CollectionPartyDetails from './CollectionPartyDetails';
import CollectionPartyForm from './CollectionPartyForm';
import LineItemDetails from './LineItemDetails';
import PurchaseInvoiceDates from './PurchaseInvoiceDates';
import Segmented from './Segmented';
import styles from './styles.module.css';
import Taggings from './Taggings';

const IS_SAME = 1;

function InvoiceFormLayout({
	uploadInvoiceUrl = '',
	serviceProvider = {},
	errors = {},
	setErrors = () => {},
	setBillingParty = () => {},
	billingParty = {},
	errMszs = {},
	collectionParty = {},
	setCollectionParty = () => {},
	purchaseInvoiceValues = {},
	billId = '',
	editData = {},
}, ref) {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);
	const [codes, setCodes] = useState(purchaseInvoiceValues?.codes || {});

	const [showTaggings, setShowTaggings] = useState(false);
	const [billCatogory, setBillCatogory] = useState('purchase');
	const [selectedProforma, setSelectedProforma] = useState([]);
	const [showCollectionParty, setShowCollectionParty] = useState(false);
	const [showBankform, setShowBankForm] = useState(false);

	const isJobClosed = shipment_data?.is_job_closed;
	const { billing_addresses: billingAddresses = [], other_addresses: otherAddresses = [] } = collectionParty || {};
	const allAddresses = [...billingAddresses, ...otherAddresses];
	const isEdit = !isEmpty(billId);
	const editable = !isEmpty(editData);
	const collectionPartyAddresses = (allAddresses || []).map((address) => ({
		...address,
		label : `${address?.address} / ${address?.tax_number}`,
		value : address?.id,
	}));

	const { listEntities, entitiesLoading } = useGetEntities();

	const defaultLineItems = purchaseInvoiceValues?.line_items?.map((item) => ({
		...item,
		rate    : item?.price,
		tax_amt : item?.tax_price || GLOBAL_CONSTANTS.zeroth_index,
		cost    : item?.tax_total_price,
	}));

	const { control, watch, setValue, handleSubmit, formState: { errors: errorVal } } = useForm({
		defaultValues: {
			invoice_type  : isJobClosed ? 'credit_note' : 'purchase_invoice',
			exchange_rate : purchaseInvoiceValues?.exchange_rate || [
				{ from_currency: 'INR', to_currency: 'INR', rate: '1' },
			],
			line_items   : isEmpty(defaultLineItems) ? [EMPTY_LINE_ITEMS] : defaultLineItems,
			advance_bill : null,
		},
	});

	const formValues = watch();

	const invoiceCurrency = formValues?.invoice_currency;

	const initialValueBP = listEntities?.list?.find(
		(item) => item?.registration_number
			=== (purchaseInvoiceValues?.billing_party),
	);

	const urgencyTagOptions = shipment_data?.shipment_type === 'air_freight'
		? [...URGENCY_TAG_OPTIONS, { label: 'THC', value: 'thc' }] : URGENCY_TAG_OPTIONS;

	useEffect(() => {
		if (initialValueBP && Object.keys(billingParty || {}).length === GLOBAL_CONSTANTS.zeroth_index) {
			setBillingParty({
				...initialValueBP,
				billing_party_address:
					purchaseInvoiceValues?.billing_party_address,
			});
		}
	}, [listEntities?.list?.length]);

	useEffect(() => {
		if (formValues?.invoice_currency) {
			const declaredExcRate = formValues?.exchange_rate?.map((item) => {
				const isSame = item?.from_currency === formValues?.invoice_currency;

				return {
					...item,
					to_currency : formValues?.invoice_currency,
					rate        : isSame ? IS_SAME : item?.rate,
				};
			});
			setValue('exchange_rate', declaredExcRate);
		}
	}, [formValues?.invoice_currency, formValues?.exchange_rate?.length]);

	useEffect(() => {
		formValues?.line_items?.forEach((item, index) => {
			const exchRate = formValues?.exchange_rate?.filter(
				(ex) => ex?.from_currency === item?.currency,
			)?.[GLOBAL_CONSTANTS.zeroth_index]?.rate;

			const newExcRate = item?.currency === formValues?.invoice_currency ? IS_SAME : exchRate || '';

			setValue(`line_items.${index}.exchange_rate`, newExcRate);
		});
	}, [
		formValues?.invoice_currency,
		JSON.stringify(formValues?.exchange_rate),
		JSON.stringify(formValues?.line_items),
	]);

	useEffect(() => {
		if (formValues?.invoice_type === 'credit_note') {
			setValue('advance_bill', '');
		}
	}, [formValues?.invoice_type]);

	const calculatedValues = useCalculateTotalPrice({
		baseCurrency : formValues?.invoice_currency,
		lineItems    : formValues?.line_items,
		chargeCodes  : codes,
	});

	useResetErrors({ errors, setErrors, currentStateErrors: errorVal });

	useImperativeHandle(ref, () => ({
		handleSubmit,
		formValues,
		taggedProformas : selectedProforma,
		codes,
		shipment_data,
		activeTab       : billCatogory,
		calculatedValues,
	}));

	const isTagDissable = () => {
		if (formValues?.invoice_type === 'credit_note') {
			return true;
		}

		if (['coe_rejected', 'finance_rejected'].includes(purchaseInvoiceValues?.status)) {
			return false;
		}

		if (isEdit) {
			return true;
		}
		return false;
	};

	const getOptions = () => {
		if (!editable && isJobClosed) {
			return OPTIONSCN;
		}
		if (billCatogory === 'pass_through') {
			return INVOICE_TYPE_OPTIONS_CN;
		}
		return INVOICE_TYPE_OPTIONS;
	};

	const isCreditNoteOnly = isJobClosed ? 'credit_note' : '';

	return (
		<div className={styles.flex}>
			<div className={styles.upload_invoice}>
				<object
					type="application/pdf"
					data={uploadInvoiceUrl}
					width="100%"
					height="100%"
					aria-label="Document"
				/>
			</div>
			<div className={styles.formlayout}>
				<div className={styles.select}>
					<SelectController
						name="urgency_tag"
						control={control}
						options={urgencyTagOptions}
						isClearable
						placeholder="Urgency"
					/>
				</div>

				<AccordianView title="Select Invoice Type" fullwidth open={isEdit || isJobClosed}>
					<div className={cl`${styles.flex} ${styles.justify}`}>
						<div className={styles.flex}>
							{!isJobClosed ? (
								<Segmented
									setBillCatogory={setBillCatogory}
									billCatogory={billCatogory}
								/>
							) : null}
							<RadioGroupController
								options={getOptions()}
								control={control}
								name="invoice_type"
								rules={{ required: true }}
								value={purchaseInvoiceValues?.invoice_type || isCreditNoteOnly || 'purchase_invoice'}
							/>
							{errors?.invoice_type ? (
								<div className={cl`${styles.errors} ${styles.marginleft}`}>
									Invoice type is Required
								</div>
							) : null}

							{billCatogory === 'purchase' ? (
								<CheckboxController
									control={control}
									name="advance_bill"
									label="Advance Bill"
									value="advance_bill"
									disabled={formValues.invoice_type === 'credit_note'}
								/>
							) : null}

						</div>
						<Button
							className={styles.margintop}
							disabled={isTagDissable()}
							onClick={() => { setShowTaggings(true); }}
						>
							{isEmpty(selectedProforma)
								? 'Tag' : ' Edit & Tag '}
						</Button>
					</div>
				</AccordianView>
				<PurchaseInvoiceDates
					control={control}
					invoiceCurrency={invoiceCurrency}
					errors={errors}
					purchaseInvoiceValues={purchaseInvoiceValues}
					isEdit={isEdit}
					formValues={formValues}
				/>
				<BillingPartyDetails
					control={control}
					billingParty={billingParty}
					setBillingParty={setBillingParty}
					setValue={setValue}
					watch={watch}
					errors={errors}
					errMszs={errMszs}
					purchaseInvoiceValues={purchaseInvoiceValues}
					open={isEdit}
					entitiesLoading={entitiesLoading}
					listEntities={listEntities}
				/>
				<CollectionPartyDetails
					control={control}
					collectionParty={collectionParty}
					setCollectionParty={setCollectionParty}
					setValue={setValue}
					watch={watch}
					serviceProvider={serviceProvider}
					collectionPartyAddresses={collectionPartyAddresses}
					errors={errors}
					errMszs={errMszs}
					purchaseInvoiceValues={purchaseInvoiceValues}
					open={isEdit}
					setShowCollectionParty={setShowCollectionParty}
					setShowBankForm={setShowBankForm}
					formValues={formValues}
				/>

				<LineItemDetails
					control={control}
					collectionParty={collectionParty}
					setCollectionParty={setCollectionParty}
					setValue={setValue}
					watch={watch}
					serviceProvider={serviceProvider}
					collectionPartyAddresses={collectionPartyAddresses}
					billingParty={billingParty}
					setCodes={setCodes}
					calculatedValues={calculatedValues}
					invoiceCurrency={invoiceCurrency}
					shipmentId={shipment_data?.id}
					errors={errors}
					errMszs={errMszs}
					open={isEdit}
					shipment_data={shipment_data}
				/>

				<AdditionalDetails
					control={control}
					errors={errors}
					errMszs={errMszs}
					purchaseInvoiceValues={purchaseInvoiceValues}
					shipment_data={shipment_data}
					open={isEdit}
					primary_service={primary_service}
					serviceProvider={serviceProvider}
					formValues={formValues}
					calculatedValues={calculatedValues}
				/>
				<Taggings
					showTagings={showTaggings}
					setShowTaggings={setShowTaggings}
					serviceProviderId={serviceProvider?.service_provider_id}
					shipmentId={shipment_data?.id}
					selectedProforma={selectedProforma}
					setSelectedProforma={setSelectedProforma}
				/>
				{showCollectionParty ? (
					<CollectionPartyForm
						showCollectionParty={showCollectionParty}
						setShowCollectionParty={setShowCollectionParty}
						serviceProvider={serviceProvider}
					/>
				) : null}
				{showBankform ? (
					<BankForm
						showBankform={showBankform}
						setShowBankForm={setShowBankForm}
						orgResponse={{
							id: collectionParty.organization_id,
						}}
						tradePartyId={collectionParty?.id}
					/>
				) : null}
			</div>
		</div>
	);
}

export default forwardRef(InvoiceFormLayout);
