import React from 'react';

import CargoDetails from '../../../commons/CargoDetails';
import PortDetails from '../../../commons/revenueDeskCommons/Card/PortDetails';
import Cancellation from '../Cancellation';

import styles from './styles.module.css';

function ShipmentDetails({
	data = {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.id}>
				<div style={{ fontWeight: 600 }}>
					{data.importer_exporter.business_name}
				</div>
				Shipment ID #
				<strong>{data.serial_id}</strong>
			</div>

			<div className={styles.line} />

			<PortDetails data={data} />

			<div className={styles.line} />

			<div className={styles.cargo_details_container}>
				<CargoDetails data={data} />
			</div>

			{data.shipment_type === 'fcl_freight' ? (
				<Cancellation
					data={data}
					refetch={refetch}
					setShowBookingOption={setShowBookingOption}
				/>
			) : null}
		</div>
	);
}

export default ShipmentDetails;
