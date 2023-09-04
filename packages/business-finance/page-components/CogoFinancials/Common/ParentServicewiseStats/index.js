import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState, useContext } from 'react';

import { INFO_CONTENT, MAPPING_CARDS_DATA } from '../../constants';
import useGetServiceLevelStats from '../../hooks/useGetServiceLevelStats';
import { TourContext } from '../Contexts';
import RenderCardHeader from '../RenderCardHeader';
import ServiceWiseStats from '../ServicewiseStats';
import { TOUR_COMMON_PROPS } from '../tourCommonProps';
import { ONGOING_PARENT_SERVICES_STEPS } from '../tourSteps';

import getCardData from './getCardData';
import StatCard from './statCard';
import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

const PLACEHOLDER_COUNT = 4;

const displayAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		notation              : 'compact',
		maximumFractionDigits : 2,
	},
});

function ParentServicewiseStats({
	setActiveShipmentCard = () => {}, mainCardData = {}, taxType = '',
	activeShipmentCard = '', entity = '', timeRange = '', filter = {},
	customDate = new Date(), isCancelledExcluded = false,
}) {
	const { tour, setTour } = useContext(TourContext);
	const [activeService, setActiveService] = useState('');
	const { currency, invoiceCount, jobCount } = mainCardData || {};

	const { serviceLevelData, serviceLevelLoading } = useGetServiceLevelStats({
		entity,
		timeRange,
		filter,
		statsType: 'ONGOING',
		activeShipmentCard,
		activeService,
		customDate,
		isCancelledExcluded,
	});

	const cardData = getCardData({ displayAmount, mainCardData, invoiceCount, taxType, currency, jobCount });

	const services = (serviceLevelData || []).map((item) => (item.serviceName));

	return (
		<div>
			{isEmpty(activeService) ? (
				<div className={styles.container}>
					{!serviceLevelLoading && (
						<Tour
							steps={ONGOING_PARENT_SERVICES_STEPS}
							isOpen={tour && isEmpty(activeService)}
							onRequestClose={() => setTour(false)}
							{...TOUR_COMMON_PROPS}
						/>
					)}
					<div className={styles.justifiy}>
						<RenderCardHeader
							title="Ongoing Shipments"
							showInfo
							showBack
							onBack={() => setActiveShipmentCard('')}
							infoContent={INFO_CONTENT.ongoingShipments}
						/>

					</div>

					<div className={styles.flex}>
						<div className={styles.maincard}>
							{!serviceLevelLoading ? (
								<StatCard mappingCards={cardData} isMain />
							) : (
								<Placeholder
									height={324}
									width="100%"
								/>
							)}

						</div>
						{!serviceLevelLoading ? (
							<div
								className={styles.sidestats}
								data-tour="parent-service-group"
							>
								{services.map((service) => {
									const singleServiceData = (serviceLevelData || []).filter(
										(item) => item.serviceName === service,
									)?.[GLOBAL_CONSTANTS.zeroth_index];
									return (
										<StatCard
											mappingCards={MAPPING_CARDS_DATA}
											service={service}
											key={service}
											setActiveService={setActiveService}
											singleServiceData={singleServiceData}
											taxType={taxType}
											displayAmount={displayAmount}
										/>
									);
								})}
							</div>
						) : (
							<div className={styles.placeholder_container}>
								{[...Array(PLACEHOLDER_COUNT).keys()].map((item) => (
									<Placeholder
										key={item}
										height={156}
										width="49%"
									/>
								))}

							</div>
						)}
					</div>
				</div>
			) : (
				<ServiceWiseStats
					activeService={activeService}
					setActiveService={setActiveService}
					mainCardData={(serviceLevelData || []).filter(
						(item) => item.serviceName === activeService,
					)?.[GLOBAL_CONSTANTS.zeroth_index]}
					serviceLevelData={serviceLevelData}
					displayAmount={displayAmount}
					taxType={taxType}
					entity={entity}
					timeRange={timeRange}
					filter={filter}
					activeShipmentCard={activeShipmentCard}
					setActiveShipmentCard={setActiveShipmentCard}
					customDate={customDate}
					isCancelledExcluded={isCancelledExcluded}
				/>
			)}
		</div>
	);
}

export default ParentServicewiseStats;
