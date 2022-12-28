import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import CancellationModal from '../../../../commons/CancellationModal';

// import useUpdateCancelShipment from '../../../../Fcl/hooks/useUpdateCancelShipment';
import styles from './styles.module.css';

function CancelShipment({

	setShow = () => {},
	id,
	refetch = () => {},
	setShowBookingOption = () => {},
}) {
	const [showCancel, setShowCancel] = useState(false);
	const loading = false;
	// const {
	// 	loading,
	// 	fields,
	// 	errors,
	// 	onError,
	// 	formValues,
	// 	handleSubmit,
	// 	controls,
	// 	onSubmit,
	// } = useUpdateCancelShipment({
	// 	id,
	// 	setShowCancel,
	// 	refetch,
	// 	setShowBookingOption,
	// });

	const onClose = () => {
		setShowCancel(false);
	};

	return (
		<div>
			<div
				className={styles.buttonText}
				onClick={() => {
					setShowCancel(true);
				}}
			>
				Cancel Shipment
			</div>

			{showCancel ? (
				<Modal
					size="md"
					show={showCancel}
					onClose={onClose}
					placement="center"
				>
					<Modal.Header title="Cancel Shipment" />
					<Modal.Body>
						<CancellationModal />
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.buttonDiv}>
							<Button
								onClick={onClose}
							// disabled={loading || disabledButton}
								style={{ marginRight: '8px' }}
							>
								Cancel
							</Button>
							<Button>
								{!loading ? 'Confirm Cancellation' : 'Confirming...'}
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default CancelShipment;
