import { Select } from '@cogoport/components';
import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import StatCard from './statCard';
import styles from './styles.module.css';

function ServiceWiseStats({ heading = 'Ongoing Shipments', activeService = '', setActiveService = () => {} }) {
	const mappingCards = [
		{ label: 'Estimated Revenue', value: 'INR 5,40,000', stats: '120 Invoices | 24 Shipments' },
		{ label: 'Estimated Cost', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
		{ label: 'Estimated Profit', value: 'INR 40,000', stats: '210 Invoices | 80 Shipments' },
	];

	const services = ['FCL Customs', 'FCL Freight', 'FCL Freight Locals',
		'LCL', 'FCL Customs', 'FCL Freight', 'FCL Freight Locals',
		'FCL Customs', 'FCL Freight', 'FCL Freight Locals', 'Others'];
	return (
		<div className={styles.container}>
			<div className={styles.justifiy}>
				<div>
					<div>
						<div className={styles.header}>
							<IcMArrowBack
								onClick={() => setActiveService('')}
								style={{ cursor: 'pointer', marginRight: '8px' }}
							/>
							<div>
								{`${heading}: ${activeService}`}
							</div>
							<div className={styles.info}><IcMInfo /></div>
						</div>
						<div className={styles.bottom_line} />
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
