/* eslint-disable react-hooks/exhaustive-deps */
import { RadioGroupController } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import AccordianView from '../../common/Accordianview';
import { invoiceTypeOptions } from '../../constants';
import useCalculateTotalPrice from '../../helpers/useCalculateTotalPrice';
import useResetErrors from '../../helpers/useResetErrors';

import AdditionalDetails from './AdditionalDetails';
import BillingPartyDetails from './BillingPartyDetails';
import CollectionPartyDetails from './CollectionPartyDetails';
import LineItemDetails from './LineItemDetails';
import PurchaseInvoiceDates from './PurchaseInvoiceDates';
import styles from './styles.module.css';

function InvoiceFormLayout({
	uploadInvoiceUrl,
	serviceProvider,
	errors,
	setErrors,
	setBillingParty,
	billingParty,
	errorVal,
	setValue,
	watch,
	control,
	formValues,
	errMszs,
}) {
	const [collectionParty, setCollectionParty] = useState({});
	const [codes, setCodes] = useState({});

	const billingAddresses = collectionParty?.billing_addresses || [];
	const otherAddresses = collectionParty?.other_addresses || [];
	const allAddresses = [...billingAddresses, ...otherAddresses];
	const collectionPartyAddresses = (allAddresses || []).map((address) => ({
		...address,
		label : `${address?.address} / ${address?.tax_number}`,
		value : address?.tax_number,
	}));

	const invoiceCurrency = formValues?.invoice_currency;

	// useImperativeHandle(ref, () => ({
	// 	handleSubmit,
	// }));

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
				<AccordianView title="Select Invoice Type" fullwidth>
					<RadioGroupController
						options={invoiceTypeOptions}
						control={control}
						name="invoice_type"
						rules={{ required: true }}
					/>
					{errors?.invoice_type && (
						<div className={`${styles.errors} ${styles.marginleft}`}>
							Invoice type is Required
						</div>
					)}
				</AccordianView>
				<PurchaseInvoiceDates control={control} invoiceCurrency={invoiceCurrency} errors={errors} />
				<BillingPartyDetails
					control={control}
					billingParty={billingParty}
					setBillingParty={setBillingParty}
					setValue={setValue}
					watch={watch}
					errors={errors}
					errMszs={errMszs}
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
				/>

				<AdditionalDetails
					control={control}
					errors={errors}
					errMszs={errMszs}
				/>
			</div>
		</div>
	);
}

export default InvoiceFormLayout;
