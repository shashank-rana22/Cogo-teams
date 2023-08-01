import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { mappingCardsData } from '../../constants';
import useGetServiceLevelStats from '../../hooks/useGetServiceLevelStats';
import ServiceWiseStats from '../ServicewiseStats';

import StatCard from './statCard';
import styles from './styles.module.css';

const PLACEHOLDER_COUNT = 3;

const displayAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function ParentServicewiseStats({
	setActiveShipmentCard = () => {}, mainCardData = {}, taxType = '',
	activeShipmentCard = '', entity = '', timeRange = '', filter = {},
	customDate = new Date(),
}) {
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
	});

	const cardData = [
		{
			label : 'Estimated Revenue',
			value : displayAmount(mainCardData[`estimatedRevenue${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
		{
			label : 'Estimated Cost',
			value : displayAmount(mainCardData[`estimatedCost${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
		{
			label : 'Estimated Profit',
			value : displayAmount(mainCardData[`estimatedProfit${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
	];

	const services = (serviceLevelData || []).map((item) => (item.serviceName));

	return (
		<div>
			{isEmpty(activeService) ? (
				<div className={styles.container}>
					<div className={styles.justifiy}>
						<div>
							<div>
								<div className={styles.header}>
									<IcMArrowBack
										onClick={() => setActiveShipmentCard('')}
										style={{ cursor: 'pointer', marginRight: '8px' }}
									/>
									<div>
										<div>Ongoing Shipments</div>
										<div className={styles.bottom_line} />
									</div>
									<div className={styles.info}><IcMInfo /></div>
								</div>
							</div>

						</div>
					</div>

					<div className={styles.flex}>
						<div className={styles.maincard}>
							<StatCard mappingCards={cardData} isMain />
						</div>
						{!serviceLevelLoading ? (
							<div className={styles.sidestats}>
								{services.map((service) => {
									const singleServiceData = (serviceLevelData || []).filter(
										(item) => item.serviceName === service,
									)?.[GLOBAL_CONSTANTS.zeroth_index];
									return (
										<StatCard
											mappingCards={mappingCardsData}
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
									<Placeholder key={item} height={250} width="29%" />
								))}

							</div>
						)}
					</div>
				</div>
			) : (
				<div>
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
						customDate={customDate}
					/>
				</div>
			)}
		</div>
	);
}

export default ParentServicewiseStats;
