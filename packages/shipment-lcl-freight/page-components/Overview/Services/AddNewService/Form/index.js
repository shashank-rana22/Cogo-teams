import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { Layout } from '@cogoport/ocean-modules';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import Footer from '../Footer';

import styles from './styles.module.css';

function Form({ upsellableService = {}, closeModal = () => {} }) {
	const { servicesList } = useContext(ShipmentDetailContext);

	const service = upsellableService.service_type.replace('_service', '');

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		upsellableService,
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
				{!controls.length ? <div> Are you sure you want to upsell this service?</div> : null}

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
