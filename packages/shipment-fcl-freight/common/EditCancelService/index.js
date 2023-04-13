import { Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useContext } from 'react';

import CancelService from '../CancelService';
import EditParams from '../EditParams';
import SupplierReallocation from '../SupplierReallocation';

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
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const servicesData = (servicesList || []).filter((service) => service.service_type === service_type);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	actionButtons[0].show = getCanEditSupplier({ shipment_data, user_data, state });
	actionButtons[1].show = getCanEditParams({ shipment_data, user_data, serviceData });
	actionButtons[2].show = getCanCancelService({ shipment_data, user_data, state });

	if (!actionButtons.some((actionButton) => actionButton.show)) {
		return null;
	}

	const content = actionButtons.map(({ label, value, show }) => (show ? (
		<div
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
