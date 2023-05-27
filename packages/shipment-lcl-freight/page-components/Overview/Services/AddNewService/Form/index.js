import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { AsyncSelectController } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import { startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import Footer from '../Footer';

import styles from './styles.module.css';

function Form({ upsellableService = {}, closeModal = () => {} }) {
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '' } = shipment_data;

	const service = upsellableService.service_type.replace('_service', '');

	const [step, setStep] = useState(1);

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		upsellableService,
		importer_exporter_id,
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
				{step === 1 && controls?.step1 ? (
					<>
						<div> Are you sure you want to upsell this service?</div>

						{controls.step1?.length ? (
							<Layout
								fields={controls.step1}
								errors={errors}
								control={control}
							/>
						) : null}
					</>
				) : null }

				{step === 2 && controls?.step2 ? (
					<>
						<AsyncSelectController {...controls.step2} />

						{errors?.user_id ? <div className={styles.error}>{errors?.user_id?.message}</div> : null}
					</>
				) : null}

			</Modal.Body>

			<Modal.Footer>
				<Footer
					onClose={closeModal}
					formProps={formProps}
					service={upsellableService}
					step={step}
					setStep={setStep}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
