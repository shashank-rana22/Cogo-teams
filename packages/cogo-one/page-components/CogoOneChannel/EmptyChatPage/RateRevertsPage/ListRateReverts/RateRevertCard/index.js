import React from 'react';

import ServiceProviderDetails from './ServiceProviderDetails';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

function RateRevertCard({ cardData = {} }) {
	console.log('cardData:', cardData);

	return (
		<div className={styles.container}>
			<ServiceProviderDetails cardData={cardData} />
			<ShipmentDetails cardData={cardData} />
		</div>
	);
}

export default RateRevertCard;
