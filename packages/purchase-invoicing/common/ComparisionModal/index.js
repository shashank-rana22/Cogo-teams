import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

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
	setOpenComparision = () => { },
	step = 1,
	setStep = () => { },
	onClose = () => { },
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

	const onError = (errordata) => {
		setErrors(errordata);
	};

	const closeModal = () => {
		setOpenComparision(false);
		setErrMszs({});
	};

	const { shipment_data } = useContext(ShipmentDetailContext);

	return (
		<Modal
			size="fullscreen"
			show={openComparision}
			showCloseIcon={false}
			placement="center"
			className={styles.modal_container}
		>
			{step === 1 && (
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
					onSubmit={(values, codes) => setPurchaseInvoiceValues({ ...values, codes })}
					shipment_data={shipment_data}
					onError={onError}
					partyId={collectionPartyId?.partyId}
					collectionParty={collectionParty}
					setCollectionParty={setCollectionParty}
					closeModal={closeModal}
					editData={editData}
					onClose={onClose}
				/>
			)}

			{step === 2 && (
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
				/>
			)}
		</Modal>
	);
}

export default ComparisionModal;
