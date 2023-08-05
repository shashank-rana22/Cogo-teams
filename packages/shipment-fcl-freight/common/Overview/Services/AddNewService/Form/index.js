import { Button, Modal } from '@cogoport/components';
import { AsyncSelectController, RadioGroupController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Layout, useShipmentBack } from '@cogoport/ocean-modules';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import Footer from '../Footer';

import DestinationPortStep from './DestinationPortStep';
import styles from './styles.module.css';

const KAM_AGENTS = ['booking_agent', 'consignee_shipper_booking_agent'];
const FIRST_STEP = 1;
const SECOND_STEP = 2;

function Form({
	upsellableService = {},
	servicesList = [],
	shipmentData = {},
	primary_service = {},
	closeModal = () => {},
	haveToUpsell = false,
	activeStakeholder = '',
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const { handleShipmentsClick = () => {} } = useShipmentBack();

	const [step, setStep] = useState(FIRST_STEP);

	const {
		consignee_shipper = {},
		importer_exporter = {},
		importer_exporter_id = '',
		consignee_shipper_id = '',
	} = shipmentData;

	const {
		destination_port = {},
		cargo_details = [],
		trade_type = '',
		inco_term = '',
	} = primary_service;

	const { name: destination_port_name = '' } = destination_port;

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

	const { errors, formValues, control, resetField } = formProps;

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
		(op) => ({ ...op, custom_key: `${op.user_id}:${op.branch.id}` }),
	);

	const [customValueUserId, customValueBranchId] = (formValues?.user_id || '').split(':');

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
						<Button
							themeType="tertiary"
							onClick={handleShipmentsClick}
						>
							<IcMArrowBack height={16} width={16} />
						</Button>
					) : null}

					{startCase(upsellableService.trade_type)}
					{' '}
					{startCase(service)}
				</div>
			)}
			/>

			<Modal.Body className={styles.modal_body}>
				{isEmpty(controls) && step === FIRST_STEP ? (
					<DestinationPortStep
						cargoDetails={{
							...(cargo_details[GLOBAL_CONSTANTS.zeroth_index] || {}),
							trade_type,
							inco_term,
						}}
						destination_port_name={destination_port_name}
					/>
				) : null }

				{!isEmpty(controls) && step === FIRST_STEP ? (
					<Layout
						control={control}
						errors={errors}
						fields={controls}
					/>
				) : null }

				{step === SECOND_STEP && haveToAskOrgDetails ? (
					<>
						<div> Choose the organisation for which you want to upsell - </div>

						<RadioGroupController
							options={orgOptions}
							control={formProps.control}
							name="organization_id"
							onChange={() => resetField('user_id')}
							rules={{ required: 'Organisation is required' }}
						/>
					</>
				) : null}

				{step === SECOND_STEP ? (
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
					shipmentData={shipmentData}
					primary_service={primary_service}
					haveToUpsell={haveToUpsell}
					step={step}
					setStep={setStep}
					organization_id={formOrganizationId}
					user={{ user_id: customValueUserId, branch_id: customValueBranchId }}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
