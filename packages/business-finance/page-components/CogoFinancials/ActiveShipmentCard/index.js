import React from 'react';

import ClosedGraphStats from '../Common/ClosedGraphStats';
import ParentServicewiseStats from '../Common/ParentServicewiseStats';

import styles from './styles.module.css';

function ActiveShipmentCard({
	setActiveShipmentCard = () => {},
	activeShipmentCard = '',
	setShowShipmentList = () => {},
	entity = '',
	timeRange = '',
	filter = {},
	operationalData = [],
	financialData = [],
	taxType = '',
	mainCardData = [],
	customDate = new Date(),
	activeBar = '',
	setActiveBar = () => {},
}) {
	return (
		<div className={styles.active_shipment_card}>
			{activeShipmentCard === 'ongoing' && (
				<ParentServicewiseStats
					setActiveShipmentCard={setActiveShipmentCard}
					mainCardData={mainCardData}
					taxType={taxType}
					activeShipmentCard={activeShipmentCard}
					entity={entity}
					timeRange={timeRange}
					filter={filter}
					customDate={customDate}
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
					customDate={customDate}
					activeBar={activeBar}
					setActiveBar={setActiveBar}
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
					customDate={customDate}
					activeBar={activeBar}
					setActiveBar={setActiveBar}
				/>
			)}
		</div>
	);
}

export default ActiveShipmentCard;
