import { Loader, Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { InputController, RadioGroupController, useForm } from '@cogoport/forms';
import { useContext } from 'react';

import CONSTANTS from '../../constants/CONSTANTS';
import useListShipmentCancellationReasons from '../../hooks/useListShipmentCancellationReasons';
import useUpdateShipment from '../../hooks/useUpdateShipment';

import getCancelShipmentPayload from './getCancelShipmentPayload';
import styles from './styles.module.css';

const { EMPTY_LIST_LENGTH } = CONSTANTS;

export default function CancelShipment({ setShow }) {
	const closeModal = () => setShow(false);

	const { loading: updateShipmentLoading, updateShipment } = useUpdateShipment({
		refetch        : closeModal,
		successMessage : 'Shipment has been cancelled!!',
	});

	const { shipment_data, stakeholderConfig = {}, activeStakeholder } = useContext(ShipmentDetailContext);
	const { id } = shipment_data || {};

	const { reasonsLoading, reasons = [] } = useListShipmentCancellationReasons({
		defaultFilters: {
			shipment_type    : 'air_freight',
			stakeholder_type : stakeholderConfig?.cancel_shipment?.list_reasons?.stakeholder_type
			|| [activeStakeholder],
		},
		defaultParams: {
			shipment_id          : id,
			options_key_required : true,
		},
	});

	const { control, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = (data) => {
		updateShipment(getCancelShipmentPayload(data, id));
	};

	let modalBody = null;
	if (reasonsLoading) {
		modalBody = <Loader />;
	} else if (!reasonsLoading && reasons.length === EMPTY_LIST_LENGTH) {
		modalBody = <div className={styles.no_reasons_found}>No cancellation reasons found...</div>;
	} else {
		modalBody = (
			<Modal.Body>
				<strong>Please select a reason for cancelling the shipment</strong>
				<RadioGroupController
					name="cancellation_reason"
					control={control}
					options={reasons}
					rules={{ required: 'Cancellation reason is required' }}
				/>
				{errors?.cancellation_reason
					? <div className={styles.error_message}>{errors.cancellation_reason?.message}</div>
					: null}

				<div className={styles.label}>Remarks</div>
				<InputController
					name="remarks"
					control={control}
					rules={{ required: 'Remarks is required' }}
					size="sm"
				/>
				{errors?.remarks
					? <div className={styles.error_message}>{errors.remarks?.message}</div>
					: null}
			</Modal.Body>
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

			{modalBody}

			<Modal.Footer className={styles.modal_footer}>
				<Button
					disabled={updateShipmentLoading}
					themeType="secondary"
					onClick={closeModal}
				>
					Cancel
				</Button>

				<Button
					disabled={updateShipmentLoading || reasonsLoading || reasons.length === EMPTY_LIST_LENGTH}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
