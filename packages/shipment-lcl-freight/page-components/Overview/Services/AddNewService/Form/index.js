import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { AsyncSelectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import useShipmentBack from '../../../../../hooks/useShipmentBack';
import Footer from '../Footer';

import styles from './styles.module.css';

function Form({
	upsellableService = {},
	closeModal = () => {},
	haveToUpsell = false,
}) {
	const { shipment_data, primary_service, servicesList } = useContext(ShipmentDetailContext);
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const { handleShipmentsClick = () => {} } = useShipmentBack();

	const [step, setStep] = useState(1);

	const {
		importer_exporter_id = '',
	} = shipment_data;

	const organization_id = importer_exporter_id;

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		truckTypeToggle,
		setTruckTypeToggle,
		upsellableService,
		organization_id,
	});

	const { errors, formValues, control } = formProps;

	const formOrganizationId = formValues?.organization_id;

	const getModifiedOptions = (option) => option?.options?.map(
		(op) => ({ ...op, custom_key: { user_id: op.user_id, branch_id: op.branch.id } }),
	);

	return (
		<Modal
			show
			onClose={closeModal}
			size="lg"
			showCloseIcon={!haveToUpsell}
			closeOnOuterClick={false}
			className={styles.custom_modal}
		>
			<Modal.Header title={(
				<div className={styles.header}>
					{haveToUpsell ? (
						<div
							role="button"
							tabIndex={0}
							className={styles.button}
							onClick={handleShipmentsClick}
						>
							<IcMArrowBack />
						</div>
					) : null}

					{startCase(upsellableService?.trade_type)}
					{' '}
					{startCase(service)}
				</div>
			)}
			/>

			<Modal.Body>
				{step === 1 ? (
					<>
						<div> Are you sure you want to upsell this service?</div>

						{controls?.length !== 0 ? <Layout fields={controls} errors={errors} control={control} /> : null}
					</>
				) : null }

				{step === 2 ? (
					<AsyncSelectController
						className={styles.select}
						control={control}
						name="user_id"
						asyncKey="organization_users"
						isClearable
						valueKey="custom_key"
						initialCall={false}
						placeholder="Select Organization User"
						params={{
							filters: {
								organization_id : formOrganizationId,
								status          : 'active',
							},
							page_limit: 30,
						}}
						getModifiedOptions={getModifiedOptions}
						rules={{ required: 'User is required' }}
					/>
				) : null}

				{!isEmpty(errors?.user_id)
					? <div className={styles.error}>{errors?.user_id?.message}</div>
					: null}
			</Modal.Body>

			<Modal.Footer>
				<Footer
					onClose={closeModal}
					formProps={formProps}
					service={upsellableService}
					shipmentData={shipment_data}
					primary_service={primary_service}
					haveToUpsell={haveToUpsell}
					step={step}
					setStep={setStep}
					organization_id={formOrganizationId}
					user={formValues?.user_id}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
