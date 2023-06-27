import { Popover, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useContext, useState } from 'react';

import CancelShipment from '../CancelShipment';
import CargoDetails from '../CargoDetails';
import PortDetails from '../PortDetails';

import AddPoNumber from './AddPoNumber';
import Loader from './Loader';
import styles from './styles.module.css';
import getCanCancelShipment from './utils/getCanCancelShipment';

function ShipmentHeader() {
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { shipment_data, primary_service, isGettingShipment, stakeholderConfig } = useContext(ShipmentDetailContext);

	const { shipment_header = {} } = stakeholderConfig || {};

	const user_data = useSelector((({ profile }) => profile?.user));

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
					content={(
						<div className={styles.tooltip}>
							{importer_exporter?.business_name}
						</div>
					)}
				>
					<div className={styles.business_name}>

						{importer_exporter?.business_name}
					</div>
				</Tooltip>

				{ shipment_header?.add_po_number ? (
					<div>
						{po_number ? (
							<div className={styles.po_number}>
								PO Number:&nbsp;
								{po_number}
							</div>
						) : (
							<div
								className={styles.button}
								role="button"
								tabIndex={0}
								onClick={() => setShowModal('add_po_number')}
							>
								Add PO Number
							</div>
						)}
					</div>
				) : null}

			</div>

			<div className={styles.port_details}>
				<PortDetails primary_service={primary_service} />
			</div>

			<CargoDetails primary_service={primary_service} />

			{showCancelShipmentIcon
				? (
					<Popover
						visible={showPopover}
						render={(
							<div
								role="button"
								tabIndex={0}
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
