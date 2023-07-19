import { cl, Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import {
	DatepickerController,
	InputController,
	SelectController,
	RadioGroupController,
	useForm,
	AsyncSelectController,
} from '@cogoport/forms';
import { useContext } from 'react';

import controls from '../../configurations/shipment-cancel-controls';
import useCancelEBookingShipment from '../../hooks/useCancelEBookingShipment';
import useUpdateShipment from '../../hooks/useUpdateShipment';

import getCancelShipmentPayload from './getCancelShipmentPayload';
import getShowElements from './getShowElements';
import styles from './styles.module.css';

const CONTROL_TYPE_MAPPING = {
	radio        : RadioGroupController,
	datepicker   : DatepickerController,
	text         : InputController,
	select       : SelectController,
	number       : InputController,
	async_select : AsyncSelectController,
};

function FormElement({ name, label, show, errors, type, ...rest }) {
	if (name === 'better_quotation_label' && show) {
		return (
			<div className={cl`${styles.form_element} ${styles[rest.className]}`}>
				{label ? <div className={styles.label}>{label}</div> : null}
			</div>
		);
	}

	const Element = CONTROL_TYPE_MAPPING[type];

	return Element && show ? (
		<div className={cl`${styles.form_element} ${styles[rest.className]}`}>
			{label ? <div className={styles.label}>{label}</div> : null}

			<Element name={name} type={type} {...rest} />

			{errors[name] ? <div className={styles.error_msg}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

export default function CancelShipment({ setShow }) {
	const { shipment_data, stakeholderConfig = {} } = useContext(ShipmentDetailContext);

	const closeModal = () => setShow(false);

	const { cancelEBooking, loading: cancelEBookingLoading } = useCancelEBookingShipment(shipment_data);

	const { loading: updateShipmentLoading, updateShipment } = useUpdateShipment({
		refetch        : closeModal,
		successMessage : 'Shipment has been cancelled!!',
		cancelEBooking,
		shipment_data,
	});

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
					? (modifiedControls || []).map((ctrl) => (
						<FormElement
							key={ctrl.name}
							show={showElements[ctrl.name]}
							control={control}
							errors={errors}
							{...ctrl}
						/>
					))
					: <div className={styles.no_reasons_found}>No cancellation reasons found...</div> }
			</Modal.Body>

			<Modal.Footer className={styles.modal_footer}>
				<Button
					disabled={updateShipmentLoading || cancelEBookingLoading}
					themeType="secondary"
					onClick={closeModal}
				>
					Cancel
				</Button>

				<Button
					disabled={updateShipmentLoading || cancelEBookingLoading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
