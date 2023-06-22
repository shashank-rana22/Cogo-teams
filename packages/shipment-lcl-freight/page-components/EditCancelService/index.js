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

const actionButtons = [
	{ label: 'Edit', value: 'supplier_reallocation' },
	{ label: 'Edit Params', value: 'edit_params' },
	{ label: 'Cancel', value: 'cancel' },
];

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

	const closeModal = () => setShowModal(false);

	actionButtons[0].show = getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig });
	actionButtons[1].show = getCanEditParams({ shipment_data, user_data, serviceData, stakeholderConfig });
	actionButtons[2].show = getCanCancelService({ state, stakeholderConfig });

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
			&& <SupplierReallocation closeModal={closeModal} serviceData={servicesData} />}

			{showModal === 'edit_params'
			&& <EditParams closeModal={closeModal} serviceData={serviceData} />}

			{showModal === 'cancel' && 	(
				<CancelService
					closeModal={closeModal}
					trade_type={trade_type}
					service_type={service_type}
				/>
			)}
		</div>
	);
}

export default EditCancelService;
