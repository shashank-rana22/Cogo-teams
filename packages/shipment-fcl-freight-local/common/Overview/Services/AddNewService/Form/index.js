import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { Layout } from '@cogoport/ocean-modules';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import Footer from '../Footer';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function Form({ upsellableService = {}, closeModal = () => {} }) {
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const service = upsellableService.service_type.replace('_service', '');

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services             : servicesList,
		upsellableService,
		importer_exporter_id : shipment_data?.importer_exporter_id,
	});

	const { errors, control } = formProps;

	return (
		<Modal
			show
			onClose={closeModal}
			size="lg"
			closeOnOuterClick={false}
			className={styles.custom_modal}
		>
			<Modal.Header title={(
				<div className={styles.header}>
					{startCase(upsellableService?.trade_type)}
					{' '}
					{startCase(service)}
				</div>
			)}
			/>

			<Modal.Body>
				{ controls.length === DEFAULT_VALUE ? (
					<div> Are you sure you want to upsell this service?</div>
				) : null }

				{controls.length ? (
					<Layout
						fields={controls}
						errors={errors}
						control={control}
					/>
				) : null}

			</Modal.Body>

			<Modal.Footer>
				<Footer
					onClose={closeModal}
					formProps={formProps}
					service={upsellableService}

				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
