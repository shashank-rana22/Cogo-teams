import { Loader, Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { InputController, RadioGroupController, useForm } from '@cogoport/forms';
import { useContext, useEffect, useMemo } from 'react';

import useListShipmentCancellationReasons from '../../hooks/useListShipmentCancellationReasons';
import useUpdateShipment from '../../hooks/useUpdateShipment';

import getCancelShipmentPayload from './getCancelShipmentPayload';
import styles from './styles.module.css';

const STAKEHOLDER_MAPPING = {
	booking_desk          : 'service_ops1',
	booking_desk_manager  : 'service_ops1',
	document_desk         : 'service_ops2',
	document_desk_manager : 'service_ops2',
	so1_so2_ops           : ['service_ops1', 'service_ops2', 'lastmile_ops'],
};

export default function CancelShipment({ setShow = () => {} }) {
	const closeModal = () => setShow(false);

	const { reasonsLoading, reasons = [], getReasons } = useListShipmentCancellationReasons();

	const { loading: updateShipmentLoading, updateShipment } = useUpdateShipment({
		refetch        : closeModal,
		successMessage : 'Shipment has been cancelled!!',
	});

	const { shipment_data, activeStakeholder } = useContext(ShipmentDetailContext);
	const { id } = shipment_data || {};

	let stakeholder_type = useMemo(() => [activeStakeholder], [activeStakeholder]);

	if (activeStakeholder in STAKEHOLDER_MAPPING) {
		if (Array.isArray(STAKEHOLDER_MAPPING[activeStakeholder])) {
			stakeholder_type =	(STAKEHOLDER_MAPPING[activeStakeholder] || []);
		} else {
			stakeholder_type = [STAKEHOLDER_MAPPING[activeStakeholder]];
		}
	}

	useEffect(() => {
		getReasons({
			filters: {
				shipment_type: 'fcl_freight',
				stakeholder_type,

			},
			shipment_id          : id,
			options_key_required : true,
		});
	}, [id, getReasons, stakeholder_type]);

	const { control, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = (data) => {
		updateShipment(getCancelShipmentPayload(data, id));
	};

	let modalBody = null;
	if (reasonsLoading) {
		modalBody = <Loader />;
	} else if (!reasonsLoading && reasons.length === 0) {
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
					disabled={updateShipmentLoading || reasonsLoading || reasons.length === 0}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
