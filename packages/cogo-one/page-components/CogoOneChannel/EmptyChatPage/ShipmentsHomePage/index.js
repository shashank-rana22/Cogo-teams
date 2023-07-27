import React, { useState } from 'react';

import useListShipments from '../../../../hooks/useListShipments';

// import { DUMMY_DATA } from './dummyData'; // need to remove
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';

function ShipmentsHomePage() {
	const [showPocDetails, setShowPocDetails] = useState({});

	const {
		listLoading,
		shipmentsData,
	} = useListShipments();
	console.log('listLoading:', listLoading);

	const { list = [] } = shipmentsData || {};
	return (
		<div className={styles.container}>
			<div className={styles.header_title}>
				Bookings
			</div>

			<div className={styles.shipments_cards_container}>
				{(list || []).map(
					(shipmentItem) => (
						<ShipmentCard
							key={shipmentItem?.sid}
							shipmentItem={shipmentItem}
							showPocDetails={showPocDetails}
							setShowPocDetails={setShowPocDetails}
						/>
					),
				)}
			</div>
		</div>
	);
}

export default ShipmentsHomePage;
