import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext } from 'react';

import controls from '../../configurations/shipment-cancel-controls';
import useUpdateShipment from '../../hooks/useUpdateShipment';

import getCancelShipmentPayload from './getCancelShipmentPayload';
import getShowElements from './getShowElements';
import styles from './styles.module.css';

export default function CancelShipment({ setShow }) {
	const closeModal = () => setShow(false);

	const { loading: updateShipmentLoading, updateShipment } = useUpdateShipment({
		refetch        : closeModal,
		successMessage : 'Shipment has been cancelled!!',
	});

	const { shipment_data, stakeholderConfig = {} } = useContext(ShipmentDetailContext);
	const { id } = shipment_data || {};

	const role = stakeholderConfig?.cancel_shipment?.role || '';

	const { control, formState: { errors }, watch, handleSubmit } = useForm();

	const formValues = watch();
	const { cancellation_reason } = formValues;

	const onSubmit = (data) => {
		updateShipment(getCancelShipmentPayload(data, id));
	};

	const modifiedControls = controls(shipment_data?.state, cancellation_reason)[role] || [];

	const showElements = getShowElements(formValues) || {};

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

			<Modal.Body className={styles.form_container}>
				{modifiedControls?.length
					?				(
						<Layout
							fields={modifiedControls}
							control={control}
							errors={errors}
							showElements={showElements}
						/>
					)
					: <div className={styles.no_reasons_found}>No cancellation reasons found...</div> }
			</Modal.Body>

			<Modal.Footer className={styles.modal_footer}>
				<Button
					disabled={updateShipmentLoading}
					themeType="secondary"
					onClick={closeModal}
				>
					Cancel
				</Button>

				<Button
					disabled={updateShipmentLoading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
