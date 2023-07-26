import React from 'react';

import { DUMMY_DATA } from './dummyData'; // need to remove
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';

function ShipmentsHomePage() {
	return (
		<div className={styles.container}>
			<div className={styles.header_title}>
				All Shipments
			</div>

			<div className={styles.shipments_cards_container}>
				{DUMMY_DATA.map(
					(shipmentItem) => (
						<ShipmentCard
							key={shipmentItem?.sid}
							shipmentItem={shipmentItem}
						/>
					),
				)}
			</div>
		</div>
	);
}

export default ShipmentsHomePage;
