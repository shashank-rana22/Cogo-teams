import React from 'react';

import ClosedGraphStats from '../Common/ClosedGraphStats';
import ParentServicewiseStats from '../Common/ParentServicewiseStats';

import styles from './styles.module.css';

const COMPONENT_KEY_MAPPING = {
	ongoing     : ParentServicewiseStats,
	operational : ClosedGraphStats,
	financial   : ClosedGraphStats,
};

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
	const PROPS_KEY_MAPPING = {
		ongoing: {
			setActiveShipmentCard,
			mainCardData,
			taxType,
			activeShipmentCard,
			entity,
			timeRange,
			filter,
			customDate,
		},
		operational: {
			title        : 'Operationally Closed',
			setActiveShipmentCard,
			setShowShipmentList,
			entity,
			timeRange,
			statsType    : 'OPR_CLOSED',
			filter,
			cardData     : operationalData,
			type         : 'Operationally',
			taxType,
			customDate,
			activeBar,
			setActiveBar,
			defaultWidth : '360',
		},
		financial: {
			title        : 'Financially Closed',
			status       : 'financial',
			setActiveShipmentCard,
			setShowShipmentList,
			entity,
			timeRange,
			statsType    : 'FINANCE_CLOSED',
			filter,
			cardData     : financialData,
			type         : 'Financially',
			taxType,
			customDate,
			activeBar,
			setActiveBar,
			defaultWidth : '360',
		},
	};

	const ActiveCard = COMPONENT_KEY_MAPPING[activeShipmentCard];
	return (
		<div className={styles.active_shipment_card}>
			{ActiveCard && (
				<ActiveCard
					{...PROPS_KEY_MAPPING[activeShipmentCard]}
				/>
			)}
		</div>
	);
}

export default ActiveShipmentCard;
