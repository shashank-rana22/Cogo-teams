import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';

import useGetServiceLevelStats from '../../hooks/useGetServiceLevelStats';
import { TourContext } from '../Contexts';
import RenderCardHeader from '../RenderCardHeader';
import { TOUR_COMMON_PROPS } from '../tourCommonProps';
import { getSingleServiceSteps } from '../tourSteps';

import getMappingCard from './getMappingCard';
import StatCard from './statCard';
import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

const PLACEHOLDER_COUNT = 3;
const SERVICE_LIMIT = 4;
const DEFAULT_VALUE = 0;

function ServiceWiseStats({
	heading = 'Ongoing Shipments', activeService = '', setActiveService = () => {},
	displayAmount = () => {}, mainCardData = {}, taxType = '',
	entity = '',
	timeRange = '',
	filter = {},
	activeShipmentCard = '',
	setActiveShipmentCard = () => {},
	customDate = new Date(),
	isCancelledExcluded = false,
}) {
	const { tour, setTour, setIsTourInitial } = useContext(TourContext);
	const { currency, invoiceCount, jobCount } = mainCardData || {};

	const { serviceLevelData:singleService, serviceLevelLoading } = useGetServiceLevelStats({
		entity,
		timeRange,
		filter,
		statsType            : 'ONGOING',
		activeShipmentCard,
		activeService,
		customDate,
		specificServiceLevel : activeService,
		isCancelledExcluded,
	});

	const mappingCard = getMappingCard({
		displayAmount,
		mainCardData,
		taxType,
		currency,
		invoiceCount,
		jobCount,
	});

	const services = (singleService || []).map((item) => ({
		label : (item.serviceName)?.replaceAll('_', ' '),
		name  : item.serviceName,
	}));

	const emptyCards = services?.length < SERVICE_LIMIT
		? (SERVICE_LIMIT - Number(services?.length)) : DEFAULT_VALUE;

	return (
		<div className={styles.container}>
			{!serviceLevelLoading && (
				<Tour
					steps={getSingleServiceSteps({ setActiveShipmentCard, setIsTourInitial })}
					isOpen={tour && !serviceLevelLoading}
					onRequestClose={() => {
						setTour(false);
					}}
					{...TOUR_COMMON_PROPS}
				/>
			)}
			<div className={styles.justifiy}>
				<div>
					<div>
						<RenderCardHeader
							title={`${heading}: ${activeService}`}
							showBack
							onBack={() => setActiveService('')}
						/>
					</div>

				</div>

			</div>
			<div className={styles.flex}>
				{!serviceLevelLoading ? (
					<div className={styles.maincard}>
						<StatCard mappingCards={mappingCard} isMain />
					</div>
				)
					: <Placeholder height={340} width="300px" style={{ margin: '0px 30px' }} />}
				{!serviceLevelLoading ? (
					<div
						className={styles.sidestats}
					>
						<div
							className={styles.mapped_card_container}
						>
							{services.map((service) => (
								<StatCard
									key={service?.label}
									mappingCards={mappingCard}
									service={service?.label}
									singleServiceData={(singleService || []).filter((item) => (
										item.serviceName === service.name
									))?.[GLOBAL_CONSTANTS.zeroth_index]}
									taxType={taxType}
								/>
							))}
							{
									[...Array(emptyCards).keys()].map((item) => (
										<div className={styles.placeholder_area} key={item}>
											No Data
										</div>

									))
								}
						</div>
					</div>
				) : (
					<div className={styles.placeholder_container}>
						{[...Array(PLACEHOLDER_COUNT).keys()].map((item) => (
							<Placeholder key={item} height="100%" width="25%" />
						))}

					</div>
				)}
			</div>

		</div>
	);
}

export default ServiceWiseStats;
