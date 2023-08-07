/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm, RadioGroupController, SelectController } from '@cogoport/forms';
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
	billId,
	editData = {},
}, ref) {
	const [codes, setCodes] = useState(purchaseInvoiceValues?.codes || {});

	const [showTaggings, setShowTaggings] = useState(false);
	const [billCatogory, setBillCatogory] = useState('purchase');
	const [selectedProforma, setSelectedProforma] = useState([]);
	const [showCollectionParty, setShowCollectionParty] = useState(false);
	const [showBankform, setShowBankForm] = useState(false);
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);
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
		tax_amt : item?.tax_price || 0,
		cost    : item?.tax_total_price,
	}));

	const { control, watch, setValue, handleSubmit, formState: { errors: errorVal } } = useForm({
		defaultValues: {
			invoice_type  : isJobClosed ? 'credit_note' : 'purchase_invoice',
			exchange_rate : purchaseInvoiceValues?.exchange_rate || [
				{ from_currency: 'INR', to_currency: 'INR', rate: '1' },
			],
			line_items: isEmpty(defaultLineItems) ? [EMPTY_LINE_ITEMS] : defaultLineItems,
		},
	});

	const formValues = watch();

	const invoiceCurrency = formValues?.invoice_currency;

	const initialValueBP = listEntities?.list?.find(
		(item) => item?.registration_number
			=== (purchaseInvoiceValues?.billing_party),
	);

	useEffect(() => {
		if (initialValueBP && Object.keys(billingParty || {}).length === 0) {
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
					rate        : isSame ? 1 : item?.rate,
				};
			});
			setValue('exchange_rate', declaredExcRate);
		}
	}, [formValues?.invoice_currency, formValues?.exchange_rate?.length]);

	useEffect(() => {
		formValues?.line_items?.forEach((item, index) => {
			const exchRate = formValues?.exchange_rate?.filter(
				(ex) => ex?.from_currency === item?.currency,
			)?.[0]?.rate;

			const newExcRate = item?.currency === formValues?.invoice_currency ? 1 : exchRate || '';

			setValue(`line_items.${index}.exchange_rate`, newExcRate);
		});
	}, [
		formValues?.invoice_currency,
		JSON.stringify(formValues?.exchange_rate),
		JSON.stringify(formValues?.line_items),
	]);

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
					<SelectController name="urgency_tag" control={control} options={URGENCY_TAG_OPTIONS} isClearable />
				</div>

				<AccordianView title="Select Invoice Type" fullwidth open={isEdit || isJobClosed}>
					<div className={`${styles.flex} ${styles.justifiy}`}>
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
								<div className={`${styles.errors} ${styles.marginleft}`}>
									Invoice type is Required
								</div>
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
