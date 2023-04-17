import { Loader, Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { InputController, RadioGroupController, useForm } from '@cogoport/forms';
import { useContext, useEffect } from 'react';

import useListShipmentCancellationReasons from '../../hooks/useListShipmentCancellationReasons';
import useUpdateShipment from '../../hooks/useUpdateShipment';

import getCancelShipmentPayload from './getCancelShipmentPayload';
import styles from './styles.module.css';

const stakeholderMapping = {
	booking_desk: 'service_ops1',
};

export default function CancelShipment({ setShow }) {
	const closeModal = () => setShow(false);

	const { reasonsLoading, reasons = [], getReasons } = useListShipmentCancellationReasons();

	const { loading: updateShipmentLoading, updateShipment } = useUpdateShipment({
		refetch        : closeModal,
		successMessage : 'Shipment has been cancelled!!',
	});

	const { shipment_data, activeStakeholder } = useContext(ShipmentDetailContext);
	const { id } = shipment_data || {};

	useEffect(() => {
		getReasons({
			filters: {
				shipment_type    : 'fcl_freight',
				stakeholder_type : activeStakeholder in stakeholderMapping
					? stakeholderMapping[activeStakeholder]
					: activeStakeholder,
			},
			shipment_id          : id,
			options_key_required : true,
		});
	}, [id, activeStakeholder, getReasons]);

	const { control, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = (data) => {
		updateShipment(getCancelShipmentPayload(data, id));
	};

	let modalContent = null;
	if (reasonsLoading) {
		modalContent = <Loader />;
	} else if (!reasonsLoading && reasons.length === 0) {
		modalContent = <div className={styles.no_reasons_found}>No cancellation reasons found...</div>;
	} else {
		modalContent = (
			<>
				<Modal.Body>
					<strong>Please select a reason for cancelling the shipment</strong>
					<RadioGroupController
						name="cancellation_reason"
						control={control}
						options={reasons}
						rules={{ required: 'Cancellation reason is required' }}
					/>
					{errors?.cancellation_reason
						? <div className={styles.error_message}>{errors.cancellation_reason.message}</div>
						: null}

					<div className={styles.label}>Remarks</div>
					<InputController
						name="remarks"
						control={control}
						rules={{ required: 'Remarks is required' }}
						size="sm"
					/>
					{errors?.remarks
						? <div className={styles.error_message}>{errors.remarks.message}</div>
						: null}
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
			showCloseIcon={!updateShipmentLoading}
			className={styles.customized_modal}
			size="lg"
		>
			<Modal.Header title="CANCEL SHIPMENT" />

			{modalContent}
		</Modal>
	);
}
