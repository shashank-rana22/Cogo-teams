import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useHandleFinalSave from '../../helpers/handleFinalSave';
import ExchangeRateModal from '../ExchangeRateModal';
import MapLineItemDetails from '../MapLineItemDetails';
import PurchaseLineItemDetails from '../PurchaseLineItemDetails';

import styles from './styles.module.css';

function Step2({
	contentText,
	purchaseInvoiceValues,
	serviceProvider,
	setExchangeRateModal,
	billingPartyObj,
	collectionPartyObj,
	editData = {},
	setStep,
	exchangeRateModal,
	onClose,
	billId,
	closeModal,
}) {
	const [globalSelected, setGlobalSelected] = useState({});

	const {
		handleFinalSubmit,
		handleChange,
		currentSelected,
		isLockedMode,
		loading,
	} = useHandleFinalSave({
		data    : serviceProvider,
		purchaseInvoiceValues,
		billId,
		onClose : closeModal,
		editData,
		setGlobalSelected,
		globalSelected,
	});

	const iseditable = !['coe_approved', 'locked'].includes(editData?.status);

	const goBack = (
		<span className={styles.flex}>
			<Button
				themeType="secondary"
				onClick={
					iseditable
						? () => setStep(1)
						: () => onClose()
				}
			>
				Go Back

			</Button>
			<span className={styles.marginleft}>{contentText}</span>
		</span>
	);
	return (
		<div>
			<Modal.Header title={goBack} />
			<Modal.Body>
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
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
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
						<Button onClick={onClose} disabled={loading}>
							Close
						</Button>
					)}
					{editData?.status !== 'coe_approved' && (
						<Button
							className={styles.button}
							disabled={loading}
							onClick={() => {
								setExchangeRateModal(true);
							}}
						>
							Save
						</Button>
					)}
				</div>
			</Modal.Footer>
			{exchangeRateModal && (
				<ExchangeRateModal
					exchangeRateModal={exchangeRateModal}
					setExchangeRateModal={setExchangeRateModal}
					handleFinalSubmit={handleFinalSubmit}
					billId={billId}
					loading={loading}
					purchaseInvoiceValues={purchaseInvoiceValues}
				/>
			)}
		</div>
	);
}

export default Step2;
