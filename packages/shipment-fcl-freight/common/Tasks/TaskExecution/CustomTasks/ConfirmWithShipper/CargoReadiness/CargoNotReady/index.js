import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import renderLabel from './getServiceLabel';
import planningControls from './planningControls';
import styles from './styles.module.css';

function CargoNotReady({ show, setShow }) {
	const {
		// shipment_data,
		servicesList,
		//  refetch:getShipment = () => {}
	} = useContext(ShipmentDetailContext);
	const onClose = () => setShow(false);

	const fclServices = servicesList?.filter((s) => s?.service_type === 'fcl_freight_service')?.map((service) => ({
		...service,
		label: renderLabel(service),
	}));

	const { control, formState:{ errors }, handleSubmit } = useForm({
		defaultValues: { planning: [{ service_id: '' }] },
	});

	const controls = planningControls({ fclServices });

	const onSubmit = () => {};

	return show ? (
		<Modal
			show={show}
			onClose={onClose}
			size="xl"
			placement="top"
			animate
			closeOnOuterClick={false}
		>
			<Modal.Header title="Create Shipment Plan" />

			<Modal.Body>
				<strong>
					Total Containers Count
				</strong>
				{fclServices.map((service) => (
					<div key={service?.id}>
						<b>
							{' '}
							{service?.label}
						</b>
						{' '}
						-
						{' '}
						{service?.containers_count}
					</div>
				))}

				<div>
					<b>
						<i>
							Note: For remaining containers current shipment params will be updated
						</i>
					</b>
				</div>

				<div>
					<Layout fields={controls} control={control} errors={errors} />
				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.footer}>
					<Button themeType="secondary" onClick={onClose}>Cancel</Button>
					<Button onClick={handleSubmit(onSubmit)}>Create Plan</Button>
				</div>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default CargoNotReady;
