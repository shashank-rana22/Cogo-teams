import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { InputController, SelectController, AsyncSelectController, useForm } from '@cogoport/forms';
import { useContext } from 'react';

import useUpdateShipmentService from '../../hooks/useUpdateShipmentService';

import getControls from './getControls';
import styles from './styles.module.css';

const controlsMapping = { asyncSelect: AsyncSelectController, select: SelectController, number: InputController };
const INITIAL_STATE = 0;

function FormElement(props) {
	const { name, type, label, errors } = props || {};
	const Element = controlsMapping[type];

	if (type in controlsMapping) {
		return (
			<div>
				<div className={styles.label}>{label}</div>
				<Element {...props} />
				{errors[name] && (<span className={styles.errors}>{errors[name].message}</span>)}
			</div>
		);
	}
	return null;
}

function SupplierReallocation({
	serviceData = [],
	setShow = () => {},
	isAdditional = false,
}) {
	const { shipment_data, refetch, refetchServices, primary_service = {} } = useContext(ShipmentDetailContext);
	const { service_provider = {} } = primary_service;

	const { documents, shipment_type, trade_type = '', payment_term = '' } = shipment_data || {};

	const serviceObj = serviceData?.[INITIAL_STATE] || {};
	const { service_type } = serviceObj || {};

	const { defaultValues, controls, showAllControls } = getControls({
		serviceObj,
		shipment_type,
		documents,
		isAdditional,
		trade_type,
		payment_term,
	});

	const { handleSubmit, control, formState: { errors } } = useForm({ defaultValues });

	const afterUpdateRefetch = () => {
		refetch();
		refetchServices();
		setShow(false);
	};

	const {
		apiTrigger, loading,
	} = useUpdateShipmentService({
		refetch        : afterUpdateRefetch,
		successMessage : 'Service updated successfully!',
	});

	const onUpdate = (values) => {
		const payload = {
			ids                 : serviceData?.map((item) => item?.id),
			data                : { ...values },
			service_type,
			performed_by_org_id : service_provider?.id,
		};
		apiTrigger(payload);
	};

	const closeModal = () => setShow(false);

	return (
		<Modal
			show
			onClose={closeModal}
			className={styles.custom_modal}
			closeOnOuterClick={false}
			showCloseIcon={!loading}
		>
			<Modal.Body>
				<Modal.Header title={(
					<div className={styles.header}>
						Supplier Reallocation
						{showAllControls ? ' & BL Details' : null}
					</div>
				)}
				/>

				<div className={styles.form_wrapper}>
					{controls.map((ctrl) => (
						<FormElement
							key={ctrl?.name}
							{...ctrl}
							control={control}
							errors={errors}
						/>
					))}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={closeModal}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					className="reviewed"
					onClick={handleSubmit(onUpdate)}
					disabled={loading}
				>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SupplierReallocation;
