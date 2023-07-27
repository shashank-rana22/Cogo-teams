import React, { useEffect, useState } from 'react';

import useListShipments from '../../../../hooks/useListShipments';

import { DUMMY_DATA } from './dummyData'; // need to remove
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';

function ShipmentsHomePage() {
	const [showPocDetails, setShowPocDetails] = useState({});

	const {
		listLoading,
		shipmentsData,
		getShipmentsList,
	} = useListShipments();

	useEffect(() => {
		getShipmentsList();
	}, [getShipmentsList]);

	console.log('listLoading:', listLoading, shipmentsData);

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
