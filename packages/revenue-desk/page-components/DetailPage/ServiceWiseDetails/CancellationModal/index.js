import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import useUpdateCancelShipment from '../../../../hooks/useUpdateCancelShipment';

import DefaultOptions from './DefaultOptions';

function CanelationModal({ showCancelModal, setshowCancelModal, shipmentData, setShowDetailPage }) {
	const [cancellationReason, setCancellationReason] = useState(null);
	const [cancellationSubReason, setCancellationSubReason] = useState(null);

	const { cancelShipment } = useUpdateCancelShipment({
		shipmentData,
		cancellationReason,
		cancellationSubReason,
		setshowCancelModal,
		setShowDetailPage,
	});

	return (
		<Modal size="lg" show={showCancelModal} onClose={() => setshowCancelModal(false)} placement="center">
			<Modal.Header title="CANCEL SHIPMENT" />
			<Modal.Body>
				<div>
					Please select a reason for cancelling the shipment
				</div>
				<DefaultOptions
					cancellationReason={cancellationReason}
					setCancellationReason={setCancellationReason}
					cancellationSubReason={cancellationSubReason}
					setCancellationSubReason={setCancellationSubReason}
				/>

			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => {
					cancelShipment();
				}}
				>
					Confirm Cancellation
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CanelationModal;
