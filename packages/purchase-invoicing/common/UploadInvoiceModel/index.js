import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMArrowBack, IcMUpload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { EMPTY_LINE_ITEMS } from '../../constants';
import handleErrors from '../../helpers/handleErrors';
import useHandleFinalSave from '../../helpers/handleFinalSave';
import ExchangeRateModal from '../../page-components/ExchangeRateModal';
import MapLineItemDetails from '../../page-components/MapLineItemDetails';
import PurchaseLineItemDetails from '../../page-components/PurchaseLineItemDetails';
import Step1 from '../../page-components/Step1';

import styles from './styles.module.css';

function UploadInvoiceModal({ setOpen, uploadInvoiceUrl, setUploadInvoiceUrl, open, serviceProvider }) {
	const [step, setStep] = useState(1);
	const [openComparision, setOpenComparision] = useState(false);
	const [purchaseInvoiceValues, setPurchaseInvoiceValues] = useState({});
	const [globalSelected, setGlobalSelected] = useState({});
	// const [collectionPartyId, setCollectionPartyId] = useState();
	const [exchangeProofUrl, setExchangeProofUrl] = useState('');
	const [exchangeRateModal, setExchangeRateModal] = useState(false);
	const [checkedDeviation, setCheckedDeviation] = useState(false);
	const [billingParty, setBillingParty] = useState({});
	const [errors, setErrors] = useState({});
	const [errMszs, setErrMszs] = useState({});

	let contentText = 'STEP 1 - Match Purchase Invoice With Cogo Invoice';
	if (step === 2) {
		contentText = 'STEP 2a - Match and Lock Items with Live Invoice';
	} else if (step === 3) {
		contentText = 'STEP 2b - Locked Items / Services';
	}

	const { control, watch, setValue, handleSubmit, formState: { errors: errorVal }, reset } = useForm({
		defaultValues: {
			exchange_rate: [
				{ from_currency: 'INR', to_currency: 'INR', rate: '1' },
			],
			line_items: [EMPTY_LINE_ITEMS],
		},
	});

	const formValues = watch();

	const onSubmit = (formdata) => {
		if (!handleErrors({
			errMszs,
			setErrMszs,
			formValues,
			billingPartyObj: billingParty,
		})) {
			setPurchaseInvoiceValues(formdata);
		}
	};

	const onError = (errordata) => {
		setErrors(errordata);
	};

	const handleUpload = () => {
		handleSubmit(onSubmit, onError)();
		// setStep(2);
	};

	const onClose = () => {
		setErrMszs({});
		reset();
	};

	const {
		handleFinalSubmit,
		handleChange,
		currentSelected,
		// isLockedMode,
		// loading,
	} = useHandleFinalSave({
		data: serviceProvider,
		purchaseInvoiceValues,
		collectionPartyId,
		onClose,
		setGlobalSelected,
		globalSelected,
	});

	return (
		<>
			{open && (
				<Modal
					show={open}
					size="sm"
					onClose={() => {
						setOpen(false);
					}}
				>
					<Modal.Header title="Upload Scan of Invoice" />
					<Modal.Body>
						<section>
							<FileUploader
								value={uploadInvoiceUrl}
								onChange={setUploadInvoiceUrl}
								showProgress
								draggable
								multipleUploadDesc="Upload Invoice"
								uploadIcon={<IcMUpload height={40} width={40} />}
							/>
						</section>
					</Modal.Body>
					<Modal.Footer>
						<Button
							size="md"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={() => {
								setOpen(false);
								setUploadInvoiceUrl(null);
							}}
						>
							Cancel
						</Button>
						<Button
							size="md"
							onClick={() => {
								setOpenComparision(true);
								setOpen(false);
							}}
						>
							Confirm
						</Button>
					</Modal.Footer>
				</Modal>
			)}
			{openComparision && (
				<Modal
					size="fullscreen"
					show={openComparision}
					onClose={() => {
						onClose();
						setOpenComparision(false);
						setStep(1);
					}}
					placement="center"
					className={styles.modal_container}
				>
					{step === 1 && (
						<Step1
							contentText={contentText}
							uploadInvoiceUrl={uploadInvoiceUrl}
							serviceProvider={serviceProvider}
							errors={errors}
							setErrors={setErrors}
							setBillingParty={setBillingParty}
							billingParty={billingParty}
							errorVal={errorVal}
							handleSubmit={handleSubmit}
							setValue={setValue}
							watch={watch}
							control={control}
							formValues={formValues}
							errMszs={errMszs}
							setOpen={setOpen}
							setUploadInvoiceUrl={setUploadInvoiceUrl}
							handleUpload={handleUpload}
						/>
					)}
					{step === 2 && (
						<>
							<Modal.Header title={(
								<div className={`${styles.flex} ${styles.align}`}>
									<span className={styles.back}>
										<IcMArrowBack height={26} width={26} />
									</span>
									{contentText}
								</div>
							)}
							/>
							<Modal.Body>
								<div className={styles.flex}>
									<div className={styles.purchaselineitems}>
										<PurchaseLineItemDetails purchaseInvoiceValues={purchaseInvoiceValues} />
									</div>
									<div className={styles.maplineitems}>
										<MapLineItemDetails
											serviceProvider={serviceProvider}
											handleChange={handleChange}
											currentSelected={currentSelected}
										/>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<div className={styles.buttoncontainer}>
									<Button>Close</Button>
									<Button
										className={styles.button}
										onClick={() => {
											setExchangeRateModal(true);
										}}
									>
										Save
									</Button>
								</div>
							</Modal.Footer>
							{exchangeRateModal && (
								<ExchangeRateModal
									exchangeRateModal={exchangeRateModal}
									setExchangeRateModal={setExchangeRateModal}
									handleFinalSubmit={handleFinalSubmit}
									// collectionPartyId={collectionPartyId}
									exchangeProofUrl={exchangeProofUrl}
									setExchangeProofUrl={setExchangeProofUrl}
									setCheckedDeviation={setCheckedDeviation}
									checkedDeviation={checkedDeviation}
								/>
							)}
						</>
					)}
				</Modal>
			)}
		</>
	);
}

export default UploadInvoiceModal;
