import { Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
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

const ACTION_BUTTONS = [
	{ label: 'Edit', value: 'supplier_reallocation' },
	{ label: 'Edit Params', value: 'edit_params' },
	{ label: 'Cancel', value: 'cancel' },
];

const ZEROTH_INDEX = 0;
const FIRST_INDEX = 1;
const SECOND_INDEX = 2;

function EditCancelService({ serviceData = {} }) {
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { state, trade_type, service_type } = serviceData || {};

	const user_data = useSelector((({ profile }) => profile?.user));
	const { shipment_data, servicesList, stakeholderConfig } = useContext(ShipmentDetailContext);

	const servicesData = (servicesList || []).filter((service) => service.service_type === service_type);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	ACTION_BUTTONS[ZEROTH_INDEX].show = getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig });
	ACTION_BUTTONS[FIRST_INDEX].show = getCanEditParams({ shipment_data, user_data, serviceData, stakeholderConfig });
	ACTION_BUTTONS[SECOND_INDEX].show = getCanCancelService({ state, stakeholderConfig });

	if (!ACTION_BUTTONS.some((actionButton) => actionButton.show)) {
		return null;
	}

	const content = ACTION_BUTTONS.map(({ label, value, show }) => (show ? (
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
			&& <SupplierReallocation closeModal={setShowModal} serviceData={servicesData} />}

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
