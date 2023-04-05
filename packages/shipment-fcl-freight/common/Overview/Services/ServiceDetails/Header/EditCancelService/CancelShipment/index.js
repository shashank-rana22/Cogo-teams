import { Modal, Button } from '@cogoport/components';
import React from 'react';

import CancellationModal from './CancellationModal';
// import useUpdateCancelService from './hooks/useUpdateCancelService';
// import useUpdateCancelShipment from './hooks/useUpdateCancelShipment';
import styles from './styles.module.css';

function CancelShipment({
	id = '',
	service_type = '',
	showCancel = false,
	setShowCancel = () => {},
	isSeller = false,
	trade_type = '',
	isIE = false,
	onClose = () => {},
	isService = false,
	showRequest,
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
	// 		setShowCancel,
	// 		service_type,
	// 		id,
	// 		isSeller,
	// 		trade_type,
	// 		isService,
	// 	  });

	const handleClose = () => {
		// setShow(false);
		setShowCancel(false);
		// reset();
	};

	return (
		<div>
			<div
				className={styles.button_text}
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
					className="primary xl"
					show={showCancel}
					closable={!showRequest}
					onClose={handleClose}
				>
					<Modal.Header title={showRequest
						? 'Cancellation Requested by customer'
						: 'Cancel Shipment'}
					/>

					<Modal.Body>
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
							showRequest={showRequest}
							handleClose={handleClose}
						/>

					</Modal.Body>
					<Modal.Footer>
						{!showRequest ? (
							<Button
								className="secondary md"
								onClick={handleClose}
								// disabled={loading || disabledButton}
								style={{ marginRight: '8px' }}
							>
								Cancel
							</Button>
						) : null}

						<Button
							className="primary md"
							// disabled={loading || disabledButton}
							// onClick={handleSubmit(onSubmit, onErrors)}
						>
							Confirm Cancellation
							{/* {!loading ? 'Confirm Cancellation' : 'Confirming...'} */}
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default CancelShipment;
