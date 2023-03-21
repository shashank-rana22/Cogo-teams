import { Modal } from '@cogoport/components';
import React from 'react';

import CancellationModal from './CancellationModal';
import styles from './styles.module.css';

function CancelShipment({
	showCancel = false,
	setShowCancel = () => {},
	isSeller = false,
	onClose = () => {},
	isService = false,
	showRequest,
	setShow = () => {},
}) {
	let type = 'shipment';
	if (isService && isSeller) {
		type = 'service_supplier';
	} else if (isService && !isSeller) {
		type = 'service_shipper';
	}

	// const {
	// 	handleSubmit,
	// 	onSubmit,
	// 	loading,
	// 	setShow,
	// 	fields,
	// 	modifiedControls,
	// 	disabledButton,
	// 	onErrors,
	// 	errors,
	// 	isMobile,
	// 	formValues,
	// 	reset = () => {},
	// } = type === 'shipment'
	// 	? useUpdateCancelShipment({ setShowCancel })
	// 	: useUpdateCancelService({
	// 			setShowCancel,
	// 			service_type,
	// 			id,
	// 			isSeller,
	// 			trade_type,
	// 			isService,
	// 	  });

	const handleClose = () => {
		setShow(false);
		setShowCancel(false);
	};

	return (
		<div>
			<div
				className={styles.btn}
				onClick={() => {
					onClose();
					setShowCancel(true);
				}}
			>
				{['service_shipper', 'service_supplier'].includes(type)
					? 'Cancel'
					: 'Cancel Shipment'}
			</div>

			{showCancel ? (
				<Modal
					show={showCancel}
					closable={!showRequest}
					onClose={handleClose}
				>
					<CancellationModal
						// formValues={formValues}
						// isIE={isIE}
						// handleSubmit={handleSubmit}
						// onSubmit={onSubmit}
						// loading={loading}
						// fields={fields}
						// modifiedControls={modifiedControls}
						// disabledButton={disabledButton}
						// onErrors={onErrors}
						// errors={errors}
						// showRequest={showRequest}
						handleClose={handleClose}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default CancelShipment;
