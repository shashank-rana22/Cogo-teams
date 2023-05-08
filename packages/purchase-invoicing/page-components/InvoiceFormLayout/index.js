/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm, RadioGroupController } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useContext, useImperativeHandle, forwardRef, useState } from 'react';

import AccordianView from '../../common/Accordianview';
import { EMPTY_LINE_ITEMS, invoiceTypeOptions, invoiceTypeOptionsCN } from '../../constants';
import useCalculateTotalPrice from '../../helpers/useCalculateTotalPrice';
import useResetErrors from '../../helpers/useResetErrors';

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
	uploadInvoiceUrl,
	serviceProvider,
	errors,
	setErrors,
	setBillingParty,
	billingParty,
	errMszs,
	collectionParty,
	setCollectionParty,
	purchaseInvoiceValues,
	billId,
}, ref) {
	const [codes, setCodes] = useState(purchaseInvoiceValues?.codes || {});
	const [showTaggings, setShowTaggings] = useState(false);
	const [billCatogory, setBillCatogory] = useState('purchase');
	const [selectedProforma, setSelectedProforma] = useState([]);
	const [showCollectionParty, setShowCollectionParty] = useState(false);
	const [showBankform, setShowBankForm] = useState(false);
	const { shipment_data } = useContext(ShipmentDetailContext);
	const billingAddresses = collectionParty?.billing_addresses || [];
	const otherAddresses = collectionParty?.other_addresses || [];
	const allAddresses = [...billingAddresses, ...otherAddresses];
	const isEdit = !isEmpty(billId);
	const collectionPartyAddresses = (allAddresses || []).map((address) => ({
		...address,
		label : `${address?.address} / ${address?.tax_number}`,
		value : address?.tax_number,
	}));

	const [{ data: listEntities }] = useRequest({
		method : 'get',
		url    : 'list_cogo_entities',
	}, { manual: false });

	const defaultLineItems = purchaseInvoiceValues?.line_items?.map((item) => ({
		...item,
		rate    : item?.price,
		tax_amt : item?.tax_price || 0,
		cost    : item?.tax_total_price,
	}));

	const { control, watch, setValue, handleSubmit, formState: { errors: errorVal } } = useForm({
		defaultValues: {
			exchange_rate: purchaseInvoiceValues.exchange_rates || [
				{ from_currency: 'INR', to_currency: 'INR', rate: '1' },
			],
			line_items: isEmpty(defaultLineItems) ? [EMPTY_LINE_ITEMS] : defaultLineItems,
		},
	});

	const formValues = watch();

	const invoiceCurrency = formValues?.invoice_currency;

	const initialValueBP = listEntities?.list?.find(
		(item) => item?.registration_number
			=== (purchaseInvoiceValues.billing_party),
	);

	useEffect(() => {
		if (initialValueBP && Object.keys(billingParty || {}).length === 0) {
			setBillingParty({
				...initialValueBP,
				billing_party_address:
					purchaseInvoiceValues.billing_party_address,
			});
		}
	}, [listEntities?.list?.length]);

	useEffect(() => {
		if (formValues?.invoice_currency) {
			const declaredExcRate = formValues?.exchange_rate?.map((item) => {
				const isSame = item.from_currency === formValues?.invoice_currency;

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
		formValues?.line_items.forEach((item, index) => {
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
		lineItems    : formValues.line_items,
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
				<AccordianView title="Select Invoice Type" fullwidth open={isEdit}>
					<div className={`${styles.flex} ${styles.justifiy}`}>
						<div className={`${styles.flex}`}>
							<Segmented setBillCatogory={setBillCatogory} billCatogory={billCatogory} />
							<RadioGroupController
								options={billCatogory === 'pass_through' ? invoiceTypeOptionsCN : invoiceTypeOptions}
								control={control}
								name="invoice_type"
								rules={{ required: true }}
								value={purchaseInvoiceValues.invoice_type || 'purchase_invoice'}
							/>
							{errors?.invoice_type && (
								<div className={`${styles.errors} ${styles.marginleft}`}>
									Invoice type is Required
								</div>
							)}
						</div>
						<Button className={styles.margintop} onClick={() => { setShowTaggings(true); }}>
							{!isEmpty(selectedProforma)
								? ' Edit & Tag ' : 'Tag'}
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
				/>
				<Taggings
					showTagings={showTaggings}
					setShowTaggings={setShowTaggings}
					serviceProviderId={serviceProvider?.service_provider_id}
					shipmentId={shipment_data?.id}
					selectedProforma={selectedProforma}
					setSelectedProforma={setSelectedProforma}
				/>
				{showCollectionParty && (
					<CollectionPartyForm
						showCollectionParty={showCollectionParty}
						setShowCollectionParty={setShowCollectionParty}
						serviceProvider={serviceProvider}
					/>
				)}
				{showBankform && (
					<BankForm
						showBankform={showBankform}
						setShowBankForm={setShowBankForm}
						orgResponse={{
							id: collectionParty.organization_id,
						}}
						tradePartyId={collectionParty.id}
					/>
				)}
			</div>
		</div>
	);
}

export default forwardRef(InvoiceFormLayout);
