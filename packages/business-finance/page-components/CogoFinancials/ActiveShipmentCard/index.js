import React from 'react';

import ClosedGraphStats from '../Common/ClosedGraphStats';
import ParentServicewiseStats from '../Common/ParentServicewiseStats';
import { INFO_CONTENT } from '../constants';

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
	showShipmentList = false,
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
	setTableFilters = () => {},
	isCancelledExcluded = false,
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
			isCancelledExcluded,
		},
		operational: {
			title        : 'Operationally Closed',
			setActiveShipmentCard,
			setShowShipmentList,
			showShipmentList,
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
			defaultWidth : '252',
			setTableFilters,
			infoContent  : INFO_CONTENT.operationallyClosed,
			isCancelledExcluded,
		},
		financial: {
			title        : 'Financially Closed',
			status       : 'financial',
			setActiveShipmentCard,
			setShowShipmentList,
			showShipmentList,
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
			defaultWidth : '252',
			setTableFilters,
			infoContent  : INFO_CONTENT.financiallyClosed,
			isCancelledExcluded,
		},
	};

	const ActiveCard = COMPONENT_KEY_MAPPING[activeShipmentCard];
	return (
		<div className={styles.active_shipment_card}>
			{ActiveCard && (
				<ActiveCard
					key={activeShipmentCard}
					{...PROPS_KEY_MAPPING[activeShipmentCard]}
				/>
			)}
		</div>
	);
}

export default ActiveShipmentCard;
