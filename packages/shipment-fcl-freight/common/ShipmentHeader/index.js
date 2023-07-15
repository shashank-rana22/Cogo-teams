import { Popover, Tooltip, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useContext, useState } from 'react';

import CancelShipment from '../CancelShipment';
import CargoDetails from '../CargoDetails';
import PortDetails from '../PortDetails';

import AddPoNumber from './AddPoNumber';
import Loader from './Loader';
import styles from './styles.module.css';
import getCanCancelShipment from './utils/getCanCancelShipment';

function ShipmentHeader() {
	const user_data = useSelector((({ profile }) => profile?.user));

	const {
		shipment_data, primary_service,
		isGettingShipment,
		activeStakeholder, stakeholderConfig,
	} = useContext(ShipmentDetailContext);

	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { po_number, importer_exporter = {}, consignee_shipper = {} } = shipment_data || {};

	if (isGettingShipment) {
		return <Loader />;
	}

	const show_po_number = stakeholderConfig?.shipment_header?.show_po_number;

	const showCancelShipmentIcon = getCanCancelShipment({
		shipment_data,
		primary_service,
		user_data,
		activeStakeholder,
		stakeholderConfig,
	});

	const is_igm_desk = !!stakeholderConfig?.shipment_header?.is_igm;

	return (
		<div className={cl`${styles.container} ${is_igm_desk ? styles.igm_desk : ''}`}>
			<div className={styles.customer}>
				<Tooltip
					theme="light"
					placement="bottom"
					maxWidth="none"
					interactive
					content={(
						<div className={styles.tooltip}>
							{activeStakeholder !== 'consignee_shipper_booking_agent'
								? importer_exporter?.business_name
								: consignee_shipper?.business_name}
						</div>
					)}
				>
					<div className={styles.business_name}>

						{activeStakeholder !== 'consignee_shipper_booking_agent'
							? importer_exporter?.business_name
							: consignee_shipper?.business_name}
					</div>
				</Tooltip>

				{show_po_number ? (
					<div>
						{po_number ? (
							<div className={styles.po_number}>
								PO Number:
								{' '}
								{po_number}
							</div>
						) : (
							<div
								className={styles.button}
								role="presentation"
								onClick={() => setShowModal('add_po_number')}
							>
								Add PO Number
							</div>
						)}
					</div>
				) : null }
			</div>

			<div className={styles.port_details}>
				<PortDetails data={shipment_data} primary_service={primary_service} />
			</div>

			<CargoDetails primary_service={primary_service} />

			{showCancelShipmentIcon
				? (
					<Popover
						visible={showPopover}
						render={(
							<div
								role="presentation"
								className={styles.cancel_button}
								onClick={() => { setShowModal('cancel_shipment'); setShowPopover(false); }}
							>
								Cancel Shipment
							</div>
						)}
						onClickOutside={() => setShowPopover(false)}
						placement="bottom"
					>
						<IcMOverflowDot className={styles.three_dot_icon} onClick={() => setShowPopover((p) => !p)} />
					</Popover>
				) : null}

			{showModal === 'add_po_number' ? (
				<AddPoNumber
					setShow={setShowModal}
					shipment_data={shipment_data}
				/>
			) : null}

			{showModal === 'cancel_shipment' ? (
				<CancelShipment setShow={setShowModal} />
			) : null}
		</div>
	);
}

export default ShipmentHeader;
