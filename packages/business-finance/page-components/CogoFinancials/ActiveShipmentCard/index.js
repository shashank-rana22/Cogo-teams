import React from 'react';

import ParentServicewiseStats from '../Common/ParentServicewiseStats';

import styles from './styles.module.css';

function ActiveShipmentCard({ setActiveShipmentCard = () => {} }) {
	return (
		<div className={styles.active_shipment_card}>
			<ParentServicewiseStats
				setActiveShipmentCard={setActiveShipmentCard}
			/>
		</div>
	);
}

export default ActiveShipmentCard;
