import React from 'react';

import ClosedGraphStats from '../Common/ClosedGraphStats';
import ParentServicewiseStats from '../Common/ParentServicewiseStats';

import styles from './styles.module.css';

function ActiveShipmentCard({
	setActiveShipmentCard = () => { },
	activeShipmentCard = '',
	isPreTax = false,
	setShowShipmentList = () => { },
}) {
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
					setShowShipmentList={setShowShipmentList}
					status="operational"
					isPreTax={isPreTax}
				/>
			)}

			{activeShipmentCard === 'financial' && (
				<ClosedGraphStats
					title="Financially Closed"
					status="financial"
					setActiveShipmentCard={setActiveShipmentCard}
					setShowShipmentList={setShowShipmentList}
				/>
			)}
		</div>
	);
}

export default ActiveShipmentCard;
