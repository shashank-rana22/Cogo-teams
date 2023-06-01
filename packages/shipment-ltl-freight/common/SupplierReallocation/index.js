import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import React, { useContext } from 'react';

import useUpdateShipmentService from '../../hooks/useUpdateShipmentService';

import getControls from './getControls';
import styles from './styles.module.css';

const controlsMapping = { asyncSelect: AsyncSelectController };

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
}) {
	const { refetch, refetchServices, primary_service = {} } = useContext(ShipmentDetailContext);
	const { service_provider = {} } = primary_service;

	const serviceObj = serviceData?.[0] || {};
	const { service_type } = serviceObj || {};

	const { defaultValues, controls } = getControls({
		serviceObj,
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
			data                : { service_provider_id: values?.service_provider_id },
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
