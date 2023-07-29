import React from 'react';

import ClosedGraphStats from '../Common/ClosedGraphStats';
import ParentServicewiseStats from '../Common/ParentServicewiseStats';

import styles from './styles.module.css';

function ActiveShipmentCard({ setActiveShipmentCard = () => {}, activeShipmentCard = '' }) {
	return (
		<div className={styles.active_shipment_card}>
			{activeShipmentCard === 'ongoing' && (
				<ParentServicewiseStats
					setActiveShipmentCard={setActiveShipmentCard}
				/>
			)}
			{activeShipmentCard === 'operational' && (
				<ClosedGraphStats
					title="Operationally Closed"
					setActiveShipmentCard={setActiveShipmentCard}
				/>
			)}

			{activeShipmentCard === 'financial' && (
				<ClosedGraphStats
					title="Financially Closed"
					setActiveShipmentCard={setActiveShipmentCard}
				/>
			)}
		</div>
	);
}

export default ActiveShipmentCard;
