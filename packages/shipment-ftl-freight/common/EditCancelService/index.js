import { Popover, Modal, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import CancelService from '../CancelService';
import SupplierReallocation from '../SupplierReallocation';
import VerifyTruck from '../VerifyAssetModal';
import VerifyDriver from '../VerifyDriverModal';

import Consolidation from './Consolidation';
import {
	EditTruckNumberControls,
	EditETAControls,
	EditDriverControls,
} from './Controls';
import Form from './Forms';
import styles from './styles.module.css';
import { ACTION_BUTTON } from './utils/actions';

const DEFAULT_INDEX = GLOBAL_CONSTANTS.zeroth_index;

const EXCLUDED_STATES = ['cn_requested', 'revoked'];
const INVOICE_REQUIRED_STATES = ['pending', 'amendment_requested'];

export const getTrucklistWithId = (all_services) => {
	const servicesList = (all_services || []).filter(
		(service) => service?.service_type !== 'subsidiary_service' && service?.truck_number,
	);

	const truckLists = servicesList.map((service) => ({
		value : service?.id,
		label : service?.truck_number,
		...service,
	}));

	return truckLists;
};
function getDate(date) {
	const tempDate = new Date(date);

	if (date && tempDate.toDateString() !== 'Invalid Date') {
		return tempDate;
	}
	return null;
}

export const getDriverDetails = (all_services) => {
	const servicesList = (all_services || []).filter(
		(service) => service?.truck_number,
	);
	const driverDetails = servicesList.map((service) => (
		{
			service_id          : `${service?.id}`,
			truck_number        : `${service?.truck_number}`,
			driver_name         : `${service?.driver_details?.name}`,
			contact_number      : `${service?.driver_details?.contact}`,
			service_provider_id : `${service?.service_provider_id}`,
		}
	));

	return driverDetails;
};

export const getEtaEtdList = (all_services) => {
	const servicesList = (all_services || []).filter(
		(service) => service?.truck_number,
	);

	const etaEtdList = servicesList.map((service) => ({
		service_id          : `${service?.id}`,
		truck_number        : `${service?.truck_number}`,
		estimated_departure : getDate(service?.estimated_departure),
		estimated_arrival   : getDate(service?.estimated_arrival),
	}));

	return etaEtdList;
};

function EditCancelService({ serviceData = {}, invoicing_parties = [] }) {
	const { state, trade_type, service_type } = serviceData?.[DEFAULT_INDEX] || {};

	const user_data = useSelector((({ profile }) => profile?.user));
	const {
		shipment_data, servicesList, activeStakeholder, refetchServices, refetch,
	} = useContext(ShipmentDetailContext);

	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const servicesData = (servicesList || []).filter(
		(item) => item?.service_type === service_type && item?.trade_type === trade_type,
	);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	const truckList = getTrucklistWithId(serviceData);

	const isTruckPresent =	!isEmpty(truckList || [])
		&& !['cargo_dropped', 'completed'].includes(truckList?.[DEFAULT_INDEX]?.state);

	const filteredInvoices = invoicing_parties?.filter(
		(item) => !EXCLUDED_STATES.includes(item.status),
	);
	let enableConsolidations = false;

	if (!isEmpty(filteredInvoices)) {
		enableConsolidations =	filteredInvoices?.every((invoice) => INVOICE_REQUIRED_STATES.includes(invoice?.status));
	}

	Object.entries(ACTION_BUTTON).forEach(([btnKey, butObj]) => {
		ACTION_BUTTON[btnKey].show = butObj.visibilityFunction({
			shipment_data,
			user_data,
			state,
			activeStakeholder,
			isTruckPresent,
			enableConsolidations,
		});
	});

	if (!Object.values(ACTION_BUTTON).some((actionButton) => actionButton.show)) {
		return null;
	}

	const showEdit = isTruckPresent || enableConsolidations;

	const content = Object.values(ACTION_BUTTON).map((action) => {
		const { label, value, show } = action || {};
		return (
			show ? (
				<Button
					key={value}
					className={styles.action_button}
					tabIndex={DEFAULT_INDEX}
					themeType="secondary"
					onClick={() => openModal(value)}
				>
					{label}
				</Button>
			) : null
		);
	});

	return (
		<div className={styles.container}>
			<Popover
				visible={showPopover}
				interactive
				placement="bottom"
				content={content}
				onClickOutside={() => setShowPopover(false)}
			>
				{showEdit
					? <IcMOverflowDot className={styles.three_dots} onClick={() => setShowPopover(!showPopover)} />
					: null}
			</Popover>

			{showModal === 'supplier_reallocation'
			&& <SupplierReallocation setShow={setShowModal} serviceData={servicesData} />}

			{showModal === 'verify_truck'
			&& (
				<VerifyTruck
					setShow={setShowModal}
					truckList={truckList}
				/>
			)}

			{showModal === 'verify_driver'
			&& (
				<VerifyDriver
					setShow={setShowModal}
					driverList={getDriverDetails(serviceData)}
				/>
			)}

			{showModal === 'cancel' && 	(
				<CancelService
					setShow={setShowModal}
					trade_type={trade_type}
					service_type={service_type}
				/>
			)}

			{showModal === 'edit_truck_number' ? (
				<Modal
					show={showModal}
					onClose={() => setShowModal(false)}
					size="md"
				>
					<Modal.Header title="EDIT TRUCK NUMBER" />
					<Modal.Body>
						<Form
							controls={EditTruckNumberControls}
							heading="EDIT TRUCK NUMBER"
							type="truck_number"
							truckList={truckList}
							refetchServices={refetchServices}
						/>
					</Modal.Body>

				</Modal>
			) : null}

			{showModal === 'edit_eta_etd' ? (
				<Modal
					show={showModal}
					onClose={() => setShowModal(false)}
					size="md"
				>
					<Modal.Header title="EDIT ETA/ETD" />
					<Modal.Body>
						<Form
							controls={EditETAControls}
							heading="EDIT ETA/ETD"
							type="eta"
							etaEtdList={getEtaEtdList(serviceData)}
						/>
					</Modal.Body>

				</Modal>
			) : null}

			{showModal === 'edit_driver_details' ? (
				<Modal
					show={showModal}
					onClose={() => setShowModal(false)}
					size="md"
				>
					<Modal.Header title="EDIT DRIVER DETAILS" />
					<Modal.Body>
						<Form
							controls={EditDriverControls}
							heading="EDIT DRIVER DETAILS"
							type="driver"
							driverDetails={getDriverDetails(serviceData)}
						/>
					</Modal.Body>

				</Modal>
			) : null}

			{showModal === 'enable_consolidation' ? (
				<Modal
					show={showModal}
					onClose={() => setShowModal(false)}
					size="md"
				>
					<Modal.Header title="Enable Consolidations" />
					<Modal.Body>
						<Consolidation
							shipment_data={shipment_data}
							setShowModal={setShowModal}
							servicesList={servicesList}
							refetch={refetch}
						/>
					</Modal.Body>

				</Modal>
			) : null}

		</div>
	);
}

export default EditCancelService;
