import { Loader, Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { InputController, RadioGroupController, useForm } from '@cogoport/forms';
import { useCallback, useContext } from 'react';

import useListShipmentCancellationReasons from '../../hooks/useListShipmentCancellationReasons';
import useUpdateShipment from '../../hooks/useUpdateShipment';

import getCancelShipmentPayload from './getCancelShipmentPayload';
import styles from './styles.module.css';

export default function CancelShipment({ setShow }) {
	const { reasonsLoading, reasons = [] } = useListShipmentCancellationReasons();

	const closeModal = () => setShow(false);

	const { loading: updateShipmentLoading, updateShipment } = useUpdateShipment({
		successCallbacks : [closeModal],
		successMsg       : 'Cancellation Requested',
	});

	const { shipment_data } = useContext(ShipmentDetailContext);
	const { id } = shipment_data || {};

	const { control, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = useCallback((data) => {
		updateShipment({
			payload: {
				id,
				state: 'cancelled',
				...getCancelShipmentPayload(data),
			},
		});
	}, [updateShipment, id]);

	let modalContent = null;
	if (reasonsLoading) {
		modalContent = <Loader />;
	} else if (!reasonsLoading && reasons.length === 0) {
		modalContent = <div>No Cancellation Reason found</div>;
	} else {
		modalContent = (
			<>
				<Modal.Body>
					<strong>Please select a reason for cancelling the shipment</strong>
					{errors?.cancellation_reason
						? <div className={styles.error_message}>{errors.cancellation_reason.message}</div>
						: null}
					<RadioGroupController
						name="cancellation_reason"
						control={control}
						options={reasons}
						rules={{ required: 'Cancellation reason is required' }}
					/>

					<div className={styles.label}>Remarks</div>
					{errors?.remarks
						? <div className={styles.error_message}>{errors.remarks.message}</div>
						: null}
					<InputController
						name="remarks"
						control={control}
						rules={{ required: 'Remarks is required' }}
						size="sm"
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						disabled={updateShipmentLoading}
						themeType="secondary"
						onClick={closeModal}
					>
						Cancel
					</Button>

					<Button
						disabled={updateShipmentLoading}
						style={{ marginLeft: 10 }}
						onClick={handleSubmit(onSubmit)}
					>
						Submit
					</Button>
				</Modal.Footer>
			</>
		);
	}

	return (
		<Modal
			show
			onClose={closeModal}
			closeOnOuterClick={false}
			showCloseIcon={false}
			className={styles.customized_modal}
			size="lg"
		>
			<Modal.Header title="CANCEL SHIPMENT" />

			{modalContent}
		</Modal>
	);
}
