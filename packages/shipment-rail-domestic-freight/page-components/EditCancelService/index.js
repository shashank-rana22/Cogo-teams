import { Button, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useContext } from 'react';

import SupplierReallocation from '../../commons/SupplierReallocation';
import CancelService from '../CancelService';
import EditParams from '../EditParams';

import styles from './styles.module.css';
import getCanCancelService from './utils/getCanCancelService';
import getCanEditParams from './utils/getCanEditParams';
import getCanEditSupplier from './utils/getCanEditSupplier';

const actionButtons = [
	{ label: 'Edit', value: 'supplier_reallocation' },
	{ label: 'Edit Params', value: 'edit_params' },
	{ label: 'Cancel', value: 'cancel' },
];
const PRIMARY_BUTTON_INDEX = 1;
const SECONDARY_BUTTON_INDEX = 2;

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

	actionButtons[GLOBAL_CONSTANTS.zeroth_index].show = getCanEditSupplier({
		shipment_data,
		user_data,
		state,
		stakeholderConfig,
	});
	actionButtons[PRIMARY_BUTTON_INDEX].show = getCanEditParams({
		shipment_data,
		user_data,
		serviceData,
		stakeholderConfig,
	});
	actionButtons[SECONDARY_BUTTON_INDEX].show = getCanCancelService({ state, stakeholderConfig });

	if (!actionButtons.some((actionButton) => actionButton.show)) {
		return null;
	}

	const content = actionButtons.map(({ label, value, show }) => (show ? (
		<Button
			key={value}
			className={styles.action_button}
			onClick={() => openModal(value)}
			themeType="tertiary"
			size="md"
		>
			{label}
		</Button>
	) : null));

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
		</div>
	);
}

export default EditCancelService;
