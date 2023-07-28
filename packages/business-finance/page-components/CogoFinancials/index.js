import { Select, Toggle } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import SegmentedControl from '../commons/SegmentedControl/index.tsx';

import ClosedShipmentCard from './ClosedShipmentCard/index';
import StatsCard from './Common/StatsCard';
import MultipleFilters from './MultipleFilters';
import ReceivablesOutstandings from './ReceivablesOutstandings';
import styles from './styles.module.css';

const TIME_RANGE_OPTIONS = [
	{ label: '1D', value: '1D' },
	{ label: '1W', value: '1W' },
	{ label: '1M', value: '1M' },
	{ label: '6M', value: '6M' },
	{ label: '1Y', value: '1Y' },
];

const geo = getGeoConstants();
const countryCode = geo?.country.code;
const DEFAULT_ENTITY_DATA = Object.values(GLOBAL_CONSTANTS.cogoport_entities)?.filter(
	(item) => item.country_code === countryCode,
);
const DEFAULT_ENTITY = DEFAULT_ENTITY_DATA[GLOBAL_CONSTANTS.zeroth_index]?.default_entity_code;

const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((item) => ({
	value : String(item),
	label : `${item} - ${GLOBAL_CONSTANTS.cogoport_entities[item].name}`,
}));

function CogoFinancials() {
	const [isPreTax, setIsPreTax] = useState(true);
	const [timeRange, setTimeRange] = useState('1D');
	const [entity, setEntity] = useState(DEFAULT_ENTITY);
	const [activeShipmentCard, setActiveShipmentCard] = useState('');
	console.log({ activeShipmentCard });

	return (
		<div>
			<div className={styles.header}>
				<div><h2>COGO Financials</h2></div>
				<div style={{ display: 'flex' }}>
					<Toggle
						name="taxType"
						size="md"
						offLabel="Pre Tax"
						onLabel="Post Tax"
						onChange={() => setIsPreTax(!isPreTax)}
					/>
					<div style={{ margin: '0px 12px' }}>
						<SegmentedControl
							options={TIME_RANGE_OPTIONS}
							activeTab={timeRange}
							setActiveTab={setTimeRange}
							color="#ED3726"
							background="#FFFAEB"
						/>
					</div>
					<MultipleFilters />
					<Select
						value={entity}
						onChange={setEntity}
						options={ENTITY_OPTIONS}
						style={{ width: '320px' }}
					/>
				</div>

			</div>

			<div
				className={styles.top_card}
			>
				<div
					className={styles.left_shipments_section}
				>
					<StatsCard
						heading="Ongoing Shipments"
						cardId="ongoing"
						setActiveShipmentCard={setActiveShipmentCard}
					/>
					<ClosedShipmentCard
						isDeviationVisible={false}
						type="Operationally"
						cardId="operational"
						setActiveShipmentCard={setActiveShipmentCard}
					/>
				</div>
				<ClosedShipmentCard
					type="Financially"
					cardId="financial"
					setActiveShipmentCard={setActiveShipmentCard}
				/>
			</div>

			{!isEmpty(activeShipmentCard) && (
				<div className={styles.remaining_shipment_cards}>

					{activeShipmentCard !== 'ongoing' && (
						<div className={styles.single_additional}>
							<StatsCard
								heading="Ongoing Shipments"
								cardId="ongoing"
								setActiveShipmentCard={setActiveShipmentCard}
							/>
						</div>
					)}

					{activeShipmentCard !== 'operational' && (
						<div className={styles.single_additional}>
							<ClosedShipmentCard
								isDeviationVisible={false}
								type="Operationally"
								cardId="operational"
								setActiveShipmentCard={setActiveShipmentCard}
								isAdditonalView
							/>
						</div>
					)}

					{activeShipmentCard !== 'financial' && (
						<div className={styles.remaining_shipment_cards}>
							<ClosedShipmentCard
								type="Financially"
								cardId="financial"
								setActiveShipmentCard={setActiveShipmentCard}
								isAdditonalView
							/>
						</div>
					)}
				</div>
			)}

			<div className={styles.totalStats}>
				<div className={styles.ongoing}>
					<StatsCard heading="Ongoing Shipments" />
				</div>
				<div className={styles.card}>
					<StatsCard heading="Ongoing Shipments" />
				</div>
			</div>
			<ReceivablesOutstandings />
		</div>
	);
}

export default CogoFinancials;
