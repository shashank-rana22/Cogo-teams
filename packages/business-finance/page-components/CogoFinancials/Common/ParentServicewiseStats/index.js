import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import StatCard from './statCard';
import styles from './styles.module.css';

function ParentServicewiseStats({ setActiveShipmentCard = () => {} }) {
	const mappingCardsData = [
		{ label: 'Estimated Revenue', value: 'INR 5,40,000', stats: '120 Invoices | 24 Shipments' },
		{ label: 'Estimated Cost', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
	];

	const mainCardData = [
		{ label: 'Estimated Revenue', value: 'INR 5,40,000', stats: '120 Invoices | 24 Shipments' },
		{ label: 'Estimated Cost', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
		{ label: 'Estimated Profit', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
	];

	const services = ['Ocean', 'Air', 'Surface', 'Rail'];
	return (
		<div className={styles.container}>
			<div className={styles.justifiy}>
				<div>
					<div>
						<div className={styles.header}>
							<div>
								<IcMArrowBack
									onClick={() => setActiveShipmentCard('')}
									style={{ cursor: 'pointer' }}
								/>
								{' '}
								Ongoing Shipments
							</div>
							<div className={styles.info}><IcMInfo /></div>
						</div>
						<div className={styles.bottom_line} />
					</div>

				</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.maincard}>
					<StatCard mappingCards={mainCardData} isMain />
				</div>
				<div className={styles.sidestats}>
					{services.map((service) => (
						<StatCard
							mappingCards={mappingCardsData}
							service={service}
							key={service}
						/>
					))}
				</div>
			</div>

		</div>
	);
}

export default ParentServicewiseStats;
