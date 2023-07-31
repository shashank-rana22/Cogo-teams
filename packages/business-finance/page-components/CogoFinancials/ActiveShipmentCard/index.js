import React from 'react';

import ClosedGraphStats from '../Common/ClosedGraphStats';
import ParentServicewiseStats from '../Common/ParentServicewiseStats';

import styles from './styles.module.css';

function ActiveShipmentCard({
	setActiveShipmentCard = () => {}, activeShipmentCard = '',
	setShowShipmentList = () => {},
	entity = '',
	timeRange = '',
	filter = {},
	operationalData = [],
	financialData = [],
	taxType = '',
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
					entity={entity}
					timeRange={timeRange}
					statsType="OPR_CLOSED"
					filter={filter}
					cardData={operationalData}
					type="Operationally"
					taxType={taxType}
				/>
			)}

			{activeShipmentCard === 'financial' && (
				<ClosedGraphStats
					title="Financially Closed"
					status="financial"
					setActiveShipmentCard={setActiveShipmentCard}
					setShowShipmentList={setShowShipmentList}
					entity={entity}
					timeRange={timeRange}
					statsType="FINANCE_CLOSED"
					filter={filter}
					cardData={financialData}
					type="Financially"
					taxType={taxType}
				/>
			)}
		</div>
	);
}

export default ActiveShipmentCard;
