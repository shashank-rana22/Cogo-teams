import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function StatsCard({
	heading = '', cardId = '', setActiveShipmentCard = () => {},
	showPill = false,
}) {
	const mappingCards = [
		{ label: 'Estimated Revenue', value: 'INR 5,40,000', stats: '120 Invoices | 24 Shipments' },
		{ label: 'Estimated Cost', value: 'INR 10,40,000', stats: '210 Invoices | 80 Shipments' },
	];

	return (
		<div className={styles.container}>
			<div className={styles.flexhead}>
				<div>
					<div className={styles.header}>
						<div>
							{heading}
						</div>
						<div className={styles.info}><IcMInfo /></div>
					</div>
					<div className={styles.bottom_line} />
				</div>
				{showPill && (
					<div className={styles.tag}>
						Not Matching
					</div>
				)}
			</div>
			<div
				className={styles.statscontainer}
				onClick={() => setActiveShipmentCard(cardId)}
				role="presentation"
				style={{ cursor: !isEmpty(cardId) ? 'pointer' : null }}
			>
				{mappingCards.map((item) => (
					<div className={styles.stats} key={item.label}>
						<div className={styles.stathead}>
							{item.label}
						</div>
						<div className={styles.value}>
							{item.value}
						</div>
						<div className={styles.statval}>
							{item.stats}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default StatsCard;
