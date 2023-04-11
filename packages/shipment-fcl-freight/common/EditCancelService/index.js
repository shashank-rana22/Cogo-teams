import { Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useContext } from 'react';

import CancelService from '../CancelService';
import SupplierReallocation from '../SupplierReallocation';

import getCanCancelService from './getCanCancelService';
import getCanEditSupplier from './getCanEditSupplier';
import styles from './styles.module.css';

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

	const isServiceCancellable = getCanCancelService({ shipment_data, user_data, state });
	const canEditSupplier = getCanEditSupplier({ shipment_data, user_data, state });

	const content = (
		<>
			{canEditSupplier ? (
				<div
					role="button"
					tabIndex={0}
					className={styles.action_button}
					onClick={() => openModal('supplier_reallocation')}
				>
					Edit
				</div>
			) : null}

			{isServiceCancellable ? (
				<div
					role="button"
					tabIndex={0}
					className={styles.action_button}
					onClick={() => openModal('cancel')}
				>
					Cancel
				</div>
			) : null}
		</>
	);

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
				? <SupplierReallocation setShow={setShowModal} serviceData={servicesData} />
				: null}

			{showModal === 'cancel' ? (
				<CancelService
					setShow={setShowModal}
					trade_type={trade_type}
					service_type={service_type}
				/>
			) : null}
		</div>
	);
}

export default EditCancelService;
