import { Layout } from '@cogoport/air-modules';
import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
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

	let rednerForm = (
		<Layout
			fields={controls}
			errors={errors}
			control={control}
		/>
	);

	if (!controls.length) {
		rednerForm = (
			<div>
				{`Are you sure you want to add ${startCase(
					`${upsellableService?.trade_type === 'export' ? 'origin' : 'destination'} ${service}`,
				)} service?`}

			</div>
		);
	}

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
					Add
					{' '}
					{startCase(upsellableService?.trade_type === 'export' ? 'origin' : 'destination')}
					{' '}
					{startCase(service)}
				</div>
			)}
			/>

			<Modal.Body>
				{rednerForm}
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
