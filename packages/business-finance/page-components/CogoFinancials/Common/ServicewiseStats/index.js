import { Select } from '@cogoport/components';
import React from 'react';

import RenderCardHeader from '../RenderCardHeader';

import StatCard from './statCard';
import styles from './styles.module.css';

function ServiceWiseStats({ heading = 'Ongoing Shipments', activeService = '', setActiveService = () => {} }) {
	const mappingCards = [
		{ label: 'Estimated Revenue', value: 'INR 5,40,000', stats: '120 Invoices | 24 Shipments' },
		{ label: 'Estimated Cost', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
		{ label: 'Estimated Profit', value: 'INR 40,000', stats: '210 Invoices | 80 Shipments' },
	];

	const services = ['FCL Customs', 'FCL Freight', 'FCL Freight Locals',
		'LCL', 'Others'];
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
					<StatCard mappingCards={mappingCards} isMain />
				</div>
				<div className={styles.sidestats}>
					{services.map((service) => (
						<StatCard
							mappingCards={mappingCards}
							service={service}
							key={service}
						/>
					))}
				</div>
			</div>

		</div>
	);
}

export default ServiceWiseStats;
