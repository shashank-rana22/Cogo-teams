import { Popover, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useContext } from 'react';

import CancelService from '../CancelService';
import SupplierReallocation from '../SupplierReallocation';
import VerifyTruck from '../VerifyAssetModal';
import VerifyDriver from '../VerifyDriverModal';

import {
	EditTruckNumberControls,
	EditETAControls,
	EditDriverControls,
} from './Controls';
import Form from './Forms';
import styles from './styles.module.css';
import getCanCancelService from './utils/getCanCancelService';
import getCanEditSupplier from './utils/getCanEditSupplier';
import getEditServiceDetails from './utils/getEditServiceDetails';

const actionButtons = [
	{ label: 'Edit Supplier', value: 'supplier_reallocation' },
	{ label: 'Edit Truck Number', value: 'edit_truck_number' },
	{ label: 'Edit ETA/ETD', value: 'edit_eta_etd' },
	{ label: 'Edit Driver Details', value: 'edit_driver_details' },
	{ label: 'Verify Truck', value: 'verify_truck' },
	{ label: 'Verify Driver', value: 'verify_driver' },
	{ label: 'Cancel', value: 'cancel' },
];

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

function EditCancelService({ serviceData = {} }) {
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { state, trade_type, service_type } = serviceData?.[0] || {};

	const user_data = useSelector((({ profile }) => profile?.user));
	const { shipment_data, servicesList, activeStakeholder, refetchServices } = useContext(ShipmentDetailContext);

	const servicesData = (servicesList || []).filter((service) => service.service_type === service_type);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	actionButtons[0].show = getCanEditSupplier({ shipment_data, user_data, state, activeStakeholder });
	actionButtons[1].show = getEditServiceDetails({ state, activeStakeholder });
	actionButtons[2].show = getEditServiceDetails({ state, activeStakeholder });
	actionButtons[3].show = getEditServiceDetails({ state, activeStakeholder });
	actionButtons[4].show = getEditServiceDetails({ state, activeStakeholder });
	actionButtons[5].show = getEditServiceDetails({ state, activeStakeholder });
	actionButtons[6].show = getCanCancelService({ state, activeStakeholder });

	if (!actionButtons.some((actionButton) => actionButton.show)) {
		return null;
	}

	const content = actionButtons.map(({ label, value, show }) => (show ? (
		<div
			key={value}
			role="button"
			tabIndex={0}
			className={styles.action_button}
			onClick={() => openModal(value)}
		>
			{label}
		</div>
	) : null));

	return (
		<div className={styles.container}>
			<Popover
				visible={showPopover}
				interactive
				placement="bottom"
				content={content}
				onClickOutside={() => setShowPopover(false)}
			>
				<IcMOverflowDot className={styles.three_dots} onClick={() => setShowPopover(!showPopover)} />
			</Popover>

			{showModal === 'supplier_reallocation'
			&& <SupplierReallocation setShow={setShowModal} serviceData={servicesData} />}

			{showModal === 'verify_truck'
			&& (
				<VerifyTruck
					setShow={setShowModal}
					truckList={getTrucklistWithId(serviceData)}
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
							truckList={getTrucklistWithId(serviceData)}
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

		</div>
	);
}

export default EditCancelService;
