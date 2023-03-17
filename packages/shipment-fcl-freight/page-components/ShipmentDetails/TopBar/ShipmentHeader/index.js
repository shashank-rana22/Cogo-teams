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
					PO Number
					<span style={{ fontWeight: '700', marginLeft: '4px' }}>
						{po_number}
					</span>
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
			<div>
				<Tooltip
					theme="light"
					placement="right"
					content={(
						<div style={{ fontSize: '10px' }}>
							{importer_exporter?.business_name}
						</div>
					)}
				>
					<div className={styles.customer}>{importer_exporter?.business_name}</div>
				</Tooltip>
				<div>
					{handlePoNo()}
				</div>
			</div>
			<div style={{ width: '60%', justifyContent: 'center' }}>
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
