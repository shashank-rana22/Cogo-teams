import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import styles from './styles.module.css';

function ShipmentInfo() {
	const { shipment_data } = useContext(ShipmentDetailContext);
	return (
		<div className={styles.container}>
			Shipments
			/
			Shipment ID #
			{shipment_data.serial_id}
		</div>
	);
}

export default ShipmentInfo;
