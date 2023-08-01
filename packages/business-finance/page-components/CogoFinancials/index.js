import { Select, Toggle } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import SegmentedControl from '../commons/SegmentedControl/index.tsx';

import ActiveShipmentCard from './ActiveShipmentCard/index';
import ClosedShipmentCard from './ClosedShipmentCard/index';
import StatsCard from './Common/StatsCard';
import useGetProfitabilityStats from './hooks/useGetProfitabilityStats';
import MultipleFilters from './MultipleFilters';
import ReceivablesOutstandings from './ReceivablesOutstandings';
import styles from './styles.module.css';
import TableComp from './TableComp';

const TIME_RANGE_OPTIONS = [
	{ label: '1D', value: '1D' },
	{ label: '1W', value: '1W' },
	{ label: '1M', value: '1M' },
	{ label: '6M', value: '6M' },
	{ label: '1Y', value: '1Y' },
];

const mappingCards = [
	{ label: 'Estimated Revenue', value: 'INR 5,40,000', stats: '120 Invoices | 24 Shipments' },
	{ label: 'Estimated Cost', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
];

const mapping = [
	{ label: 'AR', value: 'INR 5,40,000', stats: '120 Invoices | 24 Shipments' },
	{ label: 'Bank', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
	{ label: 'Deviation', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
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
	const [showShipmentList, setShowShipmentList] = useState(false);
	const [filter, setFilter] = useState({});
	const [activeBar, setActiveBar] = useState('');

	const taxType = isPreTax ? 'PreTax' : 'PostTax';

	const {
		financialData, financialLoading,
		operationalData, operationalLoading,
		ongoingData, ongoingLoading,
	} = useGetProfitabilityStats({ filter, entity, timeRange, activeShipmentCard });

	const handleClick = () => {
		setShowShipmentList(false);
		setActiveShipmentCard('');
	};

	return (
		<div>
			<div className={styles.header}>
				<div
					role="presentation"
					onClick={handleClick}
				>
					<h2 className={styles.main_heading}>COGO Financials</h2>

				</div>
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
					<MultipleFilters
						filter={filter}
						setFilter={setFilter}
					/>
					<Select
						value={entity}
						onChange={setEntity}
						options={ENTITY_OPTIONS}
						style={{ width: '320px' }}
					/>
				</div>
			</div>

			{isEmpty(activeShipmentCard) ? (
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
							mappingCards={mappingCards}
							cardData={ongoingData}
							loading={ongoingLoading}
							taxType={taxType}
						/>
						<ClosedShipmentCard
							isDeviationVisible={false}
							type="Operationally"
							cardId="operational"
							setActiveShipmentCard={setActiveShipmentCard}
							cardData={operationalData}
							loading={operationalLoading}
							taxType={taxType}
						/>
					</div>
					<ClosedShipmentCard
						type="Financially"
						cardId="financial"
						setActiveShipmentCard={setActiveShipmentCard}
						cardData={financialData}
						loading={financialLoading}
						taxType={taxType}
					/>
				</div>
			) : (
				<div>
					<ActiveShipmentCard
						setActiveShipmentCard={setActiveShipmentCard}
						activeShipmentCard={activeShipmentCard}
						isPreTax={isPreTax}
						setShowShipmentList={setShowShipmentList}
						entity={entity}
						timeRange={timeRange}
						filter={filter}
						operationalData={operationalData}
						financialData={financialData}
						taxType={taxType}
						activeBar={activeBar}
						setActiveBar={setActiveBar}
					/>
					<div className={styles.remaining_shipment_cards}>

						{activeShipmentCard !== 'ongoing' && !showShipmentList && (
							<div className={styles.single_additional}>
								<StatsCard
									heading="Ongoing Shipments"
									cardId="ongoing"
									setActiveShipmentCard={setActiveShipmentCard}
									mappingCards={mappingCards}
									cardData={ongoingData}
									loading={ongoingLoading}
									taxType={taxType}
								/>
							</div>
						)}

						{activeShipmentCard !== 'operational' && !showShipmentList && (
							<div className={styles.single_additional}>
								<ClosedShipmentCard
									isDeviationVisible={false}
									type="Operationally"
									cardId="operational"
									setActiveShipmentCard={setActiveShipmentCard}
									isAdditonalView
									cardData={operationalData}
									loading={operationalLoading}
									taxType={taxType}
								/>
							</div>
						)}

						{activeShipmentCard !== 'financial' && !showShipmentList && (
							<div className={styles.single_additional}>
								<ClosedShipmentCard
									type="Financially"
									cardId="financial"
									setActiveShipmentCard={setActiveShipmentCard}
									isAdditonalView
									cardData={financialData}
									loading={financialLoading}
									taxType={taxType}
								/>
							</div>
						)}
					</div>
				</div>
			)}

			{!showShipmentList ? (
				<div>
					<div className={styles.totalStats}>
						<div className={styles.ongoing}>
							<StatsCard
								heading="Total Collected"
								mappingCards={mapping}
								showPill
							/>
						</div>
						<div className={styles.card}>
							<StatsCard
								heading="Total Paid"
								mappingCards={mapping}
								showPill
							/>
						</div>
					</div>
					<ReceivablesOutstandings />
				</div>
			)
				: (
					<TableComp
						activeShipmentCard={activeShipmentCard}
						entity={entity}
						filter={filter}
						activeBar={activeBar}
						timeRange={timeRange}
					/>
				)}
		</div>
	);
}

export default CogoFinancials;
