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

const actionButtons = [
	{ label: 'Edit', value: 'supplier_reallocation' },
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

function EditCancelService({ serviceData = {} }) {
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { state, trade_type, service_type } = serviceData || {};

	const user_data = useSelector((({ profile }) => profile?.user));
	const { shipment_data, servicesList, activeStakeholder } = useContext(ShipmentDetailContext);

	const servicesData = (servicesList || []).filter((service) => service.service_type === service_type);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	actionButtons[0].show = getCanEditSupplier({ shipment_data, user_data, state, activeStakeholder });
	actionButtons[1].show = true;
	actionButtons[2].show = true;
	actionButtons[3].show = true;
<<<<<<< HEAD
	// actionButtons[4].show = true;
	// actionButtons[4].show = getCanCancelService({ state, activeStakeholder });
=======
	actionButtons[4].show = true;
	actionButtons[5].show = getCanCancelService({ state, activeStakeholder });
>>>>>>> c27f12bb7f63d1033eb0ecab85a80d8fb15108c1

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
			{console.log('serviceData', serviceData)}
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

			{showModal ? (
				<Modal
					show={showModal}
					onClose={() => setShowModal(false)}
					size="md"
				>
					<Modal.Header title="ADD INVOICING PARTY" />
					<Modal.Body>
						<Form
							controls={EditTruckNumberControls}
							heading="EDIT TRUCK NUMBER"
							type="truck_number"
							truckList={getTrucklistWithId(serviceData)}
							// refetchServices={refetchServices}
						/>
					</Modal.Body>

				</Modal>
			) : null}

		</div>
	);
}

export default EditCancelService;
