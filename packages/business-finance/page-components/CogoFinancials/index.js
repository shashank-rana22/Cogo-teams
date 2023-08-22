import { Button, Select, Toggle } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlatformDemo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useMemo } from 'react';

import SegmentedControl from '../commons/SegmentedControl/index.tsx';

import ActiveShipmentCard from './ActiveShipmentCard/index';
import ClosedShipmentCard from './ClosedShipmentCard/index';
import { TourContext } from './Common/Contexts/index';
import StatsCard from './Common/StatsCard';
import { TOUR_COMMON_PROPS } from './Common/tourCommonProps';
import { FINANCIAL_HOME_STEP, HOME_TOUR_STEPS } from './Common/tourSteps';
import { getTimeRangeOptions, INFO_CONTENT } from './constants';
import Filters from './Filters';
import useGetProfitabilityStats from './hooks/useGetProfitabilityStats';
import MultipleFilters from './MultipleFilters';
import styles from './styles.module.css';
import TableComp from './TableComp';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((item) => ({
	value : String(item),
	label : `${item} - ${GLOBAL_CONSTANTS.cogoport_entities[item].name}`,
}));

function CogoFinancials() {
	const [isPreTax, setIsPreTax] = useState(true);
	const [timeRange, setTimeRange] = useState('1D');
	const [customDate, setCustomDate] = useState(null);
	const [activeShipmentCard, setActiveShipmentCard] = useState('');
	const [showShipmentList, setShowShipmentList] = useState(false);
	const [filter, setFilter] = useState({});
	const [activeBar, setActiveBar] = useState('');
	const [tableFilters, setTableFilters] = useState({});
	const [tour, setTour] = useState(false);
	const [isTourInitial, setIsTourInitial] = useState(true);

	const geo = getGeoConstants();
	const countryCode = geo?.country.code;
	const DEFAULT_ENTITY_DATA = Object.values(GLOBAL_CONSTANTS.cogoport_entities)?.filter(
		(item) => item.country_code === countryCode,
	);
	const DEFAULT_ENTITY = DEFAULT_ENTITY_DATA[GLOBAL_CONSTANTS.zeroth_index]?.default_entity_code;
	const [entity, setEntity] = useState(DEFAULT_ENTITY);
	const taxType = isPreTax ? 'PreTax' : 'PostTax';

	const {
		financialData, financialLoading,
		operationalData, operationalLoading,
		ongoingData, ongoingLoading,
	} = useGetProfitabilityStats({ filter, entity, timeRange, customDate, showShipmentList });

	const handleClick = () => {
		setShowShipmentList(false);
		setActiveBar('');
		setActiveShipmentCard('');
	};

	useEffect(() => {
		if (!showShipmentList) { setTableFilters({}); }
	}, [showShipmentList]);

	const getTourProps = useMemo(() => ({
		tour,
		setTour,
		setIsTourInitial,
	}), [tour]);

	const handleTourClick = () => {
		setTour(true);
		handleClick();
	};

	return (
		<TourContext.Provider value={getTourProps}>
			<div>
				<Tour
					steps={isTourInitial ? HOME_TOUR_STEPS : FINANCIAL_HOME_STEP}
					isOpen={tour && isEmpty(activeShipmentCard)}
					onRequestClose={() => {
						setTour(false);
						setIsTourInitial(true);
					}}
					{...TOUR_COMMON_PROPS}
				/>
				<div className={styles.header}>
					<div
						role="presentation"
						onClick={handleClick}
					>
						<h2 className={styles.main_heading} data-tour="main-heading">COGO Financials</h2>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Button
							onClick={handleTourClick}
							className={styles.tour_btn}
						>
							<IcMPlatformDemo height={14} width={14} style={{ marginRight: '8px' }} />
							Start Tour
						</Button>
						<Toggle
							name="taxType"
							size="md"
							offLabel="Pre Tax"
							onLabel="Post Tax"
							onChange={() => setIsPreTax(!isPreTax)}
						/>
						<div className={styles.segmented_section}>
							<SegmentedControl
								options={getTimeRangeOptions({ customDate, setCustomDate })}
								activeTab={timeRange}
								setActiveTab={setTimeRange}
								color="#ED3726"
								background="#FFE69D"
								style={{ overflow: 'visible' }}
							/>
						</div>
						<MultipleFilters
							filter={filter}
							setFilter={setFilter}
							entity={entity}
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
					<div className={styles.top_card}>
						<div className={styles.left_shipments_section}>
							<StatsCard
								heading="Ongoing Shipments"
								cardId="ongoing"
								setActiveShipmentCard={setActiveShipmentCard}
								cardData={ongoingData}
								loading={ongoingLoading}
								taxType={taxType}
								infoContent={INFO_CONTENT.ongoingShipments}
							/>
							<ClosedShipmentCard
								isDeviationVisible={false}
								type="Operationally"
								cardId="operational"
								setActiveShipmentCard={setActiveShipmentCard}
								cardData={operationalData}
								loading={operationalLoading}
								taxType={taxType}
								infoContent={INFO_CONTENT.operationallyClosed}
								isHomeCard
							/>
						</div>
						<ClosedShipmentCard
							type="Financially"
							cardId="financial"
							setActiveShipmentCard={setActiveShipmentCard}
							cardData={financialData}
							loading={financialLoading}
							taxType={taxType}
							infoContent={INFO_CONTENT.financiallyClosed}
							isHomeCard
						/>
					</div>
				) : (
					<div>
						<ActiveShipmentCard
							setActiveShipmentCard={setActiveShipmentCard}
							activeShipmentCard={activeShipmentCard}
							isPreTax={isPreTax}
							setShowShipmentList={setShowShipmentList}
							showShipmentList={showShipmentList}
							entity={entity}
							timeRange={timeRange}
							filter={filter}
							operationalData={operationalData}
							financialData={financialData}
							taxType={taxType}
							mainCardData={ongoingData}
							customDate={customDate}
							activeBar={activeBar}
							setActiveBar={setActiveBar}
							setTableFilters={setTableFilters}
						/>
						<div className={styles.remaining_shipment_cards}>
							{activeShipmentCard !== 'ongoing' && !showShipmentList && (
								<div className={styles.single_additional}>
									<StatsCard
										heading="Ongoing Shipments"
										cardId="ongoing"
										setActiveShipmentCard={setActiveShipmentCard}
										cardData={ongoingData}
										loading={ongoingLoading}
										taxType={taxType}
										infoContent={INFO_CONTENT.ongoingShipments}
										isAdditonalView
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
										setActiveBar={setActiveBar}
										infoContent={INFO_CONTENT.operationallyClosed}
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
										setActiveBar={setActiveBar}
										infoContent={INFO_CONTENT.financiallyClosed}
									/>
								</div>
							)}
						</div>
					</div>
				)}

				{showShipmentList && (
					<div style={{ background: '#fff' }}>
						<Filters
							setTableFilters={setTableFilters}
							tableFilters={tableFilters}
							activeBar={activeBar}
						/>
						<TableComp
							activeShipmentCard={activeShipmentCard}
							entity={entity}
							filter={filter}
							activeBar={activeBar}
							timeRange={timeRange}
							customDate={customDate}
							setTableFilters={setTableFilters}
							tableFilters={tableFilters}
							statsType={activeShipmentCard === 'financial' ? 'FINANCE_CLOSED' : 'OPR_CLOSED'}
							taxType={taxType}
							type={activeShipmentCard === 'financial' ? 'Financially' : 'Operationally'}
						/>
					</div>
				)}
			</div>
		</TourContext.Provider>
	);
}

export default CogoFinancials;
