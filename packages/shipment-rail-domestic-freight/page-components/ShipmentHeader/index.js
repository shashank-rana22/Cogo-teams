import { Popover, Tooltip, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useContext, useState } from 'react';

import CargoDetails from '../../commons/CargoDetails';
import PortDetails from '../../commons/PortDetails';
import CancelShipment from '../CancelShipment';

import AddPoNumber from './AddPoNumber';
import Loader from './Loader';
import styles from './styles.module.css';
import getCanCancelShipment from './utils/getCanCancelShipment';

function ShipmentHeader() {
	const user_data = useSelector((({ profile }) => profile?.user));
	const { shipment_data, primary_service, isGettingShipment, stakeholderConfig } = useContext(ShipmentDetailContext);
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { po_number, importer_exporter = {} } = shipment_data || {};

	if (isGettingShipment) {
		return <Loader />;
	}

	const showCancelShipmentIcon = getCanCancelShipment({
		shipment_data,
		primary_service,
		user_data,
		stakeholderConfig,
	});

	return (
		<div className={styles.container}>
			<div className={styles.customer}>
				<Tooltip
					theme="light"
					placement="bottom"
					maxWidth="none"
					interactive
					content={(<div className={styles.tooltip}>{importer_exporter?.business_name}</div>)}
				>
					<div className={styles.business_name}>{importer_exporter?.business_name}</div>
				</Tooltip>

				{po_number ? (
					<div className={styles.po_number}>
						{`PO Number: ${po_number}`}
					</div>
				) : (
					<Button
						className={styles.button}
						themeType="linkUi"
						onClick={() => setShowModal('add_po_number')}
					>
						Add PO Number
					</Button>
				)}
			</div>

			<div className={styles.port_details}>
				<PortDetails data={shipment_data} primary_service={primary_service} />
			</div>

			<div className={styles.tags}>
				<CargoDetails primary_service={primary_service} />
			</div>

			{showCancelShipmentIcon
				? (
					<Popover
						visible={showPopover}
						render={(
							<Button
								className={styles.cancel_button}
								themeType="tertiary"
								onClick={() => { setShowModal('cancel_shipment'); setShowPopover(false); }}
							>
								Cancel Shipment
							</Button>
						)}
						onClickOutside={() => setShowPopover(false)}
						placement="bottom"
						className={styles.popover}
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
