import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import ConfirmationModal from '../../common/ConfirmationModal';
import { formatPurchaseLineItems } from '../../helpers/format-cp-data';
import handleErrors from '../../helpers/handleErrors';
import useCreateColletctionParty from '../../hooks/useCreateCollectionParty';
import InvoiceFormLayout from '../InvoiceFormLayout';

import styles from './styles.module.css';

const STEP_TWO = 2;

function StepOne({
	contentText = '',
	uploadInvoiceUrl = '',
	serviceProvider = {},
	errors = {},
	setErrors = () => {},
	setBillingParty = () => {},
	billingParty = {},
	errMszs = {},
	setUploadInvoiceUrl = '',
	setStep = () => {},
	setCollectionPartyId = () => {},
	billId,
	onSubmit = () => {},
	setErrMszs = () => {},
	purchaseInvoiceValues = {},
	onError = () => {},
	partyId,
	collectionParty = {},
	setCollectionParty = () => {},
	closeModal = () => {},
	editData = {},
}) {
	const [confirmation, setConfirmation] = useState(null);

	const { createCp, updateCp, loading, serviceProviderOrg } = useCreateColletctionParty({
		onCreate          : () => setStep(STEP_TWO),
		setCollectionPartyId,
		serviceProviderId : serviceProvider?.service_provider_id,
	});

	const ref = useRef({});

	const completeStep = (formData, extraData) => {
		onSubmit(
			{
				...formData,
				line_items: formatPurchaseLineItems(
					formData.line_items,
					extraData.codes,
				),
			},
			extraData.codes,
		);
		setConfirmation({ formData, extraData });
	};

	const handleFinalSave = async () => {
		setConfirmation(null);
		if (!isEmpty(billId)) {
			await updateCp(confirmation?.formData, confirmation?.extraData);
		} else {
			await createCp(confirmation?.formData, confirmation?.extraData);
		}
	};

	const handleNext = async () => {
		const {
			handleSubmit,
			shipment_data,
			formValues,
			codes,
			taggedProformas,
			activeTab,
			calculatedValues,
		} = ref.current || {};

		handleErrors({
			errMszs,
			setErrMszs,
			formValues,
			billingPartyObj: billingParty,
		});

		await handleSubmit(
			(formData) => completeStep(formData, {
				activeTab,
				billingPartyObj    : billingParty,
				collectionPartyObj : collectionParty,
				shipment_data,
				invoiceData        : serviceProvider,
				uploadProof        : uploadInvoiceUrl,
				taggedProformas,
				formValues,
				codes,
				billId,
				partyId,
				invoiceStatus      : purchaseInvoiceValues?.status || 'init',
				serviceProviderOrg,
				calculatedValues,
			}),
			onError,
		)();
	};

	const hasError = Object.keys(errMszs).filter((key) => errMszs?.[key] === true);

	const goBack = (
		<span className={styles.flex}>
			<Button themeType="secondary" onClick={closeModal}>Go Back</Button>
			<span className={styles.marginleft}>{contentText}</span>
		</span>
	);

	return (
		<div>
			<Modal.Header title={goBack} />
			<Modal.Body>
				<InvoiceFormLayout
					uploadInvoiceUrl={uploadInvoiceUrl}
					serviceProvider={serviceProvider}
					errors={errors}
					setErrors={setErrors}
					setBillingParty={setBillingParty}
					billingParty={billingParty}
					errMszs={errMszs}
					setCollectionParty={setCollectionParty}
					collectionParty={collectionParty}
					purchaseInvoiceValues={purchaseInvoiceValues}
					billId={billId}
					editData={editData}
					ref={ref}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footerstyles}>
					<Button
						size="md"
						themeType="secondary"
						className={styles.marginright}
						disabled={loading}
						onClick={() => {
							setUploadInvoiceUrl(null);
							closeModal();
						}}
					>
						Cancel
					</Button>
					<Button
						size="md"
						disabled={loading}
						onClick={
						handleNext
                    }
					>
						{loading ? 'Uploading' : 'Upload'}
					</Button>
				</div>
			</Modal.Footer>

			{(confirmation && isEmpty(hasError)) ? (
				<ConfirmationModal
					setConfirmation={setConfirmation}
					handleFinalSubmit={handleFinalSave}
					loading={loading}
				/>
			) : null}
		</div>
	);
}

export default StepOne;
