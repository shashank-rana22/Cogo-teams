import { Modal } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import useShipmentBack from '../../../../../hooks/useShipmentBack';
import Layout from '../../../../Layout';
import Footer from '../Footer';

import styles from './styles.module.css';

function Form({
	upsellableService,
	servicesList,
	shipmentData,
	primary_service,
	closeModal,
	haveToUpsell,
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const { handleShipmentsClick } = useShipmentBack();

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		truckTypeToggle,
		setTruckTypeToggle,
		upsellableService,
	});

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!haveToUpsell}
			closeOnOuterClick={false}
			disabled={haveToUpsell}
			className={styles.custom_modal}
		>
			<Modal.Header title={(
				<div className={styles.header}>

					{ haveToUpsell ? (
						<div
							role="button"
							tabIndex={0}
							className={styles.button}
							onClick={handleShipmentsClick}
						>
							<IcMArrowBack />

						</div>
					) : null}

					{startCase(upsellableService.trade_type)}
					{' '}
					{startCase(service)}
				</div>
			)}
			/>
			<Modal.Body>
				{ controls?.length === 0
					? <div> Are you sure you want to upsell this service?</div>
					: <Layout controls={controls} formProps={formProps} />}
			</Modal.Body>
			<Modal.Footer>
				<Footer
					onClose={closeModal}
					formProps={formProps}
					service={upsellableService}
					shipmentData={shipmentData}
					primary_service={primary_service}
					haveToUpsell={haveToUpsell}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
