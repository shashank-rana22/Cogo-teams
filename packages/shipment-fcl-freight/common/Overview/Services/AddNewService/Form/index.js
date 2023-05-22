import { Modal } from '@cogoport/components';
import { AsyncSelectController, RadioGroupController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import useShipmentBack from '../../../../../hooks/useShipmentBack';
import Layout from '../../../../Layout';
import Footer from '../Footer';

import styles from './styles.module.css';

const KAM_AGENTS = ['booking_agent', 'consignee_shipper_booking_agent'];

function Form({
	upsellableService = {},
	servicesList,
	shipmentData = {},
	primary_service,
	closeModal = () => {},
	haveToUpsell,
	activeStakeholder = '',
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const { handleShipmentsClick = () => {} } = useShipmentBack();

	const [step, setStep] = useState(1);

	const { consignee_shipper, importer_exporter, importer_exporter_id, consignee_shipper_id } = shipmentData;

	const haveToAskOrgDetails = !KAM_AGENTS.includes(activeStakeholder) && consignee_shipper_id;

	const organization_id = activeStakeholder === 'consignee_shipper_booking_agent'
		? consignee_shipper_id
		: importer_exporter_id;

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		truckTypeToggle,
		setTruckTypeToggle,
		upsellableService,
		organization_id,
	});

	const { errors, formValues } = formProps;

	const formOrganizationId = formValues?.organization_id;

	const orgOptions = [
		{
			label : consignee_shipper?.business_name,
			value : consignee_shipper_id,
		},
		{
			label : importer_exporter?.business_name,
			value : importer_exporter_id,
		},
	];

	const getModifiedOptions = (option) => option?.options?.map(
		(op) => ({ ...op, custom_key: { user_id: op.user_id, branch_id: op.branch.id } }),
	);

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

					{startCase(upsellableService?.trade_type)}
					{' '}
					{startCase(service)}
				</div>
			)}
			/>

			<Modal.Body>
				{ controls?.length === 0 && step === 1
					? (
						<>
							<div> Are you sure you want to upsell this service?</div>

							<Layout controls={controls} formProps={formProps} />
						</>
					)
					: null }

				{ step === 2 && haveToAskOrgDetails
					? (
						<>
							<div> Choose The organisation for which you want to upsell- </div>

							<RadioGroupController
								options={orgOptions}
								control={formProps.control}
								name="organization_id"
								rules={{ required: 'Organisation is required' }}
							/>
						</>
					) : null}

				{
					step === 2 ? (
						<AsyncSelectController
							className={styles.select}
							control={formProps.control}
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
					) : null
}

				{!isEmpty(errors?.user_id)
					? <div className={styles.error}>{errors?.user_id?.message}</div>
					: null}
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
					organization_id={formOrganizationId}
					user={formValues?.user_id}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
