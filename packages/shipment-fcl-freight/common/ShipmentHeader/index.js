import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMCancel } from '@cogoport/icons-react';
import React, { useContext, useState } from 'react';

import CancelShipment from '../CancelShipment';
import CargoDetails from '../CargoDetails';
import PortDetails from '../PortDetails';

import AddPoNumber from './AddPoNumber';
import Loader from './Loader';
import styles from './styles.module.css';

function ShipmentHeader() {
	const [showModal, setShowModal] = useState(false);

	const {
		shipment_data, primary_service, isGettingShipment,
		activeStakeholder = '',
	} = useContext(ShipmentDetailContext);

	const { po_number, importer_exporter } = shipment_data || {};

	if (isGettingShipment) {
		return <Loader />;
	}

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
					<div className={styles.business_name}>{importer_exporter?.business_name}</div>
				</Tooltip>

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
						Add Po Number
					</div>
				)}
			</div>

			<div className={styles.port_details}>
				<PortDetails data={shipment_data} primary_service={primary_service} />
			</div>

			<CargoDetails
				primary_service={primary_service}
			/>

			<IcMCancel className={styles.cancel_button} onClick={() => setShowModal('cancel_shipment')} />

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
