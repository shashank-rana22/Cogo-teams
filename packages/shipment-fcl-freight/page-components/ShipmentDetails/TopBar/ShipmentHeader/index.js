import { Button, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext, useState } from 'react';

import CargoDetails from '../../../../common/CargoDetails';

import AddPoNumber from './AddPoNumber';
import Loader from './Loader';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

function ShipmentHeader() {
	const [show, setShow] = useState(false);
	const { shipment_data, primary_service, isGettingShipment, refetch } = useContext(ShipmentDetailContext);

	const { po_number, importer_exporter } = shipment_data || {};

	const handlePoNo = () => {
		if (po_number) {
			return (
				<div className={styles.po_number}>
					PO Number :
					{' '}
					{po_number}
				</div>
			);
		}

		if (
			!po_number
		) {
			return (
				<Button onClick={() => setShow(true)}>
					Add Po Number
				</Button>
			);
		}

		return null;
	};

	if (isGettingShipment) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.customer}>
				<Tooltip
					theme="light"
					placement="right"
					maxWidth="none"
					content={(
						<div style={{ fontSize: '10px' }}>
							{importer_exporter?.business_name}
						</div>
					)}
				>
					<div>{importer_exporter?.business_name}</div>
				</Tooltip>
				<div>
					{handlePoNo()}
				</div>
			</div>
			<div className={styles.port_details}>
				<PortDetails data={shipment_data} primary_service={primary_service} />
			</div>
			<CargoDetails
				primary_service={primary_service}
			/>

			{/* <Cancellation /> */}
			{show ? (
				<AddPoNumber show={show} setShow={setShow} shipment_data={shipment_data} refetch={refetch} />
			) : null}
		</div>

	);
}

export default ShipmentHeader;
