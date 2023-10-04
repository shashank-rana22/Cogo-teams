import { Modal, Button, Toggle, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useHandleFinalSave from '../../helpers/handleFinalSave';
import ExchangeRateModal from '../ExchangeRateModal';
import MapLineItemDetails from '../MapLineItemDetails';
import PurchaseLineItemDetails from '../PurchaseLineItemDetails';

import KnockOffMode from './KnockOffMode';
import styles from './styles.module.css';

const STEP_ONE = 1;

function StepTwo({
	contentText = '',
	purchaseInvoiceValues = {},
	serviceProvider = {},
	setExchangeRateModal = () => { },
	billingPartyObj = {},
	collectionPartyObj = {},
	editData = {},
	setStep = () => { },
	exchangeRateModal = false,
	onClose = () => { },
	billId = '',
	partyId = '',
	closeModal = () => { },
	formValues = {},
	jobClosed = false,
}) {
	const [globalSelected, setGlobalSelected] = useState({});
	const [knockOffMode, setknockOffMode] = useState(false);

	const {
		handleFinalSubmit,
		handleChange,
		currentSelected,
		isLockedMode,
		loading,
	} = useHandleFinalSave({
		data: serviceProvider,
		purchaseInvoiceValues,
		billId,
		onClose,
		editData,
		setGlobalSelected,
		globalSelected,
	});

	const iseditable = !['coe_approved', 'locked'].includes(editData?.status);

	const cantBeEdited = editData?.status === 'init' && jobClosed;

	const context = knockOffMode ? <span className={styles.headingmodal}>STEP 2b - Locked Items / Services</span>
		: contentText;

	function GoBack() {
		return (
			<span className={styles.flex}>
				<Button
					themeType="secondary"
					onClick={
						(iseditable && !cantBeEdited)
							? () => setStep(STEP_ONE)
							: closeModal
					}
				>
					Go Back

				</Button>
				<span className={styles.marginleft}>{context}</span>
			</span>
		);
	}

	return (
		<div>
			<Modal.Header title={(<GoBack />)} />
			<Modal.Body>
				{knockOffMode ? (
					<KnockOffMode
						purchaseInvoiceValues={purchaseInvoiceValues}
						data={serviceProvider}
						globalSelected={globalSelected}
						collectionPartyId={partyId}
					/>

				) : (
					<div className={styles.flex}>
						<div className={styles.purchaselineitems}>
							<PurchaseLineItemDetails
								billingPartyObj={billingPartyObj}
								collectionPartyObj={collectionPartyObj}
								editData={editData}
								purchaseInvoiceValues={purchaseInvoiceValues}
								isLockedMode={isLockedMode}
							/>
						</div>
						<div className={styles.maplineitems}>
							<MapLineItemDetails
								serviceProvider={serviceProvider}
								handleChange={handleChange}
								currentSelected={currentSelected}
								isLockedMode={isLockedMode}
								billingPartyObj={billingPartyObj}
								collectionPartyObj={collectionPartyObj}
								formValues={formValues}
							/>
						</div>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.knockoff}>
					<Toggle
						name="mode"
						size="sm"
						onLabel="Knock Off Mode"
						offLabel="Lock Mode"
						onChange={(e) => setknockOffMode(e?.target?.checked)}
					/>
				</div>
				<div className={styles.buttoncontainer}>
					{isEmpty(editData) ? (
						<Button
							className="secondary"
							onClick={onClose}
							disabled={loading}
						>
							Close / Knock-off later
						</Button>
					) : (
						<Button onClick={iseditable ? onClose : closeModal} disabled={loading}>
							Close
						</Button>
					)}

					{editData?.status !== 'coe_approved' ? (
						<Button
							className={styles.marginleft}
							disabled={loading || isEmpty(currentSelected?.buy)}
							onClick={() => {
								if (cantBeEdited) {
									Toast.error('Initiated Bill Cannot be Locked When Job is Closed');
									return;
								}
								setExchangeRateModal(true);
							}}
						>
							Save
						</Button>
					) : null}

				</div>
			</Modal.Footer>

			{exchangeRateModal ? (
				<ExchangeRateModal
					exchangeRateModal={exchangeRateModal}
					setExchangeRateModal={setExchangeRateModal}
					handleFinalSubmit={handleFinalSubmit}
					billId={billId}
					loading={loading}
					purchaseInvoiceValues={purchaseInvoiceValues}
				/>
			) : null}
		</div>
	);
}

export default StepTwo;
