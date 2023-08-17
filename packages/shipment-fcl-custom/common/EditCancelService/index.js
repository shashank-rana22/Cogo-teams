import { Popover, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useContext } from 'react';

import CancelService from '../CancelService';
import SupplierReallocation from '../SupplierReallocation';

import styles from './styles.module.css';
import getCanCancelService from './utils/getCanCancelService';
import getCanEditSupplier from './utils/getCanEditSupplier';
import { getSideEffectsServices } from './utils/getSideEffectsServices';

function EditCancelService({ serviceData = {} }) {
	const user_data = useSelector((({ profile }) => profile?.user));
	const { shipment_data, servicesList, stakeholderConfig } = useContext(ShipmentDetailContext);

	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { state, trade_type, service_type } = serviceData || {};

	const actionButtons = [
		{
			label : 'Edit',
			value : 'supplier_reallocation',
			show  : getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig }),
		},
		{
			label : 'Cancel',
			value : 'cancel',
			show  : getCanCancelService({ state, stakeholderConfig }),
		},
	];

	const servicesData = getSideEffectsServices({ servicesList, service_type, trade_type });

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	if (!actionButtons.some((actionButton) => actionButton.show)) { return null; }

	const content = actionButtons.map(({ label, value, show }) => (show ? (
		<Button
			key={value}
			themeType="tertiary"
			className={styles.action_button}
			onClick={() => openModal(value)}
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
			>
				<IcMOverflowDot className={styles.three_dots} onClick={() => setShowPopover(!showPopover)} />
			</Popover>

			{showModal === 'supplier_reallocation'
			&& <SupplierReallocation setShow={setShowModal} serviceData={servicesData} />}

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
