import { Button, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useContext } from 'react';

import SupplierReallocation from '../../commons/SupplierReallocation';
import CancelService from '../CancelService';
import EditContainerDetails from '../EditContainerDetails';
import EditParams from '../EditParams';

import styles from './styles.module.css';
import getCanCancelService from './utils/getCanCancelService';
import getCanEditContainerDetails from './utils/getCanEditContainerDetails';
import getCanEditParams from './utils/getCanEditParams';
import getCanEditSupplier from './utils/getCanEditSupplier';

const ACTION_BUTTON_ITEMS = ['editButton', 'editParamButton', 'cancelButton', 'editContainerDetailsButton'];

const actionButtons = {
	editButton                 : { label: 'Edit', value: 'supplier_reallocation' },
	editParamButton            : { label: 'Edit Params', value: 'edit_params' },
	editContainerDetailsButton : { label: 'Edit Container Details', value: 'edit_container_details' },
	cancelButton               : { label: 'Cancel', value: 'cancel' },
};

function EditCancelService({ serviceData = {} }) {
	const user_data = useSelector((({ profile }) => profile?.user));
	const { shipment_data, servicesList, stakeholderConfig } = useContext(ShipmentDetailContext);
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { state, trade_type, service_type } = serviceData || {};

	const servicesData = (servicesList || []).filter((service) => service.service_type === service_type);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	actionButtons.editButton.show = getCanEditSupplier({
		shipment_data,
		user_data,
		state,
		stakeholderConfig,
	});
	actionButtons.editParamButton.show = getCanEditParams({
		shipment_data,
		user_data,
		serviceData,
		stakeholderConfig,
	});
	actionButtons.editContainerDetailsButton.show = getCanEditContainerDetails({
		shipment_data,
		user_data,
		serviceData,
		stakeholderConfig,
	});
	actionButtons.cancelButton.show = getCanCancelService({ state, stakeholderConfig });

	if (!ACTION_BUTTON_ITEMS.some((actionButtonName) => actionButtons[actionButtonName].show)) {
		return null;
	}

	const content = ACTION_BUTTON_ITEMS.map((actionButtonName) => {
		const { label, value, show } = actionButtons[actionButtonName];
		return (show ? (
			<Button
				key={value}
				className={styles.action_button}
				onClick={() => openModal(value)}
				themeType="tertiary"
				size="md"
			>
				{label}
			</Button>
		) : null);
	});

	return (
		<div className={styles.container}>
			<Popover
				visible={showPopover}
				interactive
				placement="bottom"
				content={content}
				onClickOutside={() => setShowPopover(false)}
				className={styles.popover}
			>
				<IcMOverflowDot className={styles.three_dots} onClick={() => setShowPopover(!showPopover)} />
			</Popover>

			{showModal === 'supplier_reallocation'
			&& <SupplierReallocation setShow={setShowModal} serviceData={servicesData} />}

			{showModal === 'edit_params'
			&& <EditParams setShow={setShowModal} serviceData={serviceData} />}

			{showModal === 'cancel' && 	(
				<CancelService
					setShow={setShowModal}
					trade_type={trade_type}
					service_type={service_type}
				/>
			)}

			{showModal === 'edit_container_details'
			&& <EditContainerDetails setShow={setShowModal} serviceData={serviceData} />}

		</div>
	);
}

export default EditCancelService;
