import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import getEditData from '../../helpers/getEditData';
import Step1 from '../../page-components/Step1';
import Step2 from '../../page-components/Step2';

import styles from './styles.module.css';

function ComparisionModal({
	uploadInvoiceUrl = '',
	setUploadInvoiceUrl = () => {},
	serviceProvider = {},
	editData = {},
	openComparision = false,
	setOpenComparision = () => {},
	step = 1,
	setStep = () => {},
	onClose = () => {},
}) {
	const [purchaseInvoiceValues, setPurchaseInvoiceValues] = useState(getEditData(editData));

	const [collectionPartyId, setCollectionPartyId] = useState({
		billId  : editData?.finance_job_number,
		partyId : editData?.id,
	});

	const [exchangeRateModal, setExchangeRateModal] = useState(false);
	const [billingParty, setBillingParty] = useState({});
	const [collectionParty, setCollectionParty] = useState({});
	const [errors, setErrors] = useState({});
	const [errMszs, setErrMszs] = useState({});

	const contentText = (
		<span className={styles.headingmodal}>
			{step === 2 ? 'STEP 2a - Match and Lock Items with Live Invoice'
				: 'STEP 1 - Match Purchase Invoice With Cogo Invoice'}
		</span>
	);

	const closeModal = () => {
		setOpenComparision(false);
		setStep(1);
		setErrMszs({});
	};

	return (
		<Modal
			size="fullscreen"
			show={openComparision}
			showCloseIcon={false}
			placement="center"
			className={styles.modal_container}
		>
			{step === 1 ? (
				<Step1
					contentText={contentText}
					uploadInvoiceUrl={openComparision?.invoice_url || uploadInvoiceUrl}
					serviceProvider={serviceProvider}
					errors={errors}
					setErrors={setErrors}
					setBillingParty={setBillingParty}
					billingParty={billingParty}
					errMszs={errMszs}
					setUploadInvoiceUrl={setUploadInvoiceUrl}
					setStep={setStep}
					setCollectionPartyId={setCollectionPartyId}
					billId={collectionPartyId?.billId}
					setErrMszs={setErrMszs}
					purchaseInvoiceValues={purchaseInvoiceValues}
					onSubmit={(values, codes) => setPurchaseInvoiceValues({
						...values,
						codes,
						status: editData?.status,
					})}
					onError={(errordata) => {
						setErrors(errordata);
					}}
					partyId={collectionPartyId?.partyId}
					collectionParty={collectionParty}
					setCollectionParty={setCollectionParty}
					closeModal={closeModal}
					editData={editData}
					onClose={onClose}
				/>
			) : null}

			{step === 2 ? (
				<Step2
					contentText={contentText}
					purchaseInvoiceValues={purchaseInvoiceValues}
					serviceProvider={serviceProvider}
					setExchangeRateModal={setExchangeRateModal}
					billingPartyObj={billingParty}
					collectionPartyObj={collectionParty}
					editData={editData}
					setStep={setStep}
					exchangeRateModal={exchangeRateModal}
					billId={collectionPartyId?.billId}
					partyId={collectionPartyId?.partyId}
					onClose={onClose}
					closeModal={closeModal}
				/>
			) : null}
		</Modal>
	);
}

export default ComparisionModal;
