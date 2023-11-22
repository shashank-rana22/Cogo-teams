import { Button, Modal, Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { Layout } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import useCreateShipmentPlan from '../../../../../../../hooks/useCreateShipmentPlan';

import checkContainerNumbers from './checkContainerNumbers';
import getCreateContractPayload from './getCreateContractPayload';
import renderLabel from './getServiceLabel';
import planningControls from './planningControls';
import styles from './styles.module.css';

function CargoNotReady({ show = false, setShow = () => {}, task = {} }) {
	const router = useRouter();
	const {
		shipment_data = {},
		servicesList = [],

	} = useContext(ShipmentDetailContext);

	const onClose = () => setShow(false);

	const refetch = () => {
		router.reload();
	};

	const { onCreate = () => {}, loading } = useCreateShipmentPlan({ refetch });

	const fclServices = servicesList?.filter((s) => s?.service_type === 'fcl_freight_service')?.map((service) => ({
		...service,
		label: renderLabel(service),
	}));

	// const totalContainers = fclServices?.reduce((res, service) => res + (service?.containers_count || 0), 0);

	const { control, formState:{ errors }, handleSubmit } = useForm({
		defaultValues: { planning: [{ service_id: '' }] },
	});

	const controls = planningControls({ fclServices });

	const onSubmit = (values) => {
		const check = checkContainerNumbers({ fclServices, formValues: values });

		if (!check) {
			Toast.error('Container Number can\'t be increased');
			return;
		}

		const payload = getCreateContractPayload({ fclServices, formValues: values, shipment_data, task });

		onCreate(payload);
	};

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
					<Button
						themeType="secondary"
						onClick={onClose}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={loading}
					>
						Create Plan
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default CargoNotReady;
