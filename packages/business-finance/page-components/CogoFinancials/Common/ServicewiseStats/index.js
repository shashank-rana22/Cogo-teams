import { Placeholder, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import useGetServiceLevelStats from '../../hooks/useGetServiceLevelStats';
import RenderCardHeader from '../RenderCardHeader';

import StatCard from './statCard';
import styles from './styles.module.css';

const PLACEHOLDER_COUNT = 3;

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

	const mappingCard = [
		{
			label : 'Estimated Revenue',
			key   : 'estimatedRevenue',
			value : displayAmount(mainCardData[`estimatedRevenue${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
		{
			label : 'Estimated Cost',
			key   : 'estimatedCost',
			value : displayAmount(mainCardData[`estimatedCost${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
		{
			label : 'Estimated Profit',
			key   : 'estimatedProfit',
			value : displayAmount(mainCardData[`estimatedProfit${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
	];

	const services = (singleService || []).map((item) => ({
		label : (item.serviceName)?.replaceAll('_', ' '),
		name  : item.serviceName,
	}));

	return (
		<div className={styles.container}>
			<div className={styles.justifiy}>
				<div>
					<div>
						<RenderCardHeader
							title={`${heading}: ${activeService}`}
							showInfo
							showBack
							onBack={() => setActiveService('')}
						/>

					</div>

				</div>
				<div className={styles.select}>
					<Select placeholder="Select" />
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.maincard}>
					<StatCard mappingCards={mappingCard} isMain />
				</div>
				{!serviceLevelLoading ? (
					<div className={styles.sidestats}>
						{services.map((service) => (
							<StatCard
								mappingCards={mappingCard}
								service={service?.label}
								key={service?.label}
								singleServiceData={(singleService || []).filter((item) => (
									item.serviceName === service.name
								))?.[GLOBAL_CONSTANTS.zeroth_index]}
								taxType={taxType}
							/>
						))}
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
