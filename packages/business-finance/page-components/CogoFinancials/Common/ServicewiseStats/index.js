import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import useGetServiceLevelStats from '../../hooks/useGetServiceLevelStats';
import RenderCardHeader from '../RenderCardHeader';

import getMappingCard from './getMappingCard';
import StatCard from './statCard';
import styles from './styles.module.css';

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
	customDate = new Date(),
}) {
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
				<div className={styles.maincard}>
					<StatCard mappingCards={mappingCard} isMain />
				</div>
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
							<Placeholder key={item} height={250} width="29%" />
						))}

					</div>
				)}
			</div>

		</div>
	);
}

export default ServiceWiseStats;
