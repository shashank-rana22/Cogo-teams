import { Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState, useContext } from 'react';

import CancelService from '../CancelService';
import EditParams from '../EditParams';
import SupplierReallocation from '../SupplierReallocation';

import styles from './styles.module.css';
import getCanCancelService from './utils/getCanCancelService';
import getCanEditParams from './utils/getCanEditParams';
import getCanEditSupplier from './utils/getCanEditSupplier';

const ACTION_BUTTONS = [
	{ label: 'Edit', value: 'supplier_reallocation' },
	{ label: 'Edit Params', value: 'edit_params' },
	{ label: 'Cancel', value: 'cancel' },
];

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

	ACTION_BUTTONS[0].show = getCanEditSupplier({ shipment_data, user_data, state, activeStakeholder });
	ACTION_BUTTONS[1].show = getCanEditParams({ shipment_data, user_data, serviceData, activeStakeholder });
	ACTION_BUTTONS[2].show = getCanCancelService({ shipment_data, user_data, state, activeStakeholder });

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
			&& <SupplierReallocation setShow={setShowModal} serviceData={servicesData} isAdditional />}

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
