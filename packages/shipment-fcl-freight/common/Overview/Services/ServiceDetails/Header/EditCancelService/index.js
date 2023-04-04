import { Modal, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import SupplierReallocation from '../../../../../AdditionalServices/components/SupplierReallocation';
import EditParameters from '../../../../../EditParameters';
// import useGetEditParams from '../../../../../../../../hooks/useGetEditParams';
import controls from '../controls.json';

import CancelShipment from './CancelShipment';
import styles from './styles.module.css';

const serviceCancellationStates = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
];

const airEditSupplierStates = [
	'init',
	'awaiting_service_provider_confirmation',
];

const showCancellationStakeholders = [
	'superadmin',
	'service_ops',
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'prod_process owner',
];

function EditCancelService({
	service_type = '',
	id = '',
	state = '',
	isSeller = false,
	serviceData = [],
	serviceList = {},
	refetchServices = () => {},
	refetchList = () => {},
	shipmentData = {},
}) {
	const [cancelService, setCancelService] = useState(false);
	const [show, setShow] = useState(false);
	const [showConsolEdit, setShowConsolEdit] = useState(false);
	const [showContainerEdit, setShowContainerEdit] = useState(false);
	const [showParamEdit, setShowParamEdit] = useState(false);

	// const { showEditButton, newFilteredControls, boxesToShow } = useGetEditParams({ services: serviceList, controls, serviceData });

	// const [{ shipmentData = {} }] = useContext(ShipmentDetailContext);

	// const showConsolEditButton = isRoleAllowed
	// 	&& shipmentData.shipment_type === 'domestic_air_freight'
	// 	&& shipmentData.source === 'consol'
	// 	&& serviceData[0].state === 'cargo_handed_over_at_origin';

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const showEditParams = (
		shipmentData?.shipment_type === 'fcl_freight'
		&& service_type === 'fcl_freight_service'
	);

	const showEditContainerButton =		shipmentData?.shipment_type === 'rail_domestic_freight'
		&& serviceData[0]?.show_edit_params;

	const allowedStakeHolder = shipmentData?.stakeholder_types?.some((e) => showCancellationStakeholders.includes(e));
	const allowedStates = serviceCancellationStates.includes(state);
	const canCancelService = allowedStates && allowedStakeHolder;

	const completedShipment = ['completed', 'cancelled'].includes(state);

	const allowedEmail = ['ajeet@cogoport.com', 'vinod.talapa@cogoport.com'];

	const editSupplier =		(allowedStakeHolder
			&& (shipmentData?.shipment_type === 'air_freight'
				? airEditSupplierStates?.includes(state)
				: serviceCancellationStates?.includes(state)
                || (shipmentData?.serial_id <= 120347 && !completedShipment)))
		|| allowedEmail.includes(user_data.email);

	// const moreInfo =		show
	// 	|| cancelService
	// 	|| showParamEdit
	// 	|| showConsolEdit
	// 	|| showContainerEdit;

	// if (
	// 	!canCancelService
	// 	&& !showEditButton
	// 	&& !editSupplier
	// 	&& !showConsolEditButton
	// 	&& !showEditContainerButton
	// ) {
	// 	return null;
	// }

	const content = (
		<div>
			{true || editSupplier ? (
				<div style={{ width: '100%' }}>
					<div role="button" tabIndex="0" className={styles.text} onClick={() => setShow(true)}>Edit</div>
					{canCancelService
					&& shipmentData?.shipment_type !== 'domestic_air_freight' ? (
						<div className={styles.line} />
						) : null}
				</div>
			) : null}
			{true || canCancelService
			&& shipmentData?.shipment_type !== 'domestic_air_freight' ? (
				<CancelShipment
					id={id}
					state={state}
					setShowCancel={setCancelService}
					showCancel={cancelService}
					onClose={() => setCancelService(false)}
					service_type={service_type}
					isSeller={isSeller}
					isService
					trade_type={serviceData?.[0]?.trade_type}
				/>
				) : null}

			{/* {!showEditButton && showEditParams ? (
				<div style={{ width: '100%' }}>
					{canCancelService || editSupplier ? <div className={styles.line} /> : null}

					<div
						role="button"
						tabIndex="0"
						className={styles.text}
						onClick={() => setShowParamEdit(true)}
					>
						Edit Params
					</div>
				</div>
			) : null} */}
			{/* {showConsolEditButton ? ( */}

			{/* <div style={{ width: '100%' }}>
				{canCancelService || editSupplier ? <div className={styles.line} /> : null}

				<div
					role="button"
					tabIndex="0"
					className={styles.text}
					onClick={() => setShowConsolEdit(true)}
				>
					Edit Params

				</div>
			</div> */}
			{/* ) : null} */}
			{showEditContainerButton ? (
				<div style={{ width: '100%' }}>
					{canCancelService || editSupplier ? <div className={styles.line} /> : null}

					<div role="button" tabIndex="0" className={styles.text} onClick={() => setShowContainerEdit(true)}>
						Edit Container Details
					</div>
				</div>
			) : null}
		</div>
	);

	return (
		<div>
			<Popover
				theme="light"
				content={content}
				className="primary_md"
				placement="bottom"
				interactive
				// visibile={moreInfo}
			>
				<div className={styles.edit_cancel}>
					<IcMOverflowDot
						className={`${state === 'cancelled' ? 'cancel' : 'serviceExist'}`}
					/>
				</div>
			</Popover>
			{showParamEdit ? (
				<Modal
					className="primary lg"
					show={showParamEdit}
					onClose={() => setShowParamEdit(false)}
				>
					{/* <EditParameters
						shipmentData={shipmentData}
						boxesToShow={boxesToShow}
						onCancel={() => setShowParamEdit(false)}
						newFilteredControls={newFilteredControls}
						services={serviceList}
						refetchServices={refetchServices}
					/> */}
				</Modal>
			) : null}
			{showConsolEdit ? (
				<Modal
					className="primary lg"
					show={showConsolEdit}
					onClose={() => setShowConsolEdit(false)}
				>
					{/* <EditConsolParameters
						shipmentData={shipmentData}
						setShowConsolEdit={setShowConsolEdit}
						refetchServices={refetchServices}
						refetchList={refetchList}
					/> */}
					hii2
				</Modal>
			) : null}
			{showContainerEdit ? (
				<Modal
					className="primary xl"
					show={showContainerEdit}
					onClose={() => setShowContainerEdit(false)}
				>
					{/* <EditContainerParameters
						shipmentData={shipmentData}
						setShowContainerEdit={setShowContainerEdit}
						refetchServices={refetchServices}
						refetchList={refetchList}
					/> */}
					hii
				</Modal>
			) : null}
			{show ? (
				<SupplierReallocation
					serviceData={serviceData}
					setShow={setShow}
					show={show}
					isAdditional
					refetchServices={refetchServices}
				/>
			) : null}
		</div>
	);
}

export default EditCancelService;
