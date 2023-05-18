import { Modal } from '@cogoport/components';
import { AsyncSelect, RadioGroupController } from '@cogoport/forms';
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
	activeStakeholder = '',
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const { handleShipmentsClick } = useShipmentBack();

	const [step, setStep] = useState(1);

	const [user, setUser] = useState(null);

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		truckTypeToggle,
		setTruckTypeToggle,
		upsellableService,
	});

	const { consignee_shipper, importer_exporter, importer_exporter_id, consignee_shipper_id } = shipmentData;

	const haveToAskOrgDetails = !['booking_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder)
	&& consignee_shipper_id;

	const organization_id = activeStakeholder === 'consignee_shipper_booking_agent'
		? consignee_shipper_id
		: importer_exporter_id;

	const ORG_OPTIONS = [
		{
			label : consignee_shipper?.business_name,
			value : consignee_shipper_id,
		},
		{
			label : importer_exporter?.business_name,
			value : importer_exporter_id,
		},
	];

	return (
		<Modal
			show
			onClose={closeModal}
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

					{startCase(upsellableService.trade_type)}
					{' '}
					{startCase(service)}
				</div>
			)}
			/>
			<Modal.Body>
				{ controls?.length === 0 && step === 1
					? <div> Are you sure you want to upsell this service?</div> : null }
				{ controls?.length !== 0 && step === 1 ? <Layout controls={controls} formProps={formProps} /> : null}

				{ step === 2 && haveToAskOrgDetails
					? (
						<>
							<div> Choose The organisation for which you want to upsell- </div>
							<RadioGroupController
								options={ORG_OPTIONS}
								control={formProps.control}
								name="org"
								rules={{ required: { value: true, message: 'Organisation is required' } }}
							/>
						</>
					) : null}

				{
					step === 2 ? (
						<AsyncSelect
							className={styles.select}
							asyncKey="organization_users"
							isClearable
							valueKey="custom_key"
							initialCall={false}
							placeholder="Select Organization User"
							value={user}
							params={{
								filters:
								{
									organization_id,
									status: 'active',
								},
								page_limit: 30,
							}}
							getModifiedOptions={(option) => option?.options?.map(
								(op) => ({ ...op, custom_key: { user_id: op.user_id, branch_id: op.branch.id } }),
							)}
							onChange={setUser}
						/>
					) : null
}

			</Modal.Body>
			<Modal.Footer>
				<Footer
					onClose={closeModal}
					formProps={formProps}
					service={upsellableService}
					shipmentData={shipmentData}
					primary_service={primary_service}
					haveToUpsell={haveToUpsell}
					step={step}
					setStep={setStep}
					organization_id={organization_id}
					user={user}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
