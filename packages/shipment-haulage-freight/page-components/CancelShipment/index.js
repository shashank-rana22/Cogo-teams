import { Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import {
	DatepickerController,
	InputController,
	SelectController,
	RadioGroupController,
	useForm,
	AsyncSelectController,
} from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useContext } from 'react';

import useUpdateShipment from '../../hooks/useUpdateShipment';

import getCancelShipmentPayload from './helpers/getCancelShipmentPayload';
import { getRole } from './helpers/getRole';
import getShowElements from './helpers/getShowElements';
import styles from './styles.module.css';
import controls from './utils/shipment-cancel-controls';

const controlTypeMapping = {
	radio        : RadioGroupController,
	datepicker   : DatepickerController,
	text         : InputController,
	select       : SelectController,
	number       : InputController,
	async_select : AsyncSelectController,
};

function FormElement({ name, label, show, errors, type, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element && show ? (
		<div className={cl`${styles.form_element} ${styles[rest.className]}`}>
			{label ? <div className={styles.label}>{label}</div> : null}

			<Element name={name} type={type} {...rest} />

			{errors[name] ? <div className={styles.error_msg}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

export default function CancelShipment({ setShow }) {
	const closeModal = () => setShow(false);
	const { user_role_ids } = useSelector(({ profile }) => ({ user_role_ids: profile?.partner?.user_role_ids }));

	const role = getRole(user_role_ids);

	const { loading: updateShipmentLoading, updateShipment } = useUpdateShipment({
		refetch        : closeModal,
		successMessage : 'Shipment has been cancelled!!',
	});

	const { shipment_data } = useContext(ShipmentDetailContext);
	const { id } = shipment_data || {};

	const { control, formState: { errors }, watch, handleSubmit } = useForm({ shouldUnregister: true });

	const formValues = watch();
	const { cancellation_reason } = formValues;

	const modifiedControls = controls(shipment_data?.state, cancellation_reason)[role] || [];

	const onSubmit = (data) => {
		updateShipment(getCancelShipmentPayload(data, id));
	};

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
					disabled={updateShipmentLoading}
					themeType="secondary"
					onClick={closeModal}
				>
					Cancel
				</Button>

				<Button
					disabled={updateShipmentLoading || modifiedControls.length === 0}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
